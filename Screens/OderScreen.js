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
  const [selectedTab, setSelectedTab] = useState('Tất cả'); // Tab mặc định
  const [refreshTrigger, setRefreshTrigger] = useState(false); // Trigger để theo dõi thay đổi

  // Hàm ánh xạ trạng thái với URL
  const statusMap = {
      'Tất cả': `http://172.20.10.6:3000/donhang/user/${userId}`,
      'Chờ xác nhận': `http://172.20.10.6:3000/donhang/user/${userId}/status?status=${encodeURIComponent('Chờ xác nhận')}`,
      'Chờ vận chuyển': `http://172.20.10.6:3000/donhang/user/${userId}/status?status=${encodeURIComponent('Chờ vận chuyển')}`,
      'Đang vận chuyển': `http://172.20.10.6:3000/donhang/user/${userId}/status?status=${encodeURIComponent('Đang vận chuyển')}`,
      'Đã hủy': `http://172.20.10.6:3000/donhang/user/${userId}/status?status=${encodeURIComponent('Đã hủy')}`,
  };

  // Lấy userId từ AsyncStorage
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

  // Gọi API lấy danh sách đơn hàng theo userId và trạng thái
  const fetchOrders = async () => {
    if (!userId) {
      console.error('UserId chưa được khởi tạo.');
      return;
    }
  
    const url = statusMap[selectedTab];
    console.log(`Fetching data for tab "${selectedTab}" from: ${url}`);
  
    try {
      setOrders([]); // Reset dữ liệu trước khi tải mới
      const response = await fetch(url);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi tải đơn hàng: ${errorText}`);
      }
  
      const data = await response.json();
      console.log(`Dữ liệu trả về cho tab "${selectedTab}":`, data);
  
      if (Array.isArray(data)) {
        setOrders(data); // Cập nhật dữ liệu khi API trả về danh sách hợp lệ
      } else {
        throw new Error('Dữ liệu trả về từ API không hợp lệ.');
      }
    } catch (error) {
      // console.error('Lỗi khi tải đơn hàng:', error.message);
      // Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  };
  
  // Theo dõi sự thay đổi của tab hoặc refreshTrigger
  useEffect(() => {
    if (userId) {
      setLoading(true); // Hiển thị trạng thái tải
      fetchOrders(); // Gọi API lấy dữ liệu
    }
  }, [selectedTab, refreshTrigger]);
  
  // Hàm xử lý hủy đơn
  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://172.20.10.6:3000/donhang/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Đã hủy' }),
      });

      if (!response.ok) {
        throw new Error('Không thể hủy đơn hàng. Vui lòng thử lại.');
      }

      const data = await response.json();
      Alert.alert('Thành công', data.message);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    }
  };

  // Hàm xử lý đã nhận hàng
  const confirmReceived = async (orderId) => {
    try {
      const response = await fetch(`http://172.20.10.6:3000/donhang/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Thành Công' }),
      });

      if (!response.ok) {
        throw new Error('Không thể xác nhận đơn hàng. Vui lòng thử lại.');
      }

      const data = await response.json();
      Alert.alert('Thành công', data.message);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error('Lỗi khi xác nhận đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    }
  };

  // Hiển thị từng đơn hàng
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
                {item.productId?.gia
                  ? `${item.productId.gia.toLocaleString()} VND`
                  : 'Không có giá'}
              </Text>
              <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
            </View>
          </View>
        ))}
        {order.status === 'Chờ xác nhận' && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => cancelOrder(order._id)}
          >
            <Text style={styles.buttonText}>Hủy đơn</Text>
          </TouchableOpacity>
        )}
        {order.status === 'Đang vận chuyển' && (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => confirmReceived(order._id)}
          >
            <Text style={styles.buttonText}>Đã nhận hàng</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // Hiển thị danh sách hoặc thông báo
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text>Đang tải...</Text>
        </View>
      );
    }

    if (orders.length === 0) {
      return (
        <Text style={styles.noOrdersText}>
          Không có đơn hàng nào {selectedTab !== 'Tất cả' && `trong trạng thái "${selectedTab}"`}.
        </Text>
      );
    }

    return (
      <FlatList
        data={orders}
        keyExtractor={(order) => order._id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.ordersList}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {['Tất cả', 'Chờ xác nhận', 'Chờ vận chuyển', 'Đang vận chuyển', 'Đã hủy'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                setSelectedTab(tab);
                setLoading(true);
              }}
            >
              <Text style={[styles.tabItem, selectedTab === tab && styles.activeTab]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nội dung */}
      {renderContent()}
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
