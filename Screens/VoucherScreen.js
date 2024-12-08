import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const VoucherScreen = ({navigation, route}) => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []); // Nhận giỏ hàng từ CheckoutScreen
  const [total, setTotal] = useState(route.params?.totalAmount || 0); // Nhận tổng tiền từ CheckoutScreen

  // Lấy danh sách vouchers từ API
  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://192.168.0.245:3000/vouchers');
        const data = await response.json();
        setVouchers(data);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải dữ liệu voucher.');
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  // Hàm xác nhận voucher đã chọn và điều hướng sang CheckoutScreen
  const handleConfirm = () => {
    if (selectedVoucher) {
      const voucherDetails = vouchers.find(
        voucher => voucher._id === selectedVoucher,
      );
      if (voucherDetails) {
        // Truyền dữ liệu voucher sang CheckoutScreen
        navigation.navigate('Checkout', {
          selectedItems: cartItems,
          totalAmount: total,
          voucher: voucherDetails, // Truyền voucher sang CheckoutScreen
        });
      } else {
        Alert.alert('Lỗi', 'Voucher không hợp lệ.');
      }
    } else {
      Alert.alert('Thông báo', 'Vui lòng chọn một voucher.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn Lapstore Voucher</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f68b1e" />
          <Text>Đang tải...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {vouchers.map(voucher => (
            <TouchableOpacity
              key={voucher._id}
              style={[
                styles.voucherItem,
                selectedVoucher === voucher._id && styles.selectedVoucher,
              ]}
              onPress={() => setSelectedVoucher(voucher._id)}>
              <View style={styles.voucherContent}>
                <Text style={styles.voucherTitle}>{voucher.title}</Text>
                <Text style={styles.voucherDescription}>
                  {voucher.description}
                </Text>
                <Text style={styles.voucherCondition}>{voucher.condition}</Text>
              </View>
              <View style={styles.radioButton}>
                {selectedVoucher === voucher._id && (
                  <View style={styles.radioSelected}></View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <Text style={styles.selectedInfo}>
          {selectedVoucher
            ? `Voucher đã chọn: ${
                vouchers.find(voucher => voucher._id === selectedVoucher)?.title
              }`
            : 'Chưa chọn voucher nào'}
        </Text>
        <TouchableOpacity
          style={[styles.confirmButton, {opacity: selectedVoucher ? 1 : 0.5}]}
          onPress={handleConfirm}
          disabled={!selectedVoucher}>
          <Text style={styles.confirmButtonText}>Đồng ý</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f8f8'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {marginRight: 8},
  headerTitle: {fontSize: 18, fontWeight: 'bold'},
  scrollContainer: {flex: 1, padding: 16},
  voucherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  selectedVoucher: {borderColor: '#f68b1e'},
  voucherContent: {flex: 1},
  voucherTitle: {fontSize: 16, fontWeight: 'bold'},
  voucherDescription: {fontSize: 14, color: '#666', marginVertical: 4},
  voucherCondition: {fontSize: 12, color: '#999'},
  radioButton: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    backgroundColor: '#f68b1e',
    borderRadius: 6,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'column', // Chỉnh lại flexDirection để các phần tử trong footer được xếp theo chiều dọc
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Đặt footer cố định ở dưới cùng
    bottom: 20,
    width: '100%',
  },
  selectedInfo: {fontSize: 14, color: '#666', marginBottom: 12},
  confirmButton: {
    backgroundColor: '#f68b1e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {fontSize: 14, color: '#fff', fontWeight: 'bold'},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default VoucherScreen;
