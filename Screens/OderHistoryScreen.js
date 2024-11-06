import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const OrderHistoryScreen = () => {
    // Dữ liệu mẫu cho đơn hàng
    const orders = [
        [
            { id: 1, name: 'Printed Shirt', price: 858.00, image: require('../acssets/Asus1.png') },
            { id: 2, name: 'Printed Shirt', price: 858.00, image: require('../acssets/Asus1.png') },
            { id: 3, name: 'Printed Shirt', price: 858.00, image: require('../acssets/Asus1.png') },
        ],
        [
            { id: 1, name: 'Printed Shirt', price: 858.00, image: require('../acssets/Asus1.png') },
            { id: 2, name: 'Printed Shirt', price: 858.00, image: require('../acssets/Asus1.png') },
            { id: 3, name: 'Printed Shirt', price: 858.00, image: require('../acssets/Asus1.png') },
        ],
        // Thêm dữ liệu đơn hàng khác nếu cần
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { /* Logic quay lại */ }}>
                    <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Order History</Text>
            </View>

            {/* Danh sách đơn hàng */}
            <ScrollView contentContainerStyle={styles.orderContainer}>
                {orders.map((order, index) => (
                    <View key={index} style={styles.orderCard}>
                                                        <TouchableOpacity style={styles.deleteButton}>
                                    <Text style={styles.deleteText}>✕</Text>
                                </TouchableOpacity>
                        {order.map(product => (
                            <View key={product.id} style={styles.productRow}>
                                <Image source={product.image} style={styles.productImage} />
                                <View style={styles.productDetails}>
                                    <Text style={styles.productName}>{product.name}</Text>
                                    <Text style={styles.productPrice}>${product.price.toFixed(2)} USD</Text>
                                </View>

                            </View>
                        ))}
                    </View>
                ))}
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
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 12,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        color: '#4A3FBC',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
    },
    deleteButton: {
        padding: 4,
    },
    deleteText: {
        fontSize: 16,
        color: '#888',
    },
});

export default OrderHistoryScreen;
