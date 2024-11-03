import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const OrderSuccesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderDetails } = route.params || {}; // Lấy thông tin đơn hàng từ tham số

  return (
    <View style={styles.container}>
      {/* Success Icon (using a local asset) */}
      <View style={styles.iconContainer}>
        <Image
          source={require('../acssets/sucses.png')} // Local success icon
          style={styles.successIcon}
        />
      </View>

      {/* Main Text */}
      <Text style={styles.mainText}>Congrats! Your Order has been placed</Text>

      {/* Subtext */}
      <Text style={styles.subText}>
        Your items have been placed and are on their way to being processed.
      </Text>

      {/* Order Details */}
      {orderDetails && (
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.detailsHeader}>Order Details:</Text>
          <Text style={styles.detailsText}>Total Cost: {orderDetails.totalCost.toLocaleString()} VND</Text>
          <Text style={styles.detailsText}>Delivery Method: {orderDetails.deliveryMethod}</Text>
          <Text style={styles.detailsText}>Payment Method: {orderDetails.paymentMethod}</Text>
          {orderDetails.promoCode && <Text style={styles.detailsText}>Promo Code: {orderDetails.promoCode}</Text>}
        </View>
      )}

      {/* Buttons */}
      <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('OderScreen')}>
        <Text style={styles.buttonText}>TRACK ORDER</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>CONTINUE SHOPPING</Text>
      </TouchableOpacity>

      {/* Back to Home Text at the Bottom */}
      <Text style={styles.backToHomeText} onPress={() => navigation.navigate('Home')}>← Back to home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Đặt justifyContent thành flex-start để các nút bấm không bị đẩy xuống dưới
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  successIcon: {
    width: 300,
    height: 300,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#7e7e7e',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderDetailsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#000',
  },
  trackButton: {
    backgroundColor: '#5A67D8',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  shopButton: {
    backgroundColor: '#5A67D8',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backToHomeText: {
    color: '#7e7e7e',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});


export default OrderSuccesScreen;
