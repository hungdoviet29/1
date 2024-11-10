import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeOrder, selectOrders } from '../redux/orderSlice';
import { useNavigation } from '@react-navigation/native';

const OrderHistoryScreen = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
console.log('Danh sách đơn hàng sau khi xóa:', orders);
 // Lấy danh sách đơn hàng từ Redux
    const navigation = useNavigation();

    // Lọc các đơn hàng hợp lệ (đủ thông tin)
    const validOrders = orders.filter(order => order.shippingInfo && order.shippingInfo.name && order.shippingInfo.phone && order.shippingInfo.address && order.totalAmount);


    // Hàm xử lý khi nhấn nút xóa
    const handleDeleteOrder = (orderId) => {
        console.log('Xóa đơn hàng với ID:', orderId);
        dispatch(removeOrder(String(orderId))); // Ép kiểu thành string trước khi dispatch
    };
    

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Order History</Text>
            </View>

            {/* Danh sách đơn hàng */}
            <ScrollView contentContainerStyle={styles.orderContainer}>
                {validOrders.length > 0 ? (
                    validOrders.map((order, index) => (
                        console.log(order),
                        
                        <View key={index} style={styles.orderCard}>
                            <TouchableOpacity 
                                style={styles.deleteButton} 
                                onPress={() => handleDeleteOrder(order.id)} // Gọi hàm xóa với order.id
                            >
                                <Text style={styles.deleteText}>✕</Text>
                            </TouchableOpacity>
                            <Text style={styles.orderStatus}>Trạng thái: {order.status}</Text>
                            <View style={styles.shippingInfo}>
                                <Text style={styles.infoText}>Tên người nhận: {order.shippingInfo.name}</Text>
                                <Text style={styles.infoText}>Số điện thoại: {order.shippingInfo.phone}</Text>
                                <Text style={styles.infoText}>Địa chỉ: {order.shippingInfo.address}</Text>
                            </View>
                            <Text style={styles.totalAmount}>Tổng tiền: {order.totalAmount.toLocaleString()} VND</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noOrdersText}>Không có lịch sử đơn hàng.</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    icon: {
        width: 24,
        height: 24,
    },
    orderContainer: {
        padding: 16,
    },
    orderCard: {
        backgroundColor: '#F2F4FA',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    shippingInfo: {
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        color: '#333',
    },
    totalAmount: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 10,
    },
    orderStatus: {
        fontSize: 14,
        color: '#6C63FF',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 4,
    },
    deleteText: {
        fontSize: 16,
        color: '#888',
    },
    noOrdersText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
    },
});

export default OrderHistoryScreen;
