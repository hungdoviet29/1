import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Lấy giỏ hàng từ AsyncStorage
export const getCartItems = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('cartItems'); // Đảm bảo sử dụng đúng key 'cartItems'
        return jsonValue != null ? JSON.parse(jsonValue) : []; // Trả về giỏ hàng đã lưu hoặc mảng rỗng nếu chưa có
    } catch (e) {
        console.error("Lỗi khi lấy giỏ hàng từ AsyncStorage", e);
        return [];
    }
};

// Lưu giỏ hàng vào AsyncStorage
export const saveCartItems = async (items) => {
    try {
        const jsonValue = JSON.stringify(items); // Chuyển đổi giỏ hàng thành chuỗi JSON
        await AsyncStorage.setItem('cartItems', jsonValue); // Lưu giỏ hàng vào AsyncStorage
    } catch (e) {
        console.error("Lỗi khi lưu giỏ hàng vào AsyncStorage", e);
    }
};

// Lấy danh sách yêu thích từ AsyncStorage
export const getFavorites = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        return jsonValue != null ? JSON.parse(jsonValue) : []; // Trả về danh sách yêu thích đã lưu hoặc mảng rỗng
    } catch (e) {
        console.error("Lỗi khi lấy danh sách yêu thích từ AsyncStorage", e);
        return [];
    }
};

// Lưu danh sách yêu thích vào AsyncStorage
export const saveFavorites = async (favorites) => {
    try {
        const jsonValue = JSON.stringify(favorites); // Chuyển đổi danh sách yêu thích thành chuỗi JSON
        await AsyncStorage.setItem('favorites', jsonValue); // Lưu danh sách yêu thích vào AsyncStorage
    } catch (e) {
        console.error("Lỗi khi lưu danh sách yêu thích vào AsyncStorage", e);
    }
};

// Lấy giỏ hàng từ localStorage (Nếu cần sử dụng localStorage hoặc làm ví dụ khác)
const loadCartFromLocalStorage = async () => {
    const savedCart = await AsyncStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []; // Trả về giỏ hàng nếu có hoặc mảng rỗng nếu không có
};

useEffect(() => {
    const fetchUserId = async () => {
        try {
            const id = await AsyncStorage.getItem('userId');
            if (id) {
                setUserId(id);
            } else {
                Alert.alert('Error', 'User ID not found. Please log in again.');
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };
    fetchUserId();
}, []);
const handleLogout = async () => {
    await AsyncStorage.clear(); // Xóa toàn bộ dữ liệu
    Alert.alert('Thành công', 'Bạn đã đăng xuất');
    useNavigation.navigate('Login');
};
