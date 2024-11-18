import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Tất cả'); // Tab mặc định

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
          fetchOrders(id);
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

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://192.168.3.106:3000/donhang/user/${userId}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi tải đơn hàng: ${errorText}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Lỗi khi tải đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterOrdersByTab = (order) => {
    if (order.status && order.shippingInfo && order.totalAmount) {
      if (selectedTab === 'Tất cả') return order.userId === userId;
      return order.status === selectedTab && order.userId === userId;
    }
    return false;
  };

  const renderOrderItem = ({ item: order }) => (
    <View style={styles.orderItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>
          {`Tên người nhận: ${order.shippingInfo?.name || ''}`}
        </Text>
        <Text style={styles.productBrand}>
          {`Số điện thoại: ${order.shippingInfo?.phone || ''}`}
        </Text>
        <Text style={styles.productBrand}>
          {`Địa chỉ: ${order.shippingInfo?.address || ''}`}
        </Text>
        <Text style={styles.productPrice}>
          Tổng tiền: {order.totalAmount.toLocaleString()} VND
        </Text>
        <Text style={styles.orderStatus}>
          Trạng thái: {order.status}
        </Text>
        <Text style={styles.productsTitle}>
          Sản phẩm trong đơn hàng:
        </Text>
        {order.cartItems.map((item) => (
          <View key={item._id} style={styles.cartItem}>
            <Image
              source={{ uri: item.productId.hinhAnh }}
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
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

  const filteredOrders = orders.filter(filterOrdersByTab);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../acssets/BackButton.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đơn Hàng</Text>
        <TouchableOpacity>
          <Image source={require('../acssets/Menu2.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['Tất cả', 'Chờ xác nhận', 'Chờ vận chuyển', 'Đã vận chuyển', 'Đã hủy'].map((tab) => (
          <Text
            key={tab}
            style={[styles.tabItem, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            {tab}
          </Text>
        ))}
      </View>

      {/* Danh sách đơn hàng */}
      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          keyExtractor={(order) => order._id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.ordersList}
        />
      ) : (
        <Text style={styles.noOrdersText}>Không có đơn hàng nào.</Text>
      )}
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
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  tabItem: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    color: '#888',
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: '#6C63FF',
    color: '#fff',
    fontWeight: 'bold',
  },
  ordersList: { padding: 16 },
  orderItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
  },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold' },
  productBrand: { fontSize: 14, color: '#888' },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#333', marginVertical: 5 },
  orderStatus: { fontSize: 12, color: '#aaa' },
  productsTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  cartItem: { flexDirection: 'row', marginBottom: 16, padding: 12, backgroundColor: '#fff' },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  itemDetails: { justifyContent: 'center', flex: 1 },
  itemName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  itemPrice: { fontSize: 12, color: '#666' },
  itemQuantity: { fontSize: 12, color: '#888' },
  noOrdersText: { textAlign: 'center', fontSize: 16, color: '#999' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OrderScreen;
