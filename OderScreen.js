import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const OrderScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  // Dữ liệu mẫu cho các đơn hàng
  const orders = [
    {
      _id: '1',
      shippingInfo: {
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Đường ABC, TP.HCM',
      },
      totalAmount: 2000000,
      status: 'Đang vận chuyển',
      cartItems: [
        {
          _id: '1',
          productId: { hinhAnh: 'https://via.placeholder.com/60', ten: 'Laptop Dell', gia: 1500000 },
          quantity: 1,
        },
        {
          _id: '2',
          productId: { hinhAnh: 'https://via.placeholder.com/60', ten: 'Chuột Logitech', gia: 500000 },
          quantity: 1,
        },
      ],
    },
    {
      _id: '2',
      shippingInfo: {
        name: 'Trần Thị B',
        phone: '0908765432',
        address: '456 Đường XYZ, Hà Nội',
      },
      totalAmount: 1000000,
      status: 'Đang vận chuyển',
      cartItems: [
        {
          _id: '1',
          productId: { hinhAnh: 'https://via.placeholder.com/60', ten: 'Bàn phím Corsair', gia: 1000000 },
          quantity: 1,
        },
      ],
    },
    {
      _id: '3',
      shippingInfo: {
        name: 'Lê Văn C',
        phone: '0987654321',
        address: '789 Đường DEF, Đà Nẵng',
      },
      totalAmount: 1500000,
      status: 'Đã hủy',
      cartItems: [
        {
          _id: '1',
          productId: { hinhAnh: 'https://via.placeholder.com/60', ten: 'Tai nghe Sony', gia: 1500000 },
          quantity: 1,
        },
      ],
    },
  ];

  // Lọc đơn hàng dựa trên tab được chọn
  const filteredOrders = selectedTab === 'Tất cả'
    ? orders
    : orders.filter(order => order.status === selectedTab);

  const renderOrderItem = ({ item: order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.productName}>{`Tên người nhận: ${order.shippingInfo?.name}`}</Text>
      <Text style={styles.productBrand}>{`Số điện thoại: ${order.shippingInfo?.phone}`}</Text>
      <Text style={styles.productBrand}>{`Địa chỉ: ${order.shippingInfo?.address}`}</Text>
      <Text style={styles.productPrice}>Tổng tiền: {order.totalAmount.toLocaleString()} VND</Text>
      <Text style={styles.orderStatus}>Trạng thái: {order.status}</Text>
      <Text style={styles.productsTitle}>Sản phẩm trong đơn hàng:</Text>
      {order.cartItems.map((item) => (
        <View key={item._id} style={styles.cartItem}>
          <Image
            source={{ uri: item.productId.hinhAnh }}
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.productId.ten}</Text>
            <Text style={styles.itemPrice}>
              {item.productId.gia.toLocaleString()} VND
            </Text>
            <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
          </View>
        </View>
      ))}
      {order.status === 'Đang vận chuyển' && (
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Đã nhận hàng</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đơn Hàng</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
          {['Tất cả', 'Chờ xác nhận', 'Chờ vận chuyển', 'Đang vận chuyển', 'Đã hủy'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tabItem, selectedTab === tab && styles.activeTab]}
            >
              <Text style={selectedTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Danh sách đơn hàng */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrderItem}
        ListEmptyComponent={
          <Text style={styles.noOrdersText}>Không có đơn hàng nào.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  icon: { width: 24, height: 24 },
  headerText: { fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  tabsContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  tabsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#6C63FF',
  },
  tabText: { fontSize: 14, color: '#888' },
  activeTabText: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
  orderItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  productName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  productBrand: { fontSize: 14, color: '#888', marginBottom: 5 },
  productPrice: { fontSize: 16, color: '#333', fontWeight: 'bold', marginVertical: 5 },
  orderStatus: { fontSize: 14, color: '#007BFF', marginBottom: 10 },
  productsTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  itemDetails: { flex: 1, justifyContent: 'center' },
  itemName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  itemPrice: { fontSize: 12, color: '#666' },
  itemQuantity: { fontSize: 12, color: '#888' },
  confirmButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noOrdersText: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: 20 },
});

export default OrderScreen;
