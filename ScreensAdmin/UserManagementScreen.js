import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';


const initialUsers = [
  {
    id: '1',
    name: 'Bảy cỏ',
    phone: '0357103658',
    email: 'linhdtqph35049@fpt.edu.vn',
    avatar: 'https://images-cdn.9gag.com/photo/aD1b0Q7_700b.jpg',
    address: 'Số 10C Hoàng Diệu, Q. Ba Đình, TP. Hà Nội',
    purchaseHistory: [
      { id: '1', item: 'Sản phẩm 1', date: '01/10/2024' },
      { id: '2', item: 'Sản phẩm 2', date: '15/10/2024' },
    ],
  },
  {
    id: '2',
    name: 'Nguyễn Văn A',
    phone: '0357103658',
    email: 'linhdtqph35049@fpt.edu.vn',
    avatar: 'https://artena.vn/wp-content/uploads/2024/09/31f162ad19d8ccafcb2989d39628f55d.jpg',
    address: 'Số 20 Lê Lợi, Q. 1, TP. Hồ Chí Minh',
    purchaseHistory: [
      { id: '1', item: 'Sản phẩm 1', date: '10/11/2024' },
      { id: '2', item: 'Sản phẩm 3', date: '20/11/2024' },
    ],
  },
  {
    id: '3',
    name: 'Nguyễn Văn B',
    phone: '0357103658',
    email: 'linhdtqph35049@fpt.edu.vn',
    avatar: 'https://images-cdn.9gag.com/photo/aD1b0Q7_700b.jpg',
    address: 'Số 30 Nguyễn Huệ, TP. Đà Nẵng',
    purchaseHistory: [
      { id: '1', item: 'Sản phẩm 3', date: '05/11/2024' },
      { id: '2', item: 'Sản phẩm 2', date: '15/11/2024' },
    ],
  },
];

const UserManagementScreen = ({ navigation }) => {
  const [users, setUsers] = useState(initialUsers);

  // Hàm xóa người dùng
  const deleteUser = (userId) => {
    Alert.alert(
      "Xóa người dùng",
      "Bạn có chắc chắn muốn xóa người dùng này?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: () => {
            // Thực hiện xóa
            setUsers(users.filter(user => user.id !== userId));
            // Gọi API xóa nếu có
            // fetch(`https://example.com/api/users/${userId}`, { method: 'DELETE' })
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserDetails', { user: item })}
      style={styles.card}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteUser(item.id)}>
        <Image source={require('../acssets/bin.png')} style={styles.icon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Quản lí người dùng</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  icon: {
    width: 26,
    height: 26,
    marginVertical: 10,
  },
  iconnext: {
    width: 24,
    height: 14,
    marginVertical: 10,
  },
});

export default UserManagementScreen;
