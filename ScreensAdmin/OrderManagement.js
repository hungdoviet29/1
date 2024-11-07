import React from 'react';
import { View, Text, Image, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook để lấy navigation

const OrderItem = ({ order }) => {
  const navigation = useNavigation(); // Hook để lấy navigation

  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.storeName}>{order.storeName}</Text>

        <View style={styles.productRow}>
          <Image
            source={order.productImage}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{order.productName}</Text>
            <Text style={styles.productPrice}>{order.productPrice}</Text>
            <Text style={styles.productQuantity}>SL: {order.productQuantity}</Text>
          </View>
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderText}>Mã đơn hàng: {order.orderId}</Text>
          <Text style={styles.orderText}>Tên khách hàng: {order.customerName}</Text>
          <Text style={styles.orderText}>SDT: {order.customerPhone}</Text>
          <Text style={styles.orderText}>Tiền thanh toán: {order.totalPrice}</Text>
          <Text style={styles.orderText}>Trạng thái: {order.status}</Text>
          <Text style={styles.orderText}>Ngày đặt: {order.orderDate}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Hủy đơn', 'Đơn hàng đã được hủy.')}>
            <Text style={styles.buttonText}>Hủy đơn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Sửa đơn', 'Đơn hàng đã được sửa.')}>
            <Text style={styles.buttonText}>Sửa đơn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderDetails', { userId: order.orderId })}>
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const OrderManagement = () => {
  const navigation = useNavigation(); // Thêm useNavigation hook để lấy đối tượng navigation

  const orders = [
    {
      storeName: 'LapStore',
      productImage: require('../acssets/Asus1.png'),
      productName: 'MacBook M1 Pro',
      productPrice: '50.000.000 đ',
      productQuantity: 1,
      orderId: '28242845',
      customerName: 'Nguyễn Đức Trọng',
      customerPhone: '0987654321',
      totalPrice: '50.000.000 đ',
      status: 'Đặt hàng thành công',
      orderDate: '08/01/2024',
    },
    {
      storeName: 'LapStore',
      productImage: require('../acssets/Asus1.png'),
      productName: 'Dell XPS 13',
      productPrice: '45.000.000 đ',
      productQuantity: 1,
      orderId: '28242846',
      customerName: 'Trần Văn A',
      customerPhone: '0123456789',
      totalPrice: '45.000.000 đ',
      status: 'Đặt hàng thành công',
      orderDate: '09/01/2024',
    },
  ];

  const handleBackPress = () => {
    navigation.goBack(); // Dùng navigation.goBack() để quay lại màn hình trước
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Đơn hàng</Text>
        </View>
      </View>

      {orders.map((order, index) => (
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
  },
  productQuantity: {
    fontSize: 14,
    color: '#888',
    textAlign: 'left',
  },
  orderInfo: {
    marginTop: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  orderText: {
    fontSize: 14,
    marginVertical: 2,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderManagement;
