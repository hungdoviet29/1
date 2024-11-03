import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../redux/orderSlice';
import { useRoute } from '@react-navigation/native';

const OrderScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders || []);
    const route = useRoute();
    const { shippingInfo, totalCost } = route.params || {};

    useEffect(() => {
        if (shippingInfo && totalCost !== undefined) {
            const newOrder = {
                id: String(orders.length + 1),
                shippingInfo: shippingInfo,
                totalAmount: totalCost,
                status: 'Đã thanh toán',
            };
            dispatch(addOrder(newOrder));
        }
    }, [dispatch, shippingInfo, totalCost]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Đơn Hàng</Text>
                <TouchableOpacity>
                    <Image source={require('../acssets/Menu2.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            <View style={styles.tabs}>
                <Text style={[styles.tabItem, styles.activeTab]}>Tất cả</Text>
                <Text style={styles.tabItem}>Chưa thanh toán</Text>
                <Text style={styles.tabItem}>Chờ vận chuyển</Text>
                <Text style={styles.tabItem}>Đã vận chuyển</Text>
            </View>

            <ScrollView style={styles.ordersList}>
    {orders.length > 0 ? (
        orders
            .filter(order => order.status === 'Đã thanh toán') // Chỉ lấy đơn hàng đã thanh toán
            .map((order) => (
                <View key={order.id} style={styles.orderItem}>
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>
                            Tên người nhận: {order.shippingInfo?.name || 'Không xác định'}
                        </Text>
                        <Text style={styles.productBrand}>
                            Số điện thoại: {order.shippingInfo?.phone || 'Không xác định'}
                        </Text>
                        <Text style={styles.productBrand}>
                            Địa chỉ: {order.shippingInfo?.address || 'Không xác định'}
                        </Text>
                        <Text style={styles.productPrice}>
                            Tổng tiền: {order.totalAmount.toLocaleString()} VND
                        </Text>
                        <Text style={styles.orderStatus}>Trạng thái: {order.status}</Text>
                        <View style={styles.productActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.actionButtonText}>Mua lại</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.reviewButton}>
                                <Text style={styles.reviewButtonText}>Viết đánh giá</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))
    ) : (
        <Text style={styles.noOrdersText}>Không có đơn hàng nào.</Text>
    )}
</ScrollView>


            <View style={styles.bottomNavigation}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Image source={require('../acssets/home.png')} style={styles.bottomIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
                    <Image source={require('../acssets/BasketIcon.png')} style={styles.bottomIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
                    <Image source={require('../acssets/Vector.png')} style={styles.bottomIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image source={require('../acssets/profile.png')} style={styles.bottomIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#f8f8f8',
    },
    icon: { width: 24, height: 24 },
    headerText: { fontSize: 18, fontWeight: 'bold' },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabItem: {
        fontSize: 14,
        color: '#999',
    },
    activeTab: {
        color: '#6C63FF',
        borderBottomWidth: 2,
        borderBottomColor: '#6C63FF',
        paddingBottom: 5,
    },
    ordersList: {
        padding: 16,
    },
    orderItem: {
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 20,
        padding: 16,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productBrand: {
        fontSize: 14,
        color: '#888',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    orderStatus: {
        fontSize: 12,
        color: '#aaa',
    },
    productActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 5,
    },
    actionButtonText: {
        fontSize: 14,
        color: '#333',
    },
    reviewButton: {
        backgroundColor: '#6C63FF',
        padding: 8,
        borderRadius: 5,
    },
    reviewButtonText: {
        fontSize: 14,
        color: '#fff',
    },
    noOrdersText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    bottomIcon: { width: 24, height: 24 },
});

export default OrderScreen;
