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
  const [selectedTab, setSelectedTab] = useState('Tất cả');
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const statusMap = {
    'Tất cả': (id) => `http://localhost:3000/donhang/user/${id}`,
    'Chờ xác nhận': (id) =>
      `http://localhost:3000/donhang/user/${id}/status?status=${encodeURIComponent('Chờ xác nhận')}`,
    'Chờ vận chuyển': (id) =>
      `http://localhost:3000/donhang/user/${id}/status?status=${encodeURIComponent('Chờ vận chuyển')}`,
    'Đang vận chuyển': (id) =>
      `http://localhost:3000/donhang/user/${id}/status?status=${encodeURIComponent('Đang vận chuyển')}`,
    'Đã hủy': (id) =>
      `http://localhost:3000/donhang/user/${id}/status?status=${encodeURIComponent('Đã hủy')}`,
  };

  // Lấy userId từ AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy User ID. Vui lòng đăng nhập lại.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy User ID:', error);
        Alert.alert('Lỗi', 'Không thể truy xuất User ID.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  // Gọi API lấy danh sách đơn hàng
  const fetchOrders = async () => {
    if (!userId) return;

    const url = statusMap[selectedTab](userId);
    console.log(`Fetching orders from: ${url}`);

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi tải đơn hàng: ${errorText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        throw new Error('Dữ liệu trả về từ API không hợp lệ.');
      }
    } catch (error) {
      console.error('Lỗi khi tải đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Theo dõi thay đổi tab hoặc refresh
  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId, selectedTab, refreshTrigger]);

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/donhang/${orderId}`, {
        method: 'PUT',
headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Đã hủy' }),
      });

      if (!response.ok) {
        throw new Error('Không thể hủy đơn hàng. Vui lòng thử lại.');
      }

      const data = await response.json();
      Alert.alert('Hoàn Thành', data.message);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    }
  };

  const confirmReceived = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/donhang/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Hoàn Thành' }),
      });

      if (!response.ok) {
        throw new Error('Không thể xác nhận đơn hàng. Vui lòng thử lại.');
      }

      const data = await response.json();
      Alert.alert('Hoàn Thành', data.message);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error('Lỗi khi xác nhận đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    }
  };

  const renderOrderItem = ({ item: order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.productName}>{`Tên người nhận: ${order.shippingInfo?.name || ''}`}</Text>
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
      {order.status === 'Chờ xác nhận' && (
        <TouchableOpacity style={styles.cancelButton} onPress={() => cancelOrder(order._id)}>
          <Text style={styles.buttonText}>Hủy đơn</Text>
        </TouchableOpacity>
      )}
      {order.status === 'Đang vận chuyển' && (
        <TouchableOpacity style={styles.confirmButton} onPress={() => confirmReceived(order._id)}>
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
          ListFooterComponent={<View style={{ height: 80 }} />} // Thêm khoảng trống 80px
        />
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Căn giữa nội dung văn bản
    flex: 1, // Đảm bảo chiếm không gian giữa
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
    backgroundColor: '#f0f0f0',
    color: '#888',
    textAlign: 'center',
    marginRight: 10,
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
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FF4C4C',
    alignItems: 'center',
  },
  confirmButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default OrderScreen;