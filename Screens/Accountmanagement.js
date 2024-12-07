import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AccountManagement = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Lỗi', 'Không tìm thấy thông tin đăng nhập.');
          return;
        }
        const response = await axios.get(
          `http://192.168.0.104:3000/users/${userId}`,
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin người dùng.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login', params: {clearInputs: true}}],
    });
  };

  if (!userInfo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Account Management</Text>

      {/* Header thông tin người dùng */}
      <View style={styles.headerContainer}>
        <Image
          source={{uri: userInfo.avatar || 'https://via.placeholder.com/100'}}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {userInfo.tenDangNhap || 'Nguyễn Văn A'}
        </Text>
        <Text style={styles.userId}>
          ID: {userInfo._id || 'Không xác định'}
        </Text>
      </View>

      {/* Danh sách tùy chọn */}
      <View style={styles.optionList}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() =>
            navigation.navigate('EditPersonalInformation', {userData: userInfo})
          } // Truyền userInfo sang màn tiếp theo
        >
          <Text style={styles.optionIcon}>👤</Text>
          <Text style={styles.optionText}>Chỉnh sửa thông tin</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() =>
            navigation.navigate('ShopContactInfo', {userData: userInfo})
          }>
          <Text style={styles.optionIcon}>📞</Text>
          <Text style={styles.optionText}>Thông tin liên hệ</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.optionItem}
          onPress={() =>
            navigation.navigate('DirectMessaging', {userData: userInfo})
          }>
          <Text style={styles.optionIcon}>💬</Text>
          <Text style={styles.optionText}>Nhắn tin trực tiếp</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity> */}
      </View>

      {/* Nút đăng xuất */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userId: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  optionList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    paddingVertical: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionIcon: {
    fontSize: 22,
    color: '#007BFF',
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  logoutButton: {
    backgroundColor: '#FF4B4B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
});

export default AccountManagement;
