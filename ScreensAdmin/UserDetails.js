import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function UserDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params; // Nhận thông tin người dùng từ route

  const [showHistory, setShowHistory] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>USER DETAILS</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        
        <Text style={styles.name}>{user.tenDangNhap}</Text>
        
        <Text style={styles.info}>{user.phone}</Text>
        <Text style={styles.email}>{user.email}</Text>
        
        
        <Text style={styles.address}>{user.diaChi}</Text>
        
        <TouchableOpacity onPress={() => setShowHistory(!showHistory)}>
          <Text style={styles.historyLink}>LỊCH SỬ MUA HÀNG</Text>
        </TouchableOpacity>

        {showHistory && (
          <FlatList
            data={user.purchaseHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>{item.item}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
            )}
          />
        )}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 100, // Khoảng cách giữa nút back và tiêu đề
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  avatar: {
    width: 226,
    height: 238,
    borderRadius: 40,
    marginBottom: 25,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6342E8',
    marginBottom: 25,
  },
  info: {
    fontSize: 16,
    color: '#A1A1A1',
    marginBottom: 25,
  },
  email: {
    fontSize: 17,
    color: '#000000',
    marginBottom: 25,
  },
  address: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
    marginBottom: 25,
  },
  historyLink: {
    fontSize: 16,
    color: '#0000ff',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
  historyDate: {
    fontSize: 16,
    color: '#666',
  },
});

