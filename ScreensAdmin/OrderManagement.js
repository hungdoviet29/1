import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ order }) => {
  return (
    <View style={styles.card}>
      {/* Store Logo and Name */}
      <View style={styles.logoContainer}>
        <Image source={require('../acssets/logoNoBG.png')} style={styles.logo} />
        <Text style={styles.storeName}>LAPSTORE</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderText}>Mã đơn hàng: {order.orderId}</Text>
        <Text style={styles.orderText}>Tên khách hàng: {order.customerName}</Text>
        <Text style={styles.orderText}>Ngày: {order.orderDate}</Text>

        {/* Product Table */}
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableHeader}>Sản phẩm</Text>
            <Text style={styles.tableHeader}>SL</Text>
            <Text style={styles.tableHeader}>Giá</Text>
            <Text style={styles.tableHeader}>Tổng tiền</Text>
          </View>
          {order.products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.name}</Text>
              <Text style={styles.tableCell}>{product.quantity}</Text>
              <Text style={styles.tableCell}>{product.price}</Text>
              <Text style={styles.tableCell}>{product.total}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.totalText}>TỔNG: {order.totalPrice}</Text>
        <Text style={styles.orderText}>Tình trạng: {order.paymentStatus}</Text>
        <Text style={styles.orderText}>Trạng thái: {order.orderStatus}</Text>
      </View>
    </View>
  );
};

const OrderManagement = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      storeName: 'LapStore',
      orderId: '28242845',
      customerName: 'Nguyễn Đức Trọng',
      orderDate: '14/11/2024',
      products: [
        { name: 'MacbookM2', quantity: 1, price: '20,000,000', total: '20,000,000' },
        { name: 'MSI gaming', quantity: 1, price: '20,000,000', total: '20,000,000' },
        { name: 'MSI gaming', quantity: 1, price: '20,000,000', total: '20,000,000' },
      ],
      totalPrice: '60,000,000',
      paymentStatus: 'Chưa thanh toán',
      orderStatus: 'Chờ xác nhận',
    },
    // Additional orders can be added here
  ];

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderId.includes(searchQuery)
  );

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/Back_Button.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={require('../acssets/Search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm "
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredOrders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#888',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  storeName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  orderInfo: {
    marginTop: 10,
    width: '100%',
  },
  orderText: {
    fontSize: 14,
    marginVertical: 2,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
});

export default OrderManagement;
