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

const OrderHistoryScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch userId from AsyncStorage
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

  // Fetch orders from API
  const fetchOrders = async () => {
    if (!userId) return;

    const url = `http://192.168.0.245:3000/donhang/user/${userId}`;
    console.log(`Fetching orders from: ${url}`);

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching orders: ${errorText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        throw new Error('Invalid response data from API.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const renderOrderItem = ({ item: order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.productName}>{`Recipient: ${
        order.shippingInfo?.name || 'N/A'
      }`}</Text>
      <Text style={styles.productInfo}>{`Phone: ${
        order.shippingInfo?.phone || 'N/A'
      }`}</Text>
      <Text style={styles.productInfo}>{`Address: ${
        order.shippingInfo?.address || 'N/A'
      }`}</Text>
      <Text style={styles.productPrice}>
        Total: {order.totalAmount?.toLocaleString()} VND
      </Text>
      <Text style={styles.orderStatus}>Status: {order.status}</Text>
      <Text style={styles.productsTitle}>Products in Order:</Text>
      {order.cartItems?.map(item => (
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
              {item.productId?.gia
                ? `${item.productId.gia.toLocaleString()} VND`
                : 'No Price'}
            </Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../acssets/BackButton.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order History</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          renderItem={renderOrderItem}
        />
      )}
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
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  orderItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    padding: 16,
    elevation: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginVertical: 5,
  },
  orderStatus: {
    fontSize: 14,
    color: '#555',
  },
  productsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cartItem: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
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
  },
  itemQuantity: {
    fontSize: 12,
    color: '#777',
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
});

export default OrderHistoryScreen;
