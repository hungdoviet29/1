// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCartItems = async (items) => {
    try {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem('cartItems', jsonValue);
    } catch (e) {
        console.error("Error saving cart items:", e);
    }
};

export const loadCartItems = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('cartItems');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error loading cart items:", e);
        return [];
    }
};

export const loadFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Error loading favorites", error);
      return [];
    }
  };
  export const saveFavorites = async (favorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites", error);
    }
  };