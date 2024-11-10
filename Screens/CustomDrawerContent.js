import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../acssets/profile1.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Tien Tai</Text>
        <Text style={styles.profileEmail}>tai2804@gmail.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('OderScreen')}>
          <Image source={require('../acssets/Carticon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favorite')}>
          <Image source={require('../acssets/Favorite.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('OderScreen')}>
          <Image source={require('../acssets/Caricon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Order status</Text>
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
      <TouchableOpacity style={styles.logoutButton}>
        <Image source={require('../acssets/Group6893.png')} style={styles.menuIcon} />
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#6C63FF', // Adjust to match background in the image
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#fff',
    fontSize: 14,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 15,
  },
});

export default CustomDrawerContent;
