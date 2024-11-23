import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FixPasswordScreen = ({navigation}) => {
  const [userId, setUserId] = useState(''); // State lưu userId
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Lấy userId từ AsyncStorage khi màn hình được mount
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.');
        navigation.goBack();
      }
    };
    fetchUserId();
  }, []);
  // Gửi đi
  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.1.17:3000/users/changePassword/${userId}`, // Truyền userId vào URL
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmPassword: newPassword, // Truyền cả confirmPassword
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigation.goBack();
      } else {
        console.error('Lỗi phản hồi:', data);
        alert(data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      alert('Lỗi kết nối');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Fix Password</Text>
      </View>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.icon}>👤</Text>
      </View>

      {/* Old Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu cũ"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Text style={styles.icon}>🔒</Text>
      </View>

      {/* New Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.icon}>🔒</Text>
      </View>

      {/* Confirm New Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu mới"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
        <Text style={styles.icon}>🔒</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9F9F9', padding: 20},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {marginRight: 10},
  backIcon: {fontSize: 24},
  header: {fontSize: 22, fontWeight: 'bold'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {flex: 1, fontSize: 16, paddingVertical: 10},
  icon: {fontSize: 18, color: '#999'},
  submitButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'},
});

export default FixPasswordScreen;
