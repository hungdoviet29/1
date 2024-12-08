import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const CustomDrawerContent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Error', 'User information not found.');
          return;
        }
        const response = await axios.get(`http://192.168.0.245:3000/users/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('Error', 'Unable to load user information.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!userInfo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading user information...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#1E90FF', '#87CEFA']} style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: userInfo.avatar || 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userInfo.username}</Text>
        <Text style={styles.profileEmail}>{userInfo.email}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('OderScreen')}>
          <Image source={require('../acssets/Carticon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favorite')}>
          <Image source={require('../acssets/Favorite.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('OderScreen')}>
          <Image source={require('../acssets/Caricon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Order Status</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NotificationScreen')}>
          <Image source={require('../acssets/Bellicon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HelpScreen')}>
          <Image source={require('../acssets/helpicon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('OrderHistoryScreen')}>
          <Image source={require('../acssets/orderhistory.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Order History</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image source={require('../acssets/Group6893.png')} style={styles.logoutIcon} />
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 45,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#D3D3D3',
    fontSize: 14,
    marginTop: 5,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  menuIcon: {
    width: 28,
    height: 28,
    marginRight: 15,
    tintColor: '#FFFFFF',
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom:25,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FF6347',
  },
  logoutIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F5',
  },
  loadingText: {
    fontSize: 16,
    color: '#1E90FF',
    marginTop: 10,
  },
});

export default CustomDrawerContent;
