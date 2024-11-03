import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../redux/notificationSlice';
import { loadCart } from '../redux/cartSlice';
import { addOrder } from '../redux/orderSlice'; // Đảm bảo đường dẫn đúng

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();

    const cartItems = useSelector(state => state.cart.items);
    const { shippingInfo } = route.params || {}; // Lấy thông tin giao hàng từ route params
    const [deliveryMethod, setDeliveryMethod] = React.useState('Select Method');
    const [paymentMethod, setPaymentMethod] = React.useState('None');
    const [promoCode, setPromoCode] = React.useState('');
    const [totalCost, setTotalCost] = React.useState(0);
    const [deliveryCost, setDeliveryCost] = React.useState(0); // Phí giao hàng

    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    useEffect(() => {
        calculateTotalCost(cartItems); // Tính toán tổng chi phí mỗi khi giỏ hàng hoặc phí giao hàng thay đổi
    }, [cartItems, deliveryCost]);

    const calculateTotalCost = (items) => {
        if (!Array.isArray(items)) return;

        // Tính toán tổng tiền sản phẩm trong giỏ hàng
        const productTotal = items.reduce((sum, item) => {
            const price = item.gia || 0; // Lấy giá sản phẩm
            const quantity = item.quantity || 0; // Lấy số lượng sản phẩm
            return sum + (price * quantity); // Tính tổng tiền cho sản phẩm
        }, 0);

        // Tính tổng chi phí bao gồm phí giao hàng
        const total = productTotal + deliveryCost; // Tổng chi phí

        // Giảm giá nếu có
        let finalTotal = total;
        if (promoCode === 'DISCOUNT10') {
            finalTotal *= 0.9; // Giảm giá 10%
        }

        setTotalCost(finalTotal); // Cập nhật tổng chi phí
    };

    const handleSelectDelivery = () => {
        Alert.alert(
            'Select Delivery Method',
            '',
            [
                { text: 'Standard Shipping', onPress: () => { 
                    setDeliveryMethod('Standard Shipping'); 
                    setDeliveryCost(20000); // Phí giao hàng tiêu chuẩn
                }},
                { text: 'Express Shipping', onPress: () => { 
                    setDeliveryMethod('Express Shipping'); 
                    setDeliveryCost(50000); // Phí giao hàng nhanh
                }},
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const handleSelectPayment = () => {
        Alert.alert(
            'Select Payment Method',
            '',
            [
                { text: 'Credit Card', onPress: () => setPaymentMethod('Credit Card') },
                { text: 'PayPal', onPress: () => setPaymentMethod('PayPal') },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const handleApplyPromoCode = () => {
        calculateTotalCost(cartItems); // Tính toán lại tổng chi phí khi áp dụng mã giảm giá
        if (promoCode === 'DISCOUNT10') {
            Alert.alert('Promo Applied', 'You received a 10% discount!');
        } else {
            Alert.alert('Invalid Promo Code', 'Please try again.');
        }
    };

    const confirmOrder = () => {
        const newOrder = {
            id: new Date().getTime(), // Tạo ID cho đơn hàng mới
            shippingInfo, // Lấy thông tin giao hàng
            totalAmount: totalCost, // Lấy tổng chi phí
            status: 'Chờ xử lý', // Trạng thái mặc định
            hinhAnh: cartItems[0]?.hinhAnh || '', // Ví dụ: hình ảnh từ sản phẩm đầu tiên
        };
    
        Alert.alert(
            'Confirm Order',
            `Total Cost: ${totalCost.toLocaleString()} VND\n` +
            `Delivery Method: ${deliveryMethod}\n` +
            `Payment Method: ${paymentMethod}\n` +
            (promoCode ? `Promo Code: ${promoCode}\n` : '') +
            'Proceed with placing the order?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Confirm', 
                    onPress: () => {
                        // Thêm đơn hàng mới vào Redux
                        dispatch(addOrder(newOrder));
                        // Thêm thông báo mới vào Redux
                        dispatch(addNotification({
                            message: `Bạn đã thanh toán đơn hàng thành công lúc ${new Date().toLocaleTimeString()}`,
                            timestamp: new Date().toLocaleString(),
                        }));
                        // Chuyển đến màn hình OrderScreen và truyền thông tin giao hàng và tổng tiền
                        navigation.navigate('ShippingScreen', { totalCost });
                    }
                },
            ]
        );
    };
    
    
    
    
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Checkout</Text>
            </View>

            <ScrollView contentContainerStyle={styles.productList}>
                {cartItems.length === 0 ? (
                    <Text style={styles.emptyCartText}>Giỏ hàng trống.</Text>
                ) : (
                    cartItems.map((item, index) => (
                        <View key={index} style={styles.productItem}>
                            <Image source={{ uri: item.hinhAnh }} style={styles.itemImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{item.ten}</Text>
                                <Text style={styles.productPrice}>{item.gia.toLocaleString()} VND x {item.quantity}</Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            <View style={styles.checkoutSection}>
                <TouchableOpacity style={styles.row} onPress={handleSelectDelivery}>
                    <Text style={styles.rowLabel}>Delivery</Text>
                    <View style={styles.rowAction}>
                        <Text style={styles.actionText}>{deliveryMethod}</Text>
                        <Image source={require('../acssets/backarrow.png')} style={styles.arrowIcon} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={handleSelectPayment}>
                    <Text style={styles.rowLabel}>Payment</Text>
                    <View style={styles.rowAction}>
                        <Text style={styles.actionText}>{paymentMethod}</Text>
                        <Image source={require('../acssets/backarrow.png')} style={styles.arrowIcon} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={handleApplyPromoCode}>
                    <Text style={styles.rowLabel}>Promo Code</Text>
                    <View style={styles.rowAction}>
                        <Text style={styles.actionText}>Enter Code: {promoCode || 'None'}</Text>
                        <Image source={require('../acssets/backarrow.png')} style={styles.arrowIcon} />
                    </View>
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Total Cost</Text>
                    <View style={styles.rowAction}>
                        <Text style={styles.totalText}>{totalCost.toLocaleString()} VND</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.placeOrderButton} onPress={confirmOrder}>
                    <Image source={require('../acssets/Caricon.png')} style={styles.truckIcon} />
                    <Text style={styles.placeOrderText}>PLACE ORDER</Text>
                </TouchableOpacity>

                <Text style={styles.termsText}>
                    By placing an order you agree to our Terms and Conditions.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 16,
    },
    emptyCartText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    itemImage: {
        width: 60, 
        height: 60,
        resizeMode: 'contain',
        marginRight: 16,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#6C63FF',
    },
    productList: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#666',
    },
    checkoutSection: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 16,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    rowAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 16,
        color: '#666',
        marginRight: 8,
    },
    arrowIcon: {
        width: 14,
        height: 14,
        tintColor: '#888',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    placeOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6C63FF',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    placeOrderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8,
    },
    termsText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
    },
    truckIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
});

export default CheckoutScreen;
