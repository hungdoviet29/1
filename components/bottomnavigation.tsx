// components/BottomNavigation.tsx
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Nút Home */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainHomeScreen')}
      >
        <Image
          source={require('../acssets/home.png')} // Đảm bảo đường dẫn đúng
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Nút Cart */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart')}
      >
        <Image
          source={require('../acssets/shoppingcart.png')} // Đảm bảo đường dẫn đúng
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Nút Favorites */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favorite')}
      >
        <Image
          source={require('../acssets/Vector.png')} // Đảm bảo đường dẫn đúng
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Nút Profile */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Accountmanagement')}
      >
        <Image
          source={require('../acssets/profile.png')} // Đảm bảo đường dẫn đúng
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};
//ỷyere

// Tạo style cho Bottom Navigation
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 27,
    height: 25,
  },
});

export default BottomNavigation;
