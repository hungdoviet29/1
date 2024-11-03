import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  // Khai báo các state để lưu thông tin đăng ký
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Kiểm tra xem mật khẩu có khớp không
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }

    // Tạo đối tượng người dùng mới
    const newUser = {
      tenDangNhap: email,
      matKhau: password,
      vaiTro: 'user', // Thêm vai trò mặc định
      roll: 2, // Thêm giá trị roll mặc định
    };

    try {
      // Gửi yêu cầu POST để thêm người dùng mới vào API
      const response = await fetch('http://192.168.101.9:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        // Nếu đăng ký thành công, chuyển đến màn hình đăng nhập
        navigation.navigate('Login');
      } else {
        // Nếu có lỗi xảy ra
        setError('Đăng ký không thành công. Vui lòng thử lại.');
      }
    } catch (error) {
      setError('Lỗi kết nối mạng. Vui lòng thử lại.');
      console.error('Lỗi trong quá trình đăng ký:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../acssets/danhky.png')} // Ensure the path is correct
        style={styles.background}>
        <Text style={styles.welcomeText}>Get’s started with LapStore!</Text>
        <Text style={styles.subText}>
          Yay! You're back. Thanks for shopping with us.
        </Text>
        <Text style={styles.subText}>
          We have excited deals and promotions going on, grab your pick now!{' '}
        </Text>
      </ImageBackground>

      <Text style={styles.logintext}>Register</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.khung}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createAccount}>
            Already have an account? Sign in{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 220,
    width: '100%',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
    color: '#FFF',
    paddingLeft: 20,
  },
  subText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#FFF',
    paddingLeft: 20,
  },
  khung: {
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '95%',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  logintext: {
    color: '#000',
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    alignItems: 'center',
    width: '95%',
    height: 60,
    borderRadius: 40,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 26,
  },
  createAccount: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default Register;
