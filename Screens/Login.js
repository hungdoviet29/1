import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../acssets/laplogin.png')} // Ensure the path is correct
        style={styles.background}
      >
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Yay! You're back. Thanks for shopping with us.</Text>
        <Text style={styles.subText}>We have excited deals and promotions going on, grab your pick now! </Text>
      </ImageBackground>

      <Text style={styles.logintext} > LOGIN</Text>
      
      <View style={styles.khung}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
      />
      
      <View style={styles.optionsContainer}>
        <Text style={styles.rememberMe}>Remember me</Text>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.loginButtonText}>SIGN IN</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.createAccount}>Not registered yet? Create an Account</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};
//..
const styles = StyleSheet.create({
  background: {
    height: 250,
    width: '100%',
    marginBottom :20 ,
  },
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a slight transparency for better text visibility
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop : 50,
    color :'#FFF',
    paddingLeft: 20, // Add padding to the left
  },
  subText: {
    fontSize: 16,
    marginBottom: 20,
    color :'#FFF',
    paddingLeft: 20, // Add padding to the left
  },
  khung:{
    paddingHorizontal: 20, // Add padding to both sides for indentation
    alignItems: 'center', // Center the children horizontally
    flex: 1, // Allow khung to grow within the container
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '95%',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  logintext:{
    color:'#000',
    fontSize : 30,
    marginLeft : 20,
    marginBottom :50,
    marginTop : 50
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
    width : 300,
    borderRadius : 20,
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
});

export default Login;