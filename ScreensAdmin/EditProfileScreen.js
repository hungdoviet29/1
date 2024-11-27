import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const EditProfileScreen = ({route, navigation}) => {
  const {userInfo, onUpdate} = route.params || {};

  useEffect(() => {
    console.log('Dữ liệu userInfo:', userInfo);
  }, [userInfo]);

  if (!userInfo || !userInfo._id) {
    return (
      <View style={styles.container}>
        <Text>Không có dữ liệu người dùng. Vui lòng thử lại!</Text>
      </View>
    );
  }

  const [email, setEmail] = useState(userInfo.email || '');
  const [phone, setPhone] = useState(userInfo.phone || '');
  const [diaChi, setDiaChi] = useState(userInfo.diaChi || '');
  const [tenDangNhap, setTenDangNhap] = useState(userInfo.tenDangNhap || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!email || !phone || !diaChi || !tenDangNhap) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const url = `http://192.168.0.4:3000/users/${userInfo._id}`;
    console.log('Đang gửi yêu cầu PUT đến:', url);

    setIsLoading(true);
    try {
      console.log('Payload gửi đi:', {email, phone, diaChi, tenDangNhap});

      const response = await axios.put(url, {
        email,
        phone,
        diaChi, // Đảm bảo trường này được gửi đi
        tenDangNhap,
      });

      console.log('Cập nhật thành công:', response.data);

      const updatedUserInfo = {
        ...userInfo,
        email,
        phone,
        diaChi,
        tenDangNhap,
      };

      if (onUpdate) {
        onUpdate(updatedUserInfo); // Gọi callback để cập nhật thông tin
      }

      Alert.alert('Thành công', 'Thông tin đã được cập nhật.');
      navigation.goBack();
    } catch (error) {
      console.error(
        'Lỗi khi gửi yêu cầu PUT:',
        error.response?.data || error.message,
      );
      Alert.alert(
        'Lỗi',
        error.response?.data?.message || 'Không thể cập nhật thông tin.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Tên đăng nhập:</Text>
      <TextInput
        style={styles.input}
        value={tenDangNhap}
        onChangeText={setTenDangNhap}
        placeholder="Nhập tên đăng nhập"
      />
      <Text style={styles.label}>Số điện thoại:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Địa chỉ:</Text>
      <TextInput
        style={styles.input}
        value={diaChi}
        onChangeText={setDiaChi}
        placeholder="Nhập địa chỉ"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <Button title="Lưu" onPress={handleSave} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  label: {fontSize: 16, marginBottom: 8},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default EditProfileScreen;
