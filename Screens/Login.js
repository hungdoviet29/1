import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ route }) => {
  const navigation = useNavigation();
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.clearInputs) {
        setTenDangNhap('');
        setMatKhau('');
        setError(null);
      }
    }, [route.params?.clearInputs])
  );

  useEffect(() => {
    const loadCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');
      const savedRememberMe = await AsyncStorage.getItem('rememberMe');

      if (savedRememberMe === 'true') {
        setTenDangNhap(savedUsername || '');
        setMatKhau(savedPassword || '');
        setRememberMe(true);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kiểm tra định dạng email
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // Mật khẩu mạnh

    // if (!emailRegex.test(tenDangNhap)) {
    //   setError('Email không hợp lệ. Vui lòng nhập đúng định dạng.');
    //   return;
    // }

    // if (!passwordRegex.test(matKhau)) {
    //   setError(
    //     'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.'
    //   );
    //   return;
    // }

    try {
      const response = await fetch('http://192.168.3.106:3000/users');
      const users = await response.json();
      const user = users.find(
        user => user.tenDangNhap === tenDangNhap && user.matKhau === matKhau
      );

      if (user) {
        await AsyncStorage.setItem('userId', user._id);

        if (rememberMe) {
          await AsyncStorage.setItem('username', tenDangNhap);
          await AsyncStorage.setItem('password', matKhau);
          await AsyncStorage.setItem('rememberMe', 'true');
        } else {
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
          await AsyncStorage.setItem('rememberMe', 'false');
        }

        navigation.navigate(user.roll === 1 ? 'AdminHome' : 'MainHomeScreen', {
          username: user.tenDangNhap,
        });
      } else {
        setError('Thông tin đăng nhập không đúng.');
      }
    } catch (error) {
      setError('Lỗi kết nối mạng.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ImageBackground
          source={require('../acssets/laplogin.png')}
          style={styles.background}
          imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        >
          <Text style={styles.welcomeText}>Welcome Back!</Text>
        </ImageBackground>
        <Text style={styles.loginText}>LOG IN</Text>

        <Text style={styles.label}>Email address</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={tenDangNhap}
            onChangeText={setTenDangNhap}
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor="#C1C1C1"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label1}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={matKhau}
            onChangeText={setMatKhau}
            secureTextEntry
            placeholderTextColor="#C1C1C1"
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.checkboxContainer}
          >
            <View
              style={[
                styles.checkbox,
                rememberMe && styles.checkboxChecked,
              ]}
            >
              {rememberMe && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  background: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  loginText: {
    fontSize: 30,
    color: '#333',
    marginLeft: 20,
    marginVertical: 50,
  },
  form: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 0,
    paddingLeft: 25,
  },
  label1: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#C1C1C1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderColor: '#C1C1C1',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: '#6C63FF',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#6C63FF',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: '#4B4B8F',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});
//lo

export default Login;
