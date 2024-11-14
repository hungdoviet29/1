import AsyncStorage from '@react-native-async-storage/async-storage';


export const getCartItems = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('cartItems');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Lỗi khi lấy giỏ hàng từ AsyncStorage", e);
        return [];
    }
};

export const saveCartItems = async (items) => {
    try {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem('cartIteams', jsonValue);
    } catch (e) {
        console.error("Lỗi khi lưu giỏ hàng vào AsyncStorage", e);
    }
};
const loadCartFromLocalStorage = async () => {
    const savedCart = await AsyncStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};
export const getFavorites = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Lỗi khi lấy danh sách yêu thích từ AsyncStorage", e);
        return [];
    }
};

// Lưu danh sách yêu thích vào AsyncStorage
export const saveFavorites = async (favorites) => {
    try {
        const jsonValue = JSON.stringify(favorites);
        await AsyncStorage.setItem('favorites', jsonValue);
    } catch (e) {
        console.error("Lỗi khi lưu danh sách yêu thích vào AsyncStorage", e);
    }
};