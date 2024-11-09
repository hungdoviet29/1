import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, selectOrders, selectPaymentMethod } from '../redux/orderSlice';
import { useRoute } from '@react-navigation/native';

const OrderScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const selectedPaymentMethod = useSelector(selectPaymentMethod);
    const route = useRoute();
    const { shippingInfo, totalCost } = route.params || {};
    const [selectedTab, setSelectedTab] = useState('Tất cả');
    const orderAddedRef = useRef(false);

    useEffect(() => {
      if (
        shippingInfo &&
        totalCost !== undefined &&
        !orders.some(order => order.id === shippingInfo.id) &&
        !orderAddedRef.current
      ) {
        const orderStatus = selectedPaymentMethod === 'Banking' ? 'Chờ vận chuyển' : 'Chưa thanh toán';
        
        const newOrder = {
          id: String(new Date().getTime()),
          shippingInfo: shippingInfo,
          totalAmount: totalCost,
          status: orderStatus,
        };

        dispatch(addOrder(newOrder));
        orderAddedRef.current = true;
      }
    }, [shippingInfo, totalCost, selectedPaymentMethod, orders, dispatch]);

    const filteredOrders = orders.filter(order => {
      if (order.status && order.shippingInfo && order.totalAmount) {
        if (selectedTab === 'Tất cả') return true;
        if (selectedTab === 'Chưa thanh toán') return order.status === 'Chưa thanh toán';
        if (selectedTab === 'Chờ vận chuyển') return order.status === 'Chờ vận chuyển';
        if (selectedTab === 'Đã vận chuyển') return order.status === 'Đã vận chuyển';
      }
      return false;
    });

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

        <View style={styles.tabs}>
          {['Tất cả', 'Chưa thanh toán', 'Chờ vận chuyển', 'Đã vận chuyển'].map(
            tab => (
              <Text
                key={tab}
                style={[styles.tabItem, selectedTab === tab && styles.activeTab]}
                onPress={() => setSelectedTab(tab)}>
                {tab}
              </Text>
            ),
          )}
        </View>

        <ScrollView style={styles.ordersList}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <View key={order.id} style={styles.orderItem}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {order.shippingInfo?.name
                      ? `Tên người nhận: ${order.shippingInfo.name}`
                      : ''}
                  </Text>
                  <Text style={styles.productBrand}>
                    {order.shippingInfo?.phone
                      ? `Số điện thoại: ${order.shippingInfo.phone}`
                      : ''}
                  </Text>
                  <Text style={styles.productBrand}>
                    {order.shippingInfo?.address
                      ? `Địa chỉ: ${order.shippingInfo.address}`
                      : ''}
                  </Text>
                  <Text style={styles.productPrice}>
                    Tổng tiền: {order.totalAmount.toLocaleString()} VND
                  </Text>
                  <Text style={styles.orderStatus}>
                    Trạng thái: {order.status}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noOrdersText}>Không có đơn hàng nào.</Text>
          )}
        </ScrollView>
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
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabItem: {
    fontSize: 14,
    color: '#999',
  },
  activeTab: {
    color: '#6C63FF',
    borderBottomWidth: 2,
    borderBottomColor: '#6C63FF',
    paddingBottom: 5,
  },
  ordersList: {
    padding: 16,
  },
  orderItem: {
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productBrand: {
    fontSize: 14,
    color: '#888',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  orderStatus: {
    fontSize: 12,
    color: '#aaa',
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
});

export default OrderScreen;
