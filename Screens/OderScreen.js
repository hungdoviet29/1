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
    'All': (id) => `http://192.168.0.245:3000/donhang/user/${id}`,
    'Pending Confirmation': (id) =>
      `http://192.168.0.245:3000/donhang/user/${id}/status?status=${encodeURIComponent('Pending Confirmation')}`,
    'Pending Shipment': (id) =>
      `http://192.168.0.245:3000/donhang/user/${id}/status?status=${encodeURIComponent('Pending Shipment')}`,
    'In Transit': (id) =>
      `http://192.168.0.245:3000/donhang/user/${id}/status?status=${encodeURIComponent('In Transit')}`,
    'Cancelled': (id) =>
      `http://192.168.0.245:3000/donhang/user/${id}/status?status=${encodeURIComponent('Cancelled')}`,
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
      const response = await fetch(`http://192.168.0.245:3000/donhang/${orderId}`, {
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
      const response = await fetch(`http://192.168.0.245:3000/donhang/${orderId}`, {
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
      <Text style={styles.productName}>{`Recipient: ${order.shippingInfo?.name || ''}`}</Text>
      <Text style={styles.productBrand}>{`Phone: ${order.shippingInfo?.phone || ''}`}</Text>
      <Text style={styles.productBrand}>{`Address: ${order.shippingInfo?.address || ''}`}</Text>
      <Text style={styles.productPrice}>Total: {order.totalAmount?.toLocaleString()} VND</Text>
      <Text style={styles.orderStatus}>Status: {order.status}</Text>
      <Text style={styles.productsTitle}>Products in Order:</Text>
      {order.cartItems?.map((item) => (
        <View key={item._id} style={styles.cartItem}>
          <Image
            source={{ uri: item.productId?.hinhAnh || 'placeholder_image_url' }}
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>
              {item.productId?.ten || 'Unknown Product'}
            </Text>
            <Text style={styles.itemPrice}>
              {item.productId?.gia ? `${item.productId.gia.toLocaleString()} VND` : 'No price'}
            </Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          </View>
        </View>
      ))}
      {order.status === 'Pending Confirmation' && (
        <TouchableOpacity style={styles.cancelButton} onPress={() => cancelOrder(order._id)}>
          <Text style={styles.buttonText}>Cancel Order</Text>
        </TouchableOpacity>
      )}
      {order.status === 'In Transit' && (
        <TouchableOpacity style={styles.confirmButton} onPress={() => confirmReceived(order._id)}>
          <Text style={styles.buttonText}>Confirm Received</Text>
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
        <Text style={styles.headerText}>Order Screen</Text>
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
          <Text>Loading...</Text>
        </View>
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
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
    textAlign: 'center',
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
  orderItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  productBrand: { fontSize: 14, color: '#555' },
  productPrice: { fontSize: 14, color: '#333', marginVertical: 8 },
  orderStatus: { fontSize: 14, color: '#888' },
  productsTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  cartItem: { flexDirection: 'row', marginVertical: 8 },
  itemImage: { width: 60, height: 60, borderRadius: 8 },
  itemDetails: { marginLeft: 12, flex: 1 },
  itemName: { fontSize: 14, fontWeight: 'bold' },
  itemPrice: { fontSize: 12, color: '#888' },
  itemQuantity: { fontSize: 12, color: '#888' },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#FF6347',
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButton: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#32CD32',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noOrdersText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
});

export default OrderScreen;
