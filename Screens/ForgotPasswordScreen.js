import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import axios from 'axios'; // Cài axios nếu chưa cài: npm install axios

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    if (email) {
      try {
        // Gọi API gửi yêu cầu đặt lại mật khẩu
        const response = await axios.post(
          'http://192.168.1.17:3000/users/forgotPassword',
          {email},
        );
        setMessage(response.data.message); // Hiển thị thông báo từ server
      } catch (error) {
        console.error('Error sending password reset email:', error.message);
        setMessage(`Error: ${error.message}`);
      }
    } else {
      setMessage('Please enter your email');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../acssets/pass.png')} // Đảm bảo đường dẫn hình ảnh là chính xác
        style={styles.background}></ImageBackground>

      <Text style={styles.title}>FORGOT PASSWORD</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>SEND RESET LINK</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  background: {
    height: 300,
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4C3FB4',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 20,
  },
  backToLogin: {
    textAlign: 'center',
    color: '#4C3FB4',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
