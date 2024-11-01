// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
// import { AntDesign } from '@expo/vector-icons'; // Hoặc thư viện icon khác mà bạn chọn

// const ResetPasswordScreen = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handlePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Image source={require('./lock-shield.png')} style={styles.icon} /> */}
//       <Text style={styles.title}>TẠO MẬT KHẨU</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new password"
//         secureTextEntry={!showPassword}
//         onChangeText={(text) => setNewPassword(text)}
//       />
//       <AntDesign
//         name={showPassword ? 'eye' : 'eyeo'}
//         size={24}
//         color="gray"
//         style={styles.eyeIcon}
//         onPress={handlePasswordVisibility}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Re-enter new password"
//         secureTextEntry={!showPassword}
//         onChangeText={(text) => setConfirmPassword(text)}
//       />
//       <AntDesign
//         name={showPassword ? 'eye' : 'eyeo'}
//         size={24}
//         color="gray"
//         style={styles.eyeIcon}
//         onPress={handlePasswordVisibility}
//       />
//       <Button title="TIẾP TỤC" onPress={() => {}} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // ... Các styles cho container, text, input, icon, button ...
// });

// export default ResetPasswordScreen;
import React from 'react';
import { View, Text } from 'react-native';

const ResetPasswordScreen = () => {
  return (
    <View>
      <Text>Reset Password Screen</Text>
    </View>
  );
};

export default ResetPasswordScreen;
