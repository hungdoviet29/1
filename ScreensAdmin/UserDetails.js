import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserDetails() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.header}>USER DETAILS</Text>
      
      <View style={styles.card}>
        <Image
          source={require('../acssets/hinhcute.png')} // Link ảnh đại diện
          style={styles.avatar}
        />
        
        <Text style={styles.name}>Nguyễn Văn A</Text>
        
        <Text style={styles.info}>0357103658</Text>
        <Text style={styles.email}>linhdtoph35049@fpt.edu.vn</Text>
        
        <Text style={styles.info}>VIET NAM</Text>
        <Text style={styles.address}>Số 10C Hoàng Diệu, Q. Ba Đình, TP. Hà Nội</Text>
        
        <TouchableOpacity>
          <Text style={styles.historyLink}>LỊCH SỬ MUA HÀNG</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#0000ff',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  historyLink: {
    fontSize: 16,
    color: '#0000ff',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
