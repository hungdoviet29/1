import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const isValidEmail = email => {
    if (!email.trim()) {
      return 'Email không được để trống.'; // Kiểm tra nếu email rỗng
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      return 'Địa chỉ email không hợp lệ. Vui lòng nhập lại email hợp lệ.';
    }
    return ''; // Email hợp lệ
  };

  const validatePassword = password => {
    const errors = [];

    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
      errors.push('Mật khẩu phải có ít nhất 8 ký tự.');
    }

    // Kiểm tra chữ hoa
    if (!/[A-Z]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất 1 chữ hoa.');
    }

    // Kiểm tra chữ số
    if (!/\d/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất 1 chữ số.');
    }

    // Kiểm tra ký tự đặc biệt
    if (!/[@$!%*?&]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (@, $, !, %, *, ?, &).');
    }

    return errors;
  };

  const handleRegister = async () => {
    let valid = true;
    
    setErrorName('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');

    // Kiểm tra tên đăng nhập
    if (!tenDangNhap.trim()) {
      setErrorName('Tên đăng nhập không được bỏ trống.');
      valid = false;
    }

    // Kiểm tra email
    const emailError = isValidEmail(email);
    if (emailError) {
      setErrorEmail(emailError);
      valid = false;
    }

    // Kiểm tra mật khẩu
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setErrorPassword(passwordErrors.join(' ')); // Gộp các thông báo lỗi thành 1 chuỗi
      valid = false;
    }

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      setErrorConfirmPassword('Mật khẩu và xác nhận mật khẩu không khớp.');
      valid = false;
    }

    if (!valid) return;

    const newUser = {
      tenDangNhap: tenDangNhap,
      email: email,
      matKhau: password,
      vaiTro: 'user',
      roll: 2,
    };

    try {
      const response = await fetch('http://192.168.0.104:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        navigation.navigate('Login');
      } else {
        setErrorName('Đăng ký không thành công. Vui lòng thử lại.');
      }
    } catch (error) {
      setErrorName('Lỗi kết nối mạng. Vui lòng thử lại.');
      console.error('Lỗi trong quá trình đăng ký:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={require('../acssets/dangky.png')}
          style={styles.background}
          imageStyle={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <Text style={styles.welcomeText}>Get's started with LapStore!</Text>
          <Text style={styles.subText}>
            Create your account and start enjoying shopping
          </Text>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.title}>SIGN UP</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Full Name"
              value={tenDangNhap}
              onChangeText={setTenDangNhap}
              placeholderTextColor="#C1C1C1"
            />
            {errorName ? <Text style={styles.errorText}>{errorName}</Text> : null}

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#C1C1C1"
            />
            {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#C1C1C1"
            />
            {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#C1C1C1"
            />
            {errorConfirmPassword ? <Text style={styles.errorText}>{errorConfirmPassword}</Text> : null}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}>
              <Text style={styles.registerButtonText}>SIGN UP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInText}>
                Already have an account?{' '}
                <Text style={styles.signInLink}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F1',
  },
  background: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#C1C1C1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4B4B8F',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  signInLink: {
    color: '#4B4B8F',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    marginBottom: 10,
    fontSize: 14,
  },
});

export default Register;
