import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const [userId, setUserId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    console.log('Retrieved userId:', id);
                    setUserId(id);
                    fetchCartItems(id);
                } else {
                    Alert.alert('Error', 'User ID not found. Please log in again.');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                Alert.alert('Error', 'Failed to retrieve user ID.');
            }
        };

        fetchUserId(); // Chỉ gọi một lần khi màn hình được lần đầu tiên render

    }, []); // [] để chỉ gọi một lần khi component được mount lần đầu

    useFocusEffect(
        React.useCallback(() => {
            // Kiểm tra lại khi màn hình focus và `userId` đã có
            if (userId) {
                fetchCartItems(userId);
            }
        }, [userId]) // Chỉ chạy lại khi `userId` thay đổi
    );

    const fetchCartItems = async (id) => {
        try {
            const response = await fetch(`http://192.168.3.106:3000/cart/${id}`);
            const data = await response.json();
            console.log('Cart API Response:', data);
            if (response.ok) {
                setCartItems(data.items || []);
                calculateTotal(data.items || []);
            } else {
                Alert.alert('Error', data.message || 'Failed to load cart.');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => {
            if (item.productId?.gia && item.quantity) {
                return sum + item.productId.gia * item.quantity;
            }
            return sum;
        }, 0);
        setTotalAmount(total);
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            Alert.alert('Error', 'Quantity must be at least 1.');
            return;
        }

        // Optimistic Update
        const updatedCartItems = cartItems.map((item) =>
            item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems);

        try {
            const response = await fetch('http://192.168.3.106:3000/cart/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId, quantity: newQuantity }),
            });
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            Alert.alert('Error', 'Unable to update quantity. Please try again.');
            // Rollback optimistic update
            fetchCartItems(userId);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const response = await fetch('http://192.168.3.106:3000/cart/remove', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId }),
            });
            const data = await response.json();
            if (response.ok) {
                fetchCartItems(userId); // Gọi lại API để làm mới dữ liệu
            } else {
                Alert.alert('Error', data.message || 'Failed to remove item.');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Cart</Text>
            </View>
            <ScrollView contentContainerStyle={styles.cartContainer}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <View key={item.productId?._id || item._id} style={styles.cartItem}>
                            <Image source={{ uri: item.productId?.hinhAnh }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.productId?.ten || 'Unknown Product'}</Text>
                                <Text style={styles.itemPrice}>
                                    {item.productId?.gia
                                        ? `${item.productId.gia.toLocaleString()} VND`
                                        : 'Price unavailable'}
                                </Text>
                            </View>
                            <View style={styles.itemActions}>
                                <TouchableOpacity
                                    onPress={() => handleUpdateQuantity(item.productId?._id, item.quantity - 1)}
                                    style={styles.quantityButton}
                                >
                                    <Text style={styles.quantityText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => handleUpdateQuantity(item.productId?._id, item.quantity + 1)}
                                    style={styles.quantityButton}
                                >
                                    <Text style={styles.quantityText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handleRemoveItem(item.productId?._id)}>
                                <Text style={styles.removeItemText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                )}
            </ScrollView>

            <View style={styles.checkoutBar}>
                <TouchableOpacity style={styles.checkoutButton} onPress={() =>
                        navigation.navigate('Checkout', { cartItems, totalAmount })
                    }>
                    <Text style={styles.checkoutText}>Checkout</Text>
                    <Text style={styles.totalAmount}>{`${totalAmount.toLocaleString()} VND`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    totalAmount: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        marginBottom: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    cartContainer: {
        paddingHorizontal: 16,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F4FA',
        borderRadius: 10,
        marginVertical: 10,
        padding: 16,
    },
    itemImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    quantityButton: {
        padding: 6,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 6,
    },
    quantityText: {
        marginHorizontal: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    removeItemText: {
        fontSize: 20,
        color: '#E57373',
        fontWeight: 'bold',
    },
    emptyCartText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
    checkoutBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F8B400',
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    checkoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkoutText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CartScreen;
