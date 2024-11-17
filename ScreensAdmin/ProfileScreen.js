import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Lấy userId từ AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Lỗi', 'Không tìm thấy thông tin đăng nhập.');
          return;
        }

        // Gọi API để lấy thông tin người dùng
        const response = await axios.get(`http://192.168.0.104:3000/users/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin người dùng.');
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{userInfo.tenDangNhap}</Text>
        <Text style={styles.role}>{userInfo.vaiTro}</Text>
      </View>

      {/* Thông tin chi tiết */}
      <View style={styles.details}>
        <Text style={styles.detailTitle}>Thông tin tài khoản:</Text>
        <Text style={styles.detailText}>Tên đăng nhập: {userInfo.tenDangNhap}</Text>
        <Text style={styles.detailText}>Vai trò: {userInfo.vaiTro}</Text>
        <Text style={styles.detailText}>
          Sản phẩm yêu thích: {userInfo.sanPhamYeuThich?.length || 0}
        </Text>
        <Text style={styles.detailText}>
          Lịch sử đơn hàng: {userInfo.lichSuDonHang?.length || 0}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  role: { fontSize: 16, color: '#888' },
  details: { paddingHorizontal: 16 },
  detailTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  detailText: { fontSize: 16, marginBottom: 4 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#555' },
});



export default ProfileScreen;
