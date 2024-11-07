import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Danh sách người dùng
const users = [
  {
    id: '1',
    name: 'Bảy cỏ',
    phone: '0357103658',
    email: 'linhdtqph35049@fpt.edu.vn',
    avatar: 'https://images-cdn.9gag.com/photo/aD1b0Q7_700b.jpg',
  },
  {
    id: '2',
    name: 'Nguyễn Văn A',
    phone: '0357103658',
    email: 'linhdtqph35049@fpt.edu.vn',
    avatar: 'https://images-cdn.9gag.com/photo/aD1b0Q7_700b.jpg',
  },
  {
    id: '3',
    name: 'Nguyễn Văn A',
    phone: '0357103658',
    email: 'linhdtqph35049@fpt.edu.vn',
    avatar: 'https://images-cdn.9gag.com/photo/aD1b0Q7_700b.jpg',
  },
  // Thêm các người dùng khác ở đây
];

const UserManagementScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { userId: item.id })}>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../acssets/bin.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../acssets/NextButton.png')} style={styles.iconnext} />
        </TouchableOpacity>
      </View>
    </View>
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
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
