import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const UserManagementScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);

  // Hàm gọi API lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.0.6:3000/users'); // Đặt URL đúng
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Lấy dữ liệu người dùng khi component được render
  }, []);

  // Hàm xóa người dùng
  const deleteUser = userId => {
    Alert.alert('Xóa người dùng', 'Bạn có chắc chắn muốn xóa người dùng này?', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        onPress: async () => {
          try {
            // Gọi API xóa người dùng
            console.log('User ID:', userId); // Kiểm tra giá trị của userId
            axios.delete(`http://192.168.0.6:3000/users/${userId}`);

            setUsers(users.filter(user => user._id !== userId)); // Cập nhật danh sách người dùng
          } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
          }
        },
      },
    ]);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserDetails', {user: item})}
      style={styles.card}>
      {/* Hiển thị avatar, nếu không có avatar thì sử dụng ảnh mặc định */}
      <Image
        source={
          item.avatar ? {uri: item.avatar} : require('../acssets/profile.png')
        }
        style={styles.avatar}
      />

      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.tenDangNhap}</Text>
        <Text style={styles.vaiTro}>{item.vaiTro}</Text>
      </View>

      {/* Nút xóa người dùng */}
      <TouchableOpacity onPress={() => deleteUser(item._id)}>
        <Image source={require('../acssets/bin.png')} style={styles.icon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image
          source={require('../acssets/BackButton.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Quản lí người dùng</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
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
    shadowOffset: {width: 0, height: 2},
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
  vaiTro: {
    fontSize: 14,
    color: '#666',
  },
  icon: {
    width: 26,
    height: 26,
    marginVertical: 10,
  },
  backButton: {
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default UserManagementScreen;
