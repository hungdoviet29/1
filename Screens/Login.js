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

const Login = () => {
  const navigation = useNavigation();
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.20.10.6:3000/users');
      const users = await response.json();
      const user = users.find(
        user => user.tenDangNhap === tenDangNhap && user.matKhau === matKhau,
      );
      // Log thông tin người dùng
      console.log('User found:', user);

      if (user) {
        console.log('Roll:', user.roll); // Kiểm tra thuộc tính roll
        if (user.roll === 1) {
          navigation.navigate('AdminHome');
        } else {
          navigation.navigate('Home');
        }
      } else {
        setError('Thông tin đăng nhập không đúng.');
      }
    } catch (error) {
      setError('Lỗi kết nối mạng.');
      console.error('Lỗi trong quá trình đăng nhập:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../acssets/laplogin.png')}
        style={styles.background}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>
          Yay! You're back. Thanks for shopping with us.
        </Text>
        <Text style={styles.subText}>
          We have exciting deals and promotions going on, grab your pick now!
        </Text>
      </ImageBackground>

      <Text style={styles.logintext}>LOGIN</Text>

      <View style={styles.khung}>
        <TextInput
          style={styles.input}
          value={tenDangNhap}
          onChangeText={setTenDangNhap}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={matKhau}
          onChangeText={setMatKhau}
          secureTextEntry
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.optionsContainer}>
          <Text style={styles.rememberMe}>Remember me</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.createAccount}>
            Not registered yet? Create an Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 250,
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
    height: 40,
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
    marginBottom: 50,
    marginTop: 50,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMe: {
    fontSize: 14,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007BFF',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    alignItems: 'center',
    width: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  createAccount: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Login;
