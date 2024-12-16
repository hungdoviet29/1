import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

const OrderScreen = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Tất cả');
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const statusMap = {
    'Tất cả': id => `http://172.20.10.6:3000/donhang/user/${id}`,
    'Chờ xác nhận': id =>
      `http://172.20.10.6:3000/donhang/user/${id}/status?status=${encodeURIComponent(
        'chờ xác nhận',
      )}`,
    'Chờ vận chuyển': id =>
      `http://172.20.10.6:3000/donhang/user/${id}/status?status=${encodeURIComponent(
        'chờ vận chuyển',
      )}`,
    'Đang vận chuyển': id =>
      `http://172.20.10.6:3000/donhang/user/${id}/status?status=${encodeURIComponent(
        'đang vận chuyển',
      )}`,
    'Đã được hủy': id =>
      `http://172.20.10.6:3000/donhang/user/${id}/status?status=${encodeURIComponent(
        'đã được hủy',
      )}`,
  };

  // Trạng thái Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  const cancelOrder = async orderId => {
    try {
      const response = await fetch(
        `http://172.20.10.6:3000/donhang/${orderId}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({status: 'Đã được hủy'}),
        },
      );

      if (!response.ok) {
        throw new Error('Không thể hủy đơn hàng. Vui lòng thử lại.');
      }

      const data = await response.json();
      Alert.alert('thành công', data.message);
      setRefreshTrigger(prev => !prev);
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    }
  };

  const confirmReceived = async orderId => {
    try {
      const response = await fetch(
        `http://172.20.10.6:3000/donhang/${orderId}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({status: 'thành công'}),
        },
      );

      if (!response.ok) {
        throw new Error('Không thể xác nhận đơn hàng. Vui lòng thử lại.');
      }

      const data = await response.json();
      Alert.alert('thành công', data.message);
      setRefreshTrigger(prev => !prev);
    } catch (error) {
      console.error('Lỗi khi xác nhận đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    }
  };
  // Hàm mở Modal
  const handleOrderPress = order => {
    setSelectedOrder(order); // Lưu chi tiết đơn hàng
    setModalVisible(true); // Hiển thị Modal
  };

  // Hàm đóng Modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const renderOrderItem = ({item: order}) => {
    // Tính tổng số sản phẩm trong đơn hàng
    const totalQuantity =
      order.cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    // Lấy sản phẩm đầu tiên
    const firstItem = order.cartItems?.[0];

    return (
      <View style={styles.orderItem}>
        <Text
          style={styles.productsTitle}
          onPress={() => handleOrderPress(order)}>
          Sản phẩm trong đơn hàng:
        </Text>

        {firstItem ? (
          <View style={styles.cartItem}>
            <Image
              source={{
                uri: firstItem.productId?.hinhAnh || 'placeholder_image_url',
              }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>
                {firstItem.productId?.ten || 'Sản phẩm không rõ'}
              </Text>
              <Text style={styles.itemPrice}>
                {firstItem.productId?.gia
                  ? `${firstItem.productId.gia.toLocaleString()} VND`
                  : 'Chưa có giá'}
              </Text>
              <Text style={styles.itemQuantity}>
                Số lượng: {firstItem.quantity}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noProductsText}>Không có sản phẩm nào.</Text>
        )}

        <Text style={styles.totalProductsText}>
          Tổng số sản phẩm: {totalQuantity}
        </Text>

        <View style={styles.extraSpace} />
        <View style={styles.totalContainer}>
          <View style={styles.totalTextContainer}>
            <Text style={[styles.productPrice, styles.alignRight]}>
              Tổng cộng: {order.totalAmount?.toLocaleString()} VND
            </Text>
            <Text style={[styles.orderStatus, styles.alignRight]}>
              Trạng thái: {order.status}
            </Text>
          </View>
        </View>

        {/* Phần nút bấm cho trạng thái đơn hàng */}
        {order.status === 'chờ xác nhận' && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => cancelOrder(order._id)}>
            <Text style={styles.buttonText}>Hủy đơn</Text>
          </TouchableOpacity>
        )}
        {order.status === 'đang vận chuyển' && (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => confirmReceived(order._id)}>
            <Text style={styles.buttonText}>Đã nhận hàng</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

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
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}>
          {Object.keys(statusMap).map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tabItem, selectedTab === tab && styles.activeTab]}>
              <Text
                style={
                  selectedTab === tab ? styles.activeTabText : styles.tabText
                }>
                {tab}
              </Text>
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
          keyExtractor={item => item._id}
          renderItem={renderOrderItem}
          ListFooterComponent={<View style={{height: 80}} />} // Thêm khoảng trống 80px
        />
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContent} // Đảm bảo phần này
              showsVerticalScrollIndicator={false}>
              {selectedOrder && (
                <>
                  <Text style={styles.modalTitle}>Chi tiết đơn hàng</Text>
                  <Text style={styles.modalText}>{`Tên người nhận: ${
                    selectedOrder.shippingInfo?.name || ''
                  }`}</Text>
                  <Text style={styles.modalText}>{`Số điện thoại: ${
                    selectedOrder.shippingInfo?.phone || ''
                  }`}</Text>
                  <Text style={styles.modalText}>{`Địa chỉ: ${
                    selectedOrder.shippingInfo?.address || ''
                  }`}</Text>
                  <Text
                    style={
                      styles.modalText
                    }>{`Tổng tiền: ${selectedOrder.totalAmount?.toLocaleString()} VND`}</Text>
                  <Text
                    style={
                      styles.modalText
                    }>{`Trạng thái: ${selectedOrder.status}`}</Text>
                  <Text style={styles.modalSubtitle}>
                    Sản phẩm trong đơn hàng:
                  </Text>
                  {selectedOrder.cartItems?.map(item => (
                    <View key={item._id} style={styles.cartItem}>
                      <Image
                        source={{
                          uri:
                            item.productId?.hinhAnh || 'placeholder_image_url',
                        }}
                        style={styles.itemImage}
                      />
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>
                          {item.productId?.ten || 'Sản phẩm không xác định'}
                        </Text>
                        <Text style={styles.itemPrice}>
                          {item.productId?.gia
                            ? `${item.productId.gia.toLocaleString()} VND`
                            : 'Chưa có giá'}
                        </Text>
                        <Text style={styles.itemQuantity}>
                          {`Số lượng: ${item.quantity}`}
                        </Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
              <Button title="Đóng" onPress={closeModal} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#f8f8f8',
  },
  icon: {width: 24, height: 24},
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
  ordersList: {padding: 16},
  orderItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
  },
  productInfo: {flex: 1},
  productName: {fontSize: 16, fontWeight: 'bold'},

  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  productsTitle: {fontSize: 14, fontWeight: 'bold', marginTop: 10},
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
  },

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

  icon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#333',
  },
  orderItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 12,
    padding: 16,
    paddingBottom: 24, // Add space at the bottom
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  alignRight: {
    textAlign: 'right',
    flex: 1,
  },
  totalContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end', // Align items at the bottom
    paddingHorizontal: 5, // Add slight padding
  },
  totalTextContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  cartItem: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  extraSpace: {
    height: 16, // Adjust space height
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  productBrand: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
});

export default OrderScreen;
