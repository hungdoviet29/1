import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({navigation, route}) => {
  const {selectedItems, totalAmount, voucher} = route.params;
  const [cartItems, setCartItems] = useState(selectedItems || []);
  const [total, setTotal] = useState(totalAmount || 0);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isPaymentDropdownVisible, setPaymentDropdownVisible] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [selectedVoucher, setSelectedVoucher] = useState(voucher);
  const [vouchers, setVouchers] = useState([]);
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        setUserId(id);
        fetchCartItems(id);
      } else {
        Alert.alert('Lỗi', 'Không tìm thấy User ID. Vui lòng đăng nhập lại.');
      }
    };
    // In ra để kiểm tra thông tin truyền vào
    console.log('Selected Items:', selectedItems);
    console.log('Total Amount:', totalAmount);
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const url = `http://192.168.3.106:3000/vouchers?userId=${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setVouchers(data); // Set the vouchers from the API response
        } else {
          Alert.alert('Lỗi', 'Không thể tải voucher.');
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
      }
    };
    if (userId) fetchVouchers();
  }, [userId]);

  const fetchCartItems = async id => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.3.106:3000/cart/${id}`);
      const data = await response.json();
      if (response.ok) {
        // Filter out items with invalid productId
        const validItems = data.items.filter(item => item.productId !== null);
        setCartItems(validItems);
        calculateTotal(validItems); // Recalculate total with valid items
      } else {
        Alert.alert('Lỗi', data.message || 'Không thể tải giỏ hàng.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  };


  const calculateTotal = (items, voucher = selectedVoucher) => {
    let newTotal = items.reduce((sum, item) => {
      if (item.productId?.gia && item.quantity) {
        return sum + item.productId.gia * item.quantity;
      }
      return sum;
    }, 0);

    if (voucher && voucher.title) {
      const discountPercentage = parseFloat(voucher.title.trim());
      if (!isNaN(discountPercentage) && discountPercentage > 0) {
        const discountAmount = (newTotal * discountPercentage) / 100;
        newTotal -= discountAmount;
      }
    }

    setTotal(newTotal);
  };

  const handleCheckout = async () => {
    if (!shippingInfo.name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên người nhận.');
      return;
    }
    if (!shippingInfo.phone.trim() || !/^\d+$/.test(shippingInfo.phone)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ.');
      return;
    }
    if (!shippingInfo.address.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ giao hàng.');
      return;
    }

    const validCartItems = cartItems.filter(item => item.productId !== null);
    if (!validCartItems.length) {
      Alert.alert('Lỗi', 'Giỏ hàng của bạn có sản phẩm không hợp lệ.');
      return;
    }

    Alert.alert(
      'Xác nhận thanh toán',
      'Bạn có chắc chắn muốn thanh toán với số tiền này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Tiến hành',
          onPress: async () => {
            const orderData = {
              userId,
              cartItems: validCartItems,
              totalAmount: total,
              paymentMethod: selectedPaymentMethod,
              shippingInfo,
              voucher: selectedVoucher ? selectedVoucher._id : null,
            };

            try {
              const response = await fetch(
                'http://192.168.3.106:3000/donhang',
                {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(orderData),
                },
              );
              const responseBody = await response.json();
              if (response.ok && responseBody.success) {
                Alert.alert('Thành công', 'Đơn hàng đã được tạo.');

                // Reduce voucher quantity after successful order
                if (selectedVoucher) {
                  await updateVoucherQuantity(selectedVoucher._id);
                }

                await resetCart();
                navigation.navigate('NotificationScreen', {
                  message: 'Đơn hàng của bạn đã được tạo thành công!',
                });
              } else {
                Alert.alert(
                  'Lỗi',
                  responseBody.message || 'Không thể tạo đơn hàng.',
                );
              }
            } catch (error) {
              Alert.alert('Lỗi', 'Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const updateVoucherQuantity = async voucherId => {
    try {
      const updatedVoucher = {
        ...selectedVoucher,
        quantity: selectedVoucher.quantity - 1,
      };
      const response = await fetch(
        `http://192.168.3.106:3000/vouchers/${voucherId}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(updatedVoucher),
        },
      );
      if (!response.ok) {
        throw new Error('Không thể cập nhật voucher.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể giảm số lượng voucher.');
    }
  };

  const resetCart = async () => {
    try {
      const response = await fetch(`http://192.168.3.106:3000/cart/${userId}`);
      const data = await response.json();
      if (data && data.items && data.items.length > 0) {
        const deleteResponse = await fetch(
          `http://192.168.3.106:3000/cart/${userId}`,
          {
            method: 'DELETE',
          },
        );
        if (deleteResponse.ok) {
          setCartItems([]);
          setTotal(0);
        }
      }
    } catch (error) {
      console.error('Failed to reset cart:', error);
    }
  };

  const handleSelectPaymentMethod = method => {
    setSelectedPaymentMethod(method);
    setPaymentDropdownVisible(false); // Close the dropdown after selection
  };

  const handleVoucherSelect = voucher => {
    const currentDate = new Date();
    const expirationDate = new Date(voucher.expirationDate);

    // Kiểm tra số lượng voucher
    if (voucher.quantity <= 0) {
      Alert.alert(
        'Voucher hết lượt sử dụng',
        'Voucher này không còn lượt sử dụng.',
      );
      return;
    }

    // Kiểm tra ngày hết hạn
    if (expirationDate < currentDate) {
      Alert.alert('Voucher đã hết hạn', 'Voucher này đã hết hạn sử dụng.');
      return;
    }

    // Voucher hợp lệ
    const updatedVoucher = {...voucher, quantity: voucher.quantity};
    setSelectedVoucher(updatedVoucher); // Cập nhật voucher đã chọn

    // Cập nhật lại số lượng trong danh sách vouchers
    const updatedVouchers = vouchers.map(v =>
      v._id === updatedVoucher._id ? updatedVoucher : v,
    );
    setVouchers(updatedVouchers);

    setVoucherModalVisible(false); // Đóng modal

    // Tính lại tổng số tiền với voucher đã chọn
    calculateTotal(cartItems, updatedVoucher);
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F8B400" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thanh toán</Text>
      </View>

      <ScrollView style={{maxHeight: 200}}>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image
              source={{uri: item.productId?.hinhAnh}}
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
      </ScrollView>

      <View style={styles.shippingContainer}>
        <Text style={styles.shippingTitle}>Thông tin vận chuyển</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên người nhận"
          value={shippingInfo.name}
          onChangeText={text => setShippingInfo({...shippingInfo, name: text})}
        />
        {!shippingInfo.name.trim() && (
          <Text style={styles.errorText}>Vui lòng nhập tên người nhận.</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="numeric"
          value={shippingInfo.phone}
          onChangeText={text => setShippingInfo({...shippingInfo, phone: text})}
        />
        {!shippingInfo.phone.trim() && (
          <Text style={styles.errorText}>Vui lòng nhập số điện thoại.</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Địa chỉ giao hàng"
          value={shippingInfo.address}
          onChangeText={text =>
            setShippingInfo({...shippingInfo, address: text})
          }
        />
        {!shippingInfo.address.trim() && (
          <Text style={styles.errorText}>Vui lòng nhập địa chỉ giao hàng.</Text>
        )}
      </View>

      {/* Payment and Voucher */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Chọn phương thức thanh toán</Text>
        <TouchableOpacity
          onPress={() => setPaymentDropdownVisible(!isPaymentDropdownVisible)}>
          <Text style={styles.paymentMethod}>
            {selectedPaymentMethod || 'Chọn phương thức thanh toán'}
          </Text>
        </TouchableOpacity>
        {isPaymentDropdownVisible && (
          <View style={styles.paymentDropdown}>
            <TouchableOpacity
              onPress={() =>
                handleSelectPaymentMethod('Thanh toán khi nhận hàng')
              }>
              <Text style={styles.dropdownItem}>Thanh toán khi nhận hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleSelectPaymentMethod('Thanh toán qua ngân hàng')
              }>
              <Text style={styles.dropdownItem}>Thanh toán qua ngân hàng</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.voucherContainer}>
        <Text style={styles.voucherTitle}>Chọn Voucher (Giảm giá)</Text>
        <TouchableOpacity
          onPress={() => setVoucherModalVisible(true)}
          style={styles.voucherButton}>
          <Text style={styles.voucherText}>
            {selectedVoucher
              ? `Voucher: ${selectedVoucher.title}`
              : 'Chọn Voucher'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>Tổng: {totalAmount.toLocaleString()} VND</Text>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>

      {/* Voucher Modal */}
      <Modal
        visible={isVoucherModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVoucherModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Lọc danh sách voucher có số lượng > 0 */}
            {vouchers.filter(v => v.quantity > 0).length === 0 ? (
              // Nếu không có voucher khả dụng
              <Text style={styles.noVoucherText}>Không có voucher nào</Text>
            ) : (
              // Hiển thị danh sách voucher có số lượng > 0
              <FlatList
                data={vouchers.filter(v => v.quantity > 0)}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleVoucherSelect(item)}
                    style={styles.modalItem}>
                    <Text style={styles.modalItemText}>
                      {item.title} - Số lượng còn: {item.quantity}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
              />
            )}
            <TouchableOpacity
              onPress={() => setVoucherModalVisible(false)}
              style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const colors = {
  primary: '#F8B400',
  textPrimary: '#000',
  textSecondary: '#555',
  border: '#ccc',
  error: 'red',
  background: '#fff',
};

const sizes = {
  padding: 15,
  margin: 10,
  borderRadius: 5,
  inputHeight: 50,
  fontSize: 16,
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.margin,
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: sizes.margin * 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: sizes.margin,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: sizes.margin,
  },
  itemDetails: {
    justifyContent: 'center',
  },
  itemName: {
    fontSize: sizes.fontSize,
    color: colors.textPrimary,
  },
  itemPrice: {
    fontSize: sizes.fontSize - 2,
    color: colors.textSecondary,
  },
  itemQuantity: {
    fontSize: sizes.fontSize - 2,
    color: colors.textSecondary,
  },
  shippingContainer: {
    marginBottom: sizes.margin * 2,
  },
  shippingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: sizes.margin,
    color: colors.textPrimary,
  },
  input: {
    height: sizes.inputHeight,
    borderWidth: 1,
    borderColor: colors.border,
    padding: sizes.padding,
    marginBottom: sizes.margin,
    borderRadius: sizes.borderRadius,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: sizes.margin,
  },
  paymentContainer: {
    marginBottom: sizes.margin * 2,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: sizes.margin,
    color: colors.textPrimary,
  },
  paymentMethod: {
    fontSize: sizes.fontSize,
    padding: sizes.padding,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizes.borderRadius,
    color: colors.textPrimary,
  },
  paymentDropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: sizes.margin,
    padding: sizes.padding,
    borderRadius: sizes.borderRadius,
  },
  dropdownItem: {
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    color: colors.textPrimary,
  },
  voucherContainer: {
    marginBottom: sizes.margin * 2,
  },
  voucherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: sizes.margin,
    color: colors.textPrimary,
  },
  voucherButton: {
    padding: sizes.padding,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizes.borderRadius,
  },
  voucherText: {
    fontSize: sizes.fontSize,
    color: colors.textPrimary,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: sizes.margin * 2,
    color: colors.textPrimary,
  },
  checkoutButton: {
    backgroundColor: '#F8B400',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, // Add this property to push the button higher
    marginBottom: 80, // Optional, adjust for spacing
},

  checkoutButtonText: {
    fontSize: 18,
    color: colors.background,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: sizes.padding * 2,
    borderRadius: sizes.borderRadius,
    width: '80%',
  },
  modalItem: {
    padding: sizes.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalItemText: {
    fontSize: sizes.fontSize,
    color: colors.textPrimary,
  },
  modalCloseButton: {
    padding: sizes.padding,
    backgroundColor: colors.primary,
    borderRadius: sizes.borderRadius,
    marginTop: sizes.margin,
    alignItems: 'center',
  },
  modalCloseText: {
    color: colors.background,
  },
});

export default CheckoutScreen;
