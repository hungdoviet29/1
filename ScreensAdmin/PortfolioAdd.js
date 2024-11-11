import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductScreen = () => {
  const navigation = useNavigation();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = [
    {
      id: '1',
      name: 'Asus Vivobook',
      price: '120.00 USD',
      oldPrice: '240.00 USD',
      discount: '50%',
      rating: 4.5,
      image: require('../acssets/Asus1.png')
    },
    {
      id: '2',
      name: 'Asus Vivobook',
      price: '120.00 USD',
      oldPrice: '240.00 USD',
      discount: '50%',
      rating: 4.5,
      image: require('../acssets/Asus1.png')
    }
  ];

  const toggleSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const renderProduct = ({ item }) => {
    const isSelected = selectedProducts.includes(item.id);
    return (
      <TouchableOpacity onPress={() => toggleSelect(item.id)} style={[styles.productCard, isSelected && styles.selectedCard]}>
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productOldPrice}>{item.oldPrice}</Text>
        <Text style={styles.productRating}>{'⭐'.repeat(Math.floor(item.rating))} ({item.rating})</Text>
        {isSelected && <View style={styles.selectedOverlay} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        {/* Nút Quay Lại */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.header}>Portfolio add</Text>
      <TextInput style={styles.searchInput} placeholder="Search..." />
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.productList}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  productList: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  productCard: {
    width: 150,
    height: 200,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    alignItems: 'center',
    position: 'relative',
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  discountTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImage: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  productOldPrice: {
    fontSize: 12,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
  },
  productRating: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 5,
  },
  addButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#00C4CC',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom:100,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00C4CC',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
});

export default ProductScreen;
