import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const initialProducts = [
  {
    id: '1',
    name: 'ACER',
    price: '1800$',
    quantity: '100',
    image: 'https://example.com/acer-laptop.png',
  },
  {
    id: '2',
    name: 'Apple',
    price: '1800$',
    quantity: '100',
    image: 'https://example.com/apple-laptop.png',
  },
  {
    id: '3',
    name: 'DELL',
    price: '1800$',
    quantity: '100',
    image: 'https://example.com/dell-laptop.png',
  },
  {
    id: '4',
    name: 'HP',
    price: '1800$',
    quantity: '100',
    image: 'https://example.com/hp-laptop.png',
  },
  {
    id: '5',
    name: 'ASUS',
    price: '1800$',
    quantity: '100',
    image: 'https://example.com/asus-laptop.png',
  },
];

const ProductManagement = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (productId) => {
    // Xác nhận trước khi xóa sản phẩm
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa sản phẩm này?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            // Xóa sản phẩm khỏi danh sách
            const updatedProducts = products.filter((item) => item.id !== productId);
            setProducts(updatedProducts);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.quantity}>
          SL: <Text style={styles.quantityText}>{item.quantity}</Text>
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { userId: item.id })}>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Image source={require('../acssets/bin.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../acssets/NextButton.png')} style={styles.iconNext} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Quản lí sản phẩm</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ProductAdd')} style={styles.addButton}>
        <Image source={require('../acssets/them.png')} style={styles.addButtonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A00E0',
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  quantityText: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginVertical: 5,
  },
  iconNext: {
    width: 24,
    height: 14,
    marginVertical: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonImage: {
    width: 50,
    height: 50,
  },
});

export default ProductManagement;
