import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
const AccountManagement = ({ navigation }) => {
  const userData = {
    avatar: 'https://via.placeholder.com/100', // Thay bằng URL thật
    name: 'NGUYỄN VĂN A',
    id: '0336394568',
    phone: '0357103658',
    email: 'linhdtqph35049@gmail.com',
    nationality: 'Việt Nam',
    gender: 'Nữ',
    birthDate: '29/12/2004',
    password: '********',
  };
 

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      
      <Text style={styles.header}>Account Management</Text>
      
      <View style={styles.profileSection}>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{userData.name}</Text>
        <Text style={styles.userId}>ID: {userData.id}</Text>
      </View>
      
      <View style={styles.optionList}>
        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => navigation.navigate('EditPersonalInformation', { userData })}
        >
          <Text style={styles.optionIcon}>👤</Text>
          <Text style={styles.optionText}>Chỉnh sửa thông tin</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionList}>
        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => navigation.navigate('EditPersonalInformation', { userData })}
        >
          <Text style={styles.optionIcon}>👤</Text>
          <Text style={styles.optionText}>Chỉnh sửa thông tin</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionList}>
        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => navigation.navigate('DirectMessaging', { userData })}
        >
          <Text style={styles.optionIcon}>👤</Text>
          <Text style={styles.optionText}>Nhắn tin trực tiếp</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
  style={styles.logoutButton}
  onPress={() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login', params: { clearInputs: true } }],
    });
  }}
>
  <Text style={styles.logoutButtonText}>Đăng xuất</Text>
</TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  backIcon: {
    fontSize: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    fontSize: 14,
    color: '#666',
  },
  optionList: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    paddingVertical: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  logoutButton: {
    backgroundColor: '#FF4B4B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountManagement;
