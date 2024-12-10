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
import { ScrollView } from 'react-native-gesture-handler';

const OrderScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('All');
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const statusMap = {
    'Tất cả': (id) => `http://192.168.101.9:3000/donhang/user/${id}`,
    'Chờ xác nhận': (id) =>
      `http://192.168.101.9:3000/donhang/user/${id}/status?status=${encodeURIComponent('Chờ xác nhận')}`,
    'Chờ vận chuyển': (id) =>
      `http://192.168.101.9:3000/donhang/user/${id}/status?status=${encodeURIComponent('Chờ vận chuyển')}`,
    'Đang vận chuyển': (id) =>
      `http://192.168.101.9:3000/donhang/user/${id}/status?status=${encodeURIComponent('Đang vận chuyển')}`,
    'Đã hủy': (id) =>
      `http://192.168.101.9:3000/donhang/user/${id}/status?status=${encodeURIComponent('Đã hủy')}`,
  };


  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
        } else {
          Alert.alert('Error', 'User ID not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching User ID:', error);
        Alert.alert('Error', 'Unable to retrieve User ID.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  const fetchOrders = async () => {
    if (!userId) return;

    const url = statusMap[selectedTab](userId);
    console.log(`Fetching orders from: ${url}`);

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error loading orders: ${errorText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        throw new Error('Invalid data returned from API.');
      }
    } catch (error) {
      console.error('Error loading orders:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId, selectedTab, refreshTrigger]);

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://192.168.101.9:3000/donhang/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (!response.ok) {
        throw new Error('Unable to cancel order. Please try again.');
      }

      const data = await response.json();
      Alert.alert('Success', data.message);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error('Error cancelling order:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  const confirmReceived = async (orderId) => {
    try {
      const response = await fetch(`http://192.168.101.9:3000/donhang/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' }),
      });

      if (!response.ok) {
        throw new Error('Unable to confirm order. Please try again.');
      }

      const data = await response.json();
      Alert.alert('Success', data.message);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error('Error confirming order:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  const renderOrderItem = ({ item: order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.productName}>{`Người nhận: ${order.shippingInfo?.name || ''}`}</Text>
      <Text style={styles.productBrand}>{`Số điện thoại: ${order.shippingInfo?.phone || ''}`}</Text>
      <Text style={styles.productBrand}>{`Địa chỉ: ${order.shippingInfo?.address || ''}`}</Text>
      <Text style={styles.productPrice}>Tổng tiền: {order.totalAmount?.toLocaleString()} VND</Text>
      <Text style={styles.orderStatus}>Trạng thái: {order.status}</Text>
      <Text style={styles.productsTitle}>Sản phẩm trong đơn hàng:</Text>
      {order.cartItems?.map((item) => (
        <View key={item._id} style={styles.cartItem}>
          <Image
            source={{ uri: item.productId?.hinhAnh || 'placeholder_image_url' }}
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>
              {item.productId?.ten || 'Sản phẩm không xác định'}
            </Text>
            <Text style={styles.itemPrice}>
              {item.productId?.gia ? `${item.productId.gia.toLocaleString()} VND` : 'Không có giá'}
            </Text>
            <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
          </View>
        </View>
      ))}
      {order.status === 'Pending Confirmation' && (
        <TouchableOpacity style={styles.cancelButton} onPress={() => cancelOrder(order._id)}>
          <Text style={styles.buttonText}>Hủy đơn hàng</Text>
        </TouchableOpacity>
      )}
      {order.status === 'In Transit' && (
        <TouchableOpacity style={styles.confirmButton} onPress={() => confirmReceived(order._id)}>
          <Text style={styles.buttonText}>Xác nhận đã nhận</Text>
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
        <Text style={styles.headerText}>Quản lý đơn hàng</Text>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
          {Object.keys(statusMap).map((tab) => (
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text>Đang tải...</Text>
        </View>
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>Không có đơn hàng nào.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderItem}
          ListFooterComponent={<View style={{ height: 80 }} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Màu nền nhẹ nhàng hơn
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,

    elevation: 4, // Tạo hiệu ứng bóng
  },
  icon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', // Chữ trắng nổi bật trên nền tối
    flex: 1,
  },
  tabsContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  tabsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0', // Màu trung tính
    color: '#555',
    textAlign: 'center',
    marginRight: 10,
    elevation: 2, // Tạo cảm giác nổi
  },
  activeTab: {
    backgroundColor: '#6C63FF', // Màu nổi bật khi chọn tab
    color: '#fff',
    fontWeight: 'bold',
  },
  orderItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000', // Hiệu ứng đổ bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 14,
    color: '#000',
    marginVertical: 8,
  },
  orderStatus: {
    fontSize: 14,
    color: '#6C63FF', // Trạng thái nổi bật
    fontWeight: 'bold',
  },
  productsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#444',
  },
  cartItem: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#FF6347',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  confirmButton: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#32CD32',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});


export default OrderScreen;
