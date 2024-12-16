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
import { ScrollView } from 'react-native-gesture-handler';

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
    }, [route.params?.clearInputs]),
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
    try {
      const response = await fetch('http://192.168.0.245:3000/users');
      const users = await response.json();
      const user = users.find(
        user => user.tenDangNhap === tenDangNhap && user.matKhau === matKhau,
      );

      if (user) {
        if (user.trangThai === 'inactive') {
          setError(
            'Tài khoản của bạn đang bị vô hiệu hóa. Vui lòng liên hệ quản trị viên.',
          );
          return;
        }

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
  const [showPassword, setShowPassword] = useState(false);


  return (

    <View style={styles.container}>
      <View style={styles.form}>
        <ImageBackground
          source={require('../acssets/laplogin.png')}
          style={styles.background}
          imageStyle={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <Text style={styles.welcomeText}>Chào mừng bạn đã trở lại!</Text>
        </ImageBackground>
        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>

        <Text style={styles.label}>Tên đăng nhập</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={tenDangNhap}
            onChangeText={setTenDangNhap}
            placeholder="Enter your user name"
            keyboardType="email-address"
            placeholderTextColor="#C1C1C1"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label1}>Mật khẩu</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={matKhau}
            onChangeText={setMatKhau}
            secureTextEntry={!showPassword} // Điều khiển hiển thị mật khẩu
            placeholderTextColor="#C1C1C1"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={
                showPassword
                  ? require('../acssets/htmk.png') // Đường dẫn tới icon mắt mở
                  : require('../acssets/htmk.png') // Đường dẫn tới icon mắt đóng
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.checkboxContainer}>
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.rememberMeText}>Nhớ mật khẩu</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <View style={styles.row}>
            <Text style={styles.signupText}>Bạn chưa có mật khẩu?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}> Đăng kí.</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPasswordText}>Quyên mật khẩu?</Text>
          </TouchableOpacity>
        </View>



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
    marginBottom: 40,
    marginHorizontal: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'column', // Xếp các phần tử theo chiều dọc
    alignItems: 'center', // Căn giữa nội dung
    marginTop: 20, // Khoảng cách phía trên
  },
  row: {
    flexDirection: 'row', // Xếp chữ "Bạn chưa có mật khẩu?" và "Đăng kí" trên cùng một dòng
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  signupText: {
    fontSize: 16,
    color: '#333', // Màu chữ
  },
  signupLink: {
    fontSize: 16,
    color: '#007BFF', // Màu xanh để nhấn mạnh
    marginLeft: 5, // Khoảng cách giữa "Bạn chưa có mật khẩu?" và "Đăng kí"
  },
  forgotPasswordContainer: {
    marginTop: 20, // Khoảng cách phía trên giữa dòng trên và "Quyên mật khẩu?"
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#007BFF', // Màu xanh để nhấn mạnh
    textAlign: 'center', // Căn giữa nội dung
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  eyeIcon: {
    width: 24, // Kích thước icon
    height: 24,

  },


});
//lo

export default Login;
