import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({ navigation }) => {
    const [userId, setUserId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    setUserId(id);
                    fetchCartItems(id);
                } else {
                    Alert.alert('Lỗi', 'Không tìm thấy User ID. Vui lòng đăng nhập lại.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy User ID:', error);
                Alert.alert('Lỗi', 'Không thể truy xuất User ID.');
            }
        };

        fetchUserId();
    }, []);

    const fetchCartItems = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://172.20.10.6:3000/cart/${id}`);
            const data = await response.json();
            if (response.ok) {
                setCartItems(data.items || []);
                calculateTotal(data.items || []);
            } else {
                Alert.alert('Lỗi', data.message || 'Không thể tải giỏ hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi tải giỏ hàng:', error);
            Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
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

   const handleCheckout = async () => {
    const validCartItems = cartItems.filter(item => item.productId !== null);
    if (!validCartItems.length) {
        Alert.alert('Lỗi', 'Giỏ hàng của bạn có sản phẩm không hợp lệ.');
        return;
    }
    
    const orderData = {
        userId,
        cartItems: validCartItems,
        totalAmount,
        paymentMethod: selectedPaymentMethod,
        shippingInfo,
    };

    try {
        const response = await fetch('http://172.20.10.6:3000/donhang', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        const responseBody = await response.json();
        if (response.ok && responseBody.success) {
            Alert.alert('Thành công', 'Đơn hàng đã được tạo.');
            navigation.navigate('OderScreen');
        } else {
            Alert.alert('Lỗi', responseBody.message || 'Không thể tạo đơn hàng.');
        }
    } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        Alert.alert('Lỗi', 'Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
    }
};



    const handleSelectPaymentMethod = (method) => {
        setSelectedPaymentMethod(method);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#F8B400" />
                <Text>Đang tải...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Thanh toán</Text>
            </View>
            <ScrollView contentContainerStyle={styles.cartContainer}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <View key={item.productId?._id || item._id} style={styles.cartItem}>
                            <Image
                                source={{ uri: item.productId?.hinhAnh }}
                                style={styles.itemImage}
                            />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>
                                    {item.productId?.ten || 'Sản phẩm không xác định'}
                                </Text>
                                <Text style={styles.itemPrice}>
                                    {item.productId?.gia
                                        ? `${item.productId.gia.toLocaleString()} VND`
                                        : 'Không có giá'}
                                </Text>
                                <Text style={styles.itemQuantity}>
                                    Số lượng: {item.quantity}
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống.</Text>
                )}
            </ScrollView>

            {/* Form nhập thông tin vận chuyển */}
            <View style={styles.shippingContainer}>
                <Text style={styles.shippingTitle}>Thông tin vận chuyển</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tên người nhận"
                    value={shippingInfo.name}
                    onChangeText={(text) => setShippingInfo({ ...shippingInfo, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    keyboardType="phone-pad"
                    value={shippingInfo.phone}
                    onChangeText={(text) => setShippingInfo({ ...shippingInfo, phone: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ"
                    value={shippingInfo.address}
                    onChangeText={(text) => setShippingInfo({ ...shippingInfo, address: text })}
                />
            </View>

            {/* Các phương thức thanh toán */}
            <View style={styles.paymentContainer}>
                <Text style={styles.totalAmount}>Tổng tiền: {totalAmount.toLocaleString()} VND</Text>
                <View style={styles.paymentMethods}>
                    <Text style={styles.paymentTitle}>Chọn phương thức thanh toán</Text>
                    <TouchableOpacity
                        style={[styles.paymentOption, selectedPaymentMethod === 'Cash' && styles.selectedPaymentOption]}
                        onPress={() => handleSelectPaymentMethod('Cash')}
                    >
                        <Text style={styles.paymentText}>Thanh toán khi nhận hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentOption, selectedPaymentMethod === 'CreditCard' && styles.selectedPaymentOption]}
                        onPress={() => handleSelectPaymentMethod('CreditCard')}
                    >
                        <Text style={styles.paymentText}>Thanh toán qua thẻ tín dụng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentOption, selectedPaymentMethod === 'BankTransfer' && styles.selectedPaymentOption]}
                        onPress={() => handleSelectPaymentMethod('BankTransfer')}
                    >
                        <Text style={styles.paymentText}>Chuyển khoản ngân hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Nút thanh toán */}
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
};




const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
    header: { backgroundColor: '#F8B400', padding: 16, borderRadius: 8, marginBottom: 10 },
    headerText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    cartContainer: { paddingTop: 20, paddingBottom: 120 }, // Tăng không gian cho nút thanh toán
    cartItem: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
        alignItems: 'center', // căn giữa các sản phẩm
    },
    itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
    itemDetails: { justifyContent: 'center', flex: 1 },
    itemName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
    itemPrice: { fontSize: 12, color: '#666' },
    itemQuantity: { fontSize: 12, color: '#888' },
    emptyCartText: { textAlign: 'center', fontSize: 16, color: '#888' },
    totalAmount: { fontSize: 14, fontWeight: 'bold', textAlign: 'right', marginTop: 20, color: '#333' },
    paymentContainer: {
        marginTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    paymentMethods: { marginTop: 10 },
    paymentTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    paymentOption: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedPaymentOption: {
        backgroundColor: '#F8B400',
    },
    paymentText: { fontSize: 14, color: '#333' },
    checkoutButton: {
        backgroundColor: '#F8B400',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 20,  // Điều chỉnh khoảng cách từ các phần tử trên
        marginBottom: 20, // Khoảng cách dưới
// Khoảng cách dưới
    },
    checkoutButtonText: { textAlign: 'center', fontSize: 16, color: '#fff', fontWeight: 'bold' },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default CheckoutScreen;  