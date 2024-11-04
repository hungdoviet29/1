import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNRestart from 'react-native-restart';

const AccountManagement = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Đăng xuất", onPress: () => RNRestart.Restart() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatar}></View>
        <Text style={styles.name}>NGUYỄN VĂN A</Text>
        <Text style={styles.id}>ID: 0336394558</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate('EditInfo')}  // Navigate to EditInfo screen
        >
          <Image source={require('../acssets/tt.png')} style={styles.icon} />
          <Text style={styles.optionText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Image source={require('../acssets/ct.png')} style={styles.icon} />
          <Text style={styles.optionText}>Thông tin liên hệ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Image source={require('../acssets/tb.png')} style={styles.icon} />
          <Text style={styles.optionText}>Nhắn tin trực tiếp</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  id: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 25,
    marginTop: 15,
    width: '90%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountManagement;
