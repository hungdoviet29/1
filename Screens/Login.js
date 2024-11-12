import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Login = ({route}) => {
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

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.6:3000/users');
      const users = await response.json();
      const user = users.find(
        user => user.tenDangNhap === tenDangNhap && user.matKhau === matKhau,
      );
      if (user) {
        navigation.navigate(user.roll === 1 ? 'AdminHome' : 'Home');
      } else {
        setError('Thông tin đăng nhập không đúng.');
      }
    } catch (error) {
      setError('Lỗi kết nối mạng.');
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

      <Text style={styles.loginText}>LOGIN</Text>

      <View style={styles.form}>
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
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.checkboxContainer}>
            <Text style={styles.rememberMeText}>Remember me</Text>
            <Image
              source={
                rememberMe
                  ? require('../acssets/checkbox-checked.png')
                  : require('../acssets/checkbox-unchecked.png')
              }
              style={styles.checkbox}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    width: '100%',
    height: 200,
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
  subText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    left: 12,
    top: 3,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#333',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007BFF',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccount: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
