import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const EditPersonalInformation = ({ route, navigation }) => {
  const { userData } = route.params; // Nhận dữ liệu từ màn trước

  // Khởi tạo giá trị từ userData
  const [name, setName] = useState(userData.tenDangNhap || ''); // Hiển thị tên đăng nhập
  const [birthDate, setBirthDate] = useState(userData.birthDate || '01/01/2000');
  const [email, setEmail] = useState(userData.email || 'example@example.com'); // Thêm email
  const [phone, setPhone] = useState(userData.phone || 'Không có số'); // Thêm số điện thoại

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Edit Personal Information</Text>
        </View>

        {/* Hiển thị avatar */}
        <TouchableOpacity style={styles.infoItem} onPress={() => Alert.alert('Thay đổi avatar')}>
          <Text style={styles.label}>Ảnh đại diện</Text>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        </TouchableOpacity>

        {/* Hiển thị tên đăng nhập (Họ và tên) */}
        <TouchableOpacity style={styles.infoItem} onPress={() => Alert.alert('Chỉnh sửa tên')}>
          <Text style={styles.label}>Họ và tên</Text>
          <Text style={styles.value}>{name}</Text>
        </TouchableOpacity>

        {/* Ngày sinh */}
        <TouchableOpacity style={styles.infoItem} onPress={() => Alert.alert('Chỉnh sửa ngày sinh')}>
          <Text style={styles.label}>Ngày sinh</Text>
          <Text style={styles.value}>{birthDate}</Text>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity style={styles.infoItem} onPress={() => Alert.alert('Chỉnh sửa email')}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
        </TouchableOpacity>

        {/* Số điện thoại */}
        <TouchableOpacity style={styles.infoItem} onPress={() => Alert.alert('Chỉnh sửa số điện thoại')}>
          <Text style={styles.label}>Số điện thoại</Text>
          <Text style={styles.value}>{phone}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default EditPersonalInformation;
