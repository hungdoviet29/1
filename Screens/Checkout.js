import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, FlatList, Image, TextInput } from 'react-native';
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

    // Lấy User ID và tải giỏ hàng
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

    // Tải giỏ hàng từ API
    const fetchCartItems = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://192.168.3.106:3000/cart/${id}`);
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

    // Tính tổng tiền
    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => {
            if (item.productId?.gia && item.quantity) {
                return sum + item.productId.gia * item.quantity;
            }
            return sum;
        }, 0);
        setTotalAmount(total);
    };

    // Xử lý thanh toán
    const handleCheckout = async () => {
        const validCartItems = cartItems.filter((item) => item.productId !== null);
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
            const response = await fetch('http://192.168.3.106:3000/donhang', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

    // Chọn phương thức thanh toán
    const handleSelectPaymentMethod = (method) => {
        setSelectedPaymentMethod(method);
    };

    // Hiển thị loading
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

            {/* Danh sách sản phẩm */}
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.productId?._id || item._id}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
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
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống.</Text>
                }
            />

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

            {/* Phương thức thanh toán */}
            <View style={styles.paymentContainer}>
                <Text style={styles.totalAmount}>Tổng tiền: {totalAmount.toLocaleString()} VND</Text>
                <Text style={styles.paymentTitle}>Chọn phương thức thanh toán</Text>
                {['Cash', 'CreditCard', 'BankTransfer'].map((method) => (
                    <TouchableOpacity
                        key={method}
                        style={[
                            styles.paymentOption,
                            selectedPaymentMethod === method && styles.selectedPaymentOption,
                        ]}
                        onPress={() => handleSelectPaymentMethod(method)}
                    >
                        <Text style={styles.paymentText}>
                            {method === 'Cash'
                                ? 'Thanh toán khi nhận hàng'
                                : method === 'CreditCard'
                                ? 'Thanh toán qua thẻ tín dụng'
                                : 'Chuyển khoản ngân hàng'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Nút thanh toán */}
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f8f9fa', 
        paddingHorizontal: 8, 
        paddingVertical: 12 
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingVertical: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: '#ddd', 
        marginBottom: 8 
    },
    headerText: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#333' 
    },
    cartContainer: { 
        flex: 1, 
        marginBottom: 80 
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        padding: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemImage: { 
        width: 60, 
        height: 60, 
        borderRadius: 8, 
        marginRight: 10 
    },
    itemDetails: { 
        flex: 1 
    },
    itemName: { 
        fontSize: 14, 
        fontWeight: '600', 
        color: '#333' 
    },
    itemPrice: { 
        fontSize: 13, 
        fontWeight: '500', 
        color: '#f68b1e', 
        marginTop: 4 
    },
    itemQuantity: { 
        fontSize: 12, 
        color: '#888', 
        marginTop: 4 
    },
    emptyCartText: { 
        textAlign: 'center', 
        fontSize: 16, 
        color: '#888' 
    },
    shippingContainer: {
        marginVertical: 1,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    shippingTitle: { 
        fontSize: 16, 
        fontWeight: '600', 
        marginBottom: 6, 
        color: '#333' 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 5,
        borderRadius: 6,
        fontSize: 13,
        marginBottom: 5,
        backgroundColor: '#f9f9f9',
    },
    paymentContainer: {
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    paymentTitle: { 
        fontSize: 16, 
        fontWeight: '600', 
        marginBottom: 5, 
        color: '#333' 
    },
    paymentOption: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 6,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedPaymentOption: { 
        backgroundColor: '#f68b1e', 
        borderColor: '#f68b1e' 
    },
    paymentText: { 
        fontSize: 13, 
        color: '#333', 
        fontWeight: '500' 
    },
    totalAmount: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right',
        marginVertical: 12,
    },
    checkoutButton: {
        backgroundColor: '#f68b1e',
        paddingVertical: 10, // Điều chỉnh chiều cao
        borderRadius: 7,
        marginBottom: 40,
    },
    checkoutButtonText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#f68b1e',
        paddingVertical: 10, // Điều chỉnh chiều cao
        borderRadius: 7,
        marginBottom: 55,
    },
    checkoutButtonText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },        
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});


export default CheckoutScreen;  