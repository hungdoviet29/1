import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ChangePhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');

  const handleSendVerificationCode = () => {
    console.log('Sending verification code to', phoneNumber);
  };

  const handleSubmit = () => {
    console.log('Submitting new phone number with verification and password');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Change Phone Number</Text>
      </View>

      <Text style={styles.infoText}>
        Nhập số điện thoại di động để nhận mã xác nhận miễn phí
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>+84</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại di động"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã xác nhận"
          keyboardType="numeric"
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendVerificationCode}>
          <Text style={styles.sendButtonText}>Gửi mã xác nhận</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.eyeIcon}>👁️</Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    fontSize: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
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
  prefix: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  sendButton: {
    backgroundColor: '#6C63FF',
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePhoneNumberScreen;
