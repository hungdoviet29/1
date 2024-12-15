import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

const OrderHistoryScreen = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Trạng thái Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
        } else {
          Alert.alert(
            'Lỗi',
            'Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.',
          );
        }
      } catch (error) {
        console.error('Lỗi khi lấy ID người dùng:', error);
        Alert.alert('Lỗi', 'Không thể lấy ID người dùng.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  // Fetch orders from API
  const fetchOrders = async () => {
    if (!userId) return;

    const url = `http://10.24.25.170:3000/donhang/user/${userId}`;
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
        throw new Error('Dữ liệu phản hồi không hợp lệ từ API.');
      }
    } catch (error) {
      console.error('Lỗi khi tải đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

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
        <Text style={styles.headerText}>Lịch sử đơn hàng</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>Không có đơn hàng nào.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          renderItem={renderOrderItem}
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
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  productPrice: {
    fontSize: 14, // Decrease font size
    fontWeight: 'bold',
    color: '#007BFF',
    marginVertical: 5,
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

export default OrderHistoryScreen;
