import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Lỗi', 'Không tìm thấy thông tin đăng nhập.');
          return;
        }
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{userInfo.tenDangNhap}</Text>
        <Text style={styles.role}>{userInfo.vaiTro}</Text>
      </View>

      {/* Thông tin chi tiết */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('EditProfileScreen', {
            userInfo,
            onUpdate: (updatedUserInfo) => setUserInfo(updatedUserInfo), // Callback cập nhật
          })
        }
      >
        <Text style={styles.cardTitle}>Thông tin tài khoản</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardItem}>Tên đăng nhập: {userInfo.tenDangNhap}</Text>
          <Text style={styles.cardItem}>Pass: {userInfo.matKhau}</Text>
          <Text style={styles.cardItem}>Email: {userInfo.email}</Text>
          <Text style={styles.cardItem}>Số điện thoại: {userInfo.phone}</Text>
          <Text style={styles.cardItem}>Địa chỉ: {userInfo.diaChi}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#4CAF50' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginVertical: 8 },
  role: { fontSize: 18, color: '#777' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 4,
  },
  cardContent: { marginVertical: 10 },
  cardItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#555' },
});

export default ProfileScreen;
