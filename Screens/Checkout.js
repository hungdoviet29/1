import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Image,
    TextInput,
    Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({ navigation, route }) => {
    const { selectedItems, totalAmount, voucher } = route.params;
    const [cartItems, setCartItems] = useState(selectedItems || []);
    const [total, setTotal] = useState(totalAmount || 0);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [isPaymentDropdownVisible, setPaymentDropdownVisible] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const [selectedVoucher, setSelectedVoucher] = useState(voucher);
    const [vouchers, setVouchers] = useState([]);
    const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            if (id) {
                setUserId(id);
                fetchCartItems(id);
            } else {
                Alert.alert('Lỗi', 'Không tìm thấy User ID. Vui lòng đăng nhập lại.');
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await fetch('http://192.168.101.9:3000/vouchers');
                const data = await response.json();
                if (response.ok) {
                    setVouchers(data); // Set the vouchers from the API response
                } else {
                    Alert.alert('Lỗi', 'Không thể tải voucher.');
                }
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
            }
        };
        fetchVouchers();
    }, []);

    const fetchCartItems = async id => {
        setLoading(true);
        try {
            const response = await fetch(`http://192.168.101.9:3000/cart/${id}`);
            const data = await response.json();
            if (response.ok) {
                setCartItems(data.items || []);
                calculateTotal(data.items || []);
            } else {
                Alert.alert('Lỗi', data.message || 'Không thể tải giỏ hàng.');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = (items, voucher = selectedVoucher) => {
        console.log('Bắt đầu tính tổng tiền...');

        let newTotal = items.reduce((sum, item) => {
            if (item.productId?.gia && item.quantity) {
                console.log(`Sản phẩm: ${item.productId?.ten || 'Không xác định'}, Giá: ${item.productId.gia}, Số lượng: ${item.quantity}`);
                return sum + item.productId.gia * item.quantity;
            }
            return sum;
        }, 0);

        console.log('Tổng tiền trước khi áp dụng giảm giá:', newTotal);

        if (voucher && voucher.title) {
            console.log('Voucher đang được áp dụng:', voucher);

            const discountPercentage = parseFloat(voucher.title.trim());
            console.log('Phần trăm giảm giá:', discountPercentage);

            if (!isNaN(discountPercentage) && discountPercentage > 0) {
                const discountAmount = (newTotal * discountPercentage) / 100;
                console.log('Số tiền giảm:', discountAmount);

                newTotal -= discountAmount;
            } else {
                console.log('Không thể chuyển đổi phần trăm giảm giá.');
            }
        } else {
            console.log('Không có voucher nào được áp dụng.');
        }

        console.log('Tổng tiền sau khi áp dụng giảm giá:', newTotal);

        setTotal(newTotal);
    };



    const handleCheckout = async () => {
        const validCartItems = cartItems.filter(item => item.productId !== null);
        if (!validCartItems.length) {
            Alert.alert('Lỗi', 'Giỏ hàng của bạn có sản phẩm không hợp lệ.');
            return;
        }

        Alert.alert(
            'Xác nhận thanh toán',
            'Bạn có chắc chắn muốn thanh toán với số tiền này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Tiến hành',
                    onPress: async () => {
                        const orderData = {
                            userId,
                            cartItems: validCartItems,
                            totalAmount: total,
                            paymentMethod: selectedPaymentMethod,
                            shippingInfo,
                            voucher: selectedVoucher ? selectedVoucher._id : null,
                        };

                        try {
                            const response = await fetch(
                                'http://192.168.101.9:3000/donhang',
                                {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(orderData),
                                },
                            );
                            const responseBody = await response.json();
                            if (response.ok && responseBody.success) {
                                Alert.alert('Thành công', 'Đơn hàng đã được tạo.');
                                await resetCart();
                                navigation.navigate('NotificationScreen', {
                                    message: 'Đơn hàng của bạn đã được tạo thành công!',
                                });
                            } else {
                                Alert.alert(
                                    'Lỗi',
                                    responseBody.message || 'Không thể tạo đơn hàng.',
                                );
                            }
                        } catch (error) {
                            Alert.alert('Lỗi', 'Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
                        }
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const resetCart = async () => {
        try {
            const response = await fetch(`http://192.168.101.9:3000/cart/${userId}`);
            const data = await response.json();
            if (data && data.items && data.items.length > 0) {
                const deleteResponse = await fetch(
                    `http://192.168.101.9:3000/cart/${userId}`,
                    {
                        method: 'DELETE',
                    },
                );
                if (deleteResponse.ok) {
                    setCartItems([]);
                    setTotal(0);
                }
            }
        } catch (error) {
            console.error('Failed to reset cart:', error);
        }
    };

    const handleSelectPaymentMethod = method => {
        setSelectedPaymentMethod(method);
        setPaymentDropdownVisible(false); // Close the dropdown after selection
    };

    const handleVoucherSelect = voucher => {
        setSelectedVoucher(voucher);
        setVoucherModalVisible(false);
        calculateTotal(cartItems, voucher); // Tính lại tổng tiền ngay lập tức với voucher mới
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
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Thanh toán</Text>
            </View>

            <ScrollView style={{ maxHeight: 200 }}>
                {cartItems.map((item, index) => (
                    <View key={index} style={styles.cartItem}>
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
                            <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>


            <View style={styles.shippingContainer}>
                <Text style={styles.shippingTitle}>Thông tin vận chuyển</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tên người nhận"
                    value={shippingInfo.name}
                    onChangeText={text => setShippingInfo({ ...shippingInfo, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    keyboardType="phone-pad"
                    value={shippingInfo.phone}
                    onChangeText={text => setShippingInfo({ ...shippingInfo, phone: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ"
                    value={shippingInfo.address}
                    onChangeText={text =>
                        setShippingInfo({ ...shippingInfo, address: text })
                    }
                />
            </View>

            <View style={styles.paymentContainer}>
                <Text style={styles.totalAmount}>
                    Tổng tiền: {total.toLocaleString()} VND
                </Text>

                <TouchableOpacity
                    style={styles.paymentMethodButton}
                    onPress={() => setPaymentDropdownVisible(!isPaymentDropdownVisible)}>
                    <Text style={styles.paymentMethodText}>
                        {selectedPaymentMethod || 'Chọn phương thức thanh toán'}
                    </Text>
                </TouchableOpacity>

                {isPaymentDropdownVisible && (
                    <View style={styles.paymentDropdown}>
                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() =>
                                handleSelectPaymentMethod('Thanh toán khi nhận hàng')
                            }>
                            <Text style={styles.paymentOptionText}>
                                Thanh toán khi nhận hàng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => handleSelectPaymentMethod('Chuyển khoản')}>
                            <Text style={styles.paymentOptionText}>Chuyển khoản</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View style={styles.voucherContainer}>
                <TouchableOpacity
                    onPress={() => setVoucherModalVisible(true)}
                    style={styles.voucherButton}>
                    <Text style={styles.voucheText}>Chọn mã giảm giá</Text>
                </TouchableOpacity>

                <Modal
                    visible={isVoucherModalVisible}
                    animationType="slide"
                    transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView style={{ maxHeight: 300 }}>
                                {vouchers.map((item) => (
                                    <TouchableOpacity
                                        key={item._id}
                                        onPress={() => handleVoucherSelect(item)}
                                        style={[
                                            styles.voucherOption,
                                            selectedVoucher?._id === item._id && { backgroundColor: '#f0f8ff' },
                                        ]}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View
                                                style={[
                                                    styles.checkbox,
                                                    selectedVoucher?._id === item._id && styles.checkboxSelected,
                                                ]}
                                            />
                                            <Text style={styles.voucherText}>
                                                {item.title}% giảm giá
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <TouchableOpacity
                                onPress={() => setVoucherModalVisible(false)}
                                style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 15,
        backgroundColor: '#f8b400',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    cartItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#555',
    },
    shippingContainer: {
        padding: 15,
    },
    shippingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    paymentContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    paymentMethodButton: {
        padding: 10,
        backgroundColor: '#f8b400',
        borderRadius: 5,
    },
    paymentMethodText: {
        color: '#fff',
        fontSize: 16,
    },
    paymentDropdown: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    paymentOption: {
        padding: 10,
    },
    paymentOptionText: {
        fontSize: 16,
    },
    voucherContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    voucherButton: {
        padding: 10,
        backgroundColor: '#f8b400',
        borderRadius: 5,
    },
    voucherText: {
        color: 'black',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '70%', // Giới hạn chiều cao Modal
        elevation: 5, // Bóng đổ
    },
    voucherOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    voucheText: {
        fontSize: 16,
        color: '#FFF',
        flex: 1, // Tối ưu hóa không gian
    },

    closeButton: {
        padding: 10,
        backgroundColor: '#f8b400',
        borderRadius: 5,
        marginTop: 15,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    checkoutButton: {
        padding: 15,
        backgroundColor: '#f8b400',
        borderRadius: 5,
        margin: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: '#f8b400',
        borderColor: '#f8b400',
    },
    

});

export default CheckoutScreen;
