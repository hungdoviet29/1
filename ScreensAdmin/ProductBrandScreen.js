import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductBrandScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedBrand, setSelectedBrand] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Hiển thị trạng thái tải dữ liệu

  useEffect(() => {
    if (route.params?.selectedBrand) {
      setSelectedBrand(route.params.selectedBrand);
      fetchProducts(route.params.selectedBrand);
    }
  }, [route.params]);

  // Hàm gọi API để lấy sản phẩm theo hãng
  const fetchProducts = async (brand) => {
    try {
      const response = await fetch(`http://172.20.10.6:3000/laptops/brand/${brand}`);
      const result = await response.json();
      if (response.ok) {
        setProducts(result.data); // Gán dữ liệu sản phẩm từ API
      } else {
        console.log('Error:', result.message);
        setProducts([]);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setProducts([]);
    } finally {
      setLoading(false); // Dừng trạng thái tải dữ liệu
    }
  };

  const handleAdd = () => {
    navigation.navigate('ProductAdd', { selectedBrand }); // Truyền tiếp tên hãng sang màn ProductAdd
  };

  // Hàm render từng sản phẩm trong danh sách
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>×</Text>
      </TouchableOpacity>
      <Image source={{ uri: item.hinhAnh }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.discountText}>-{item.danhMuc === 'Sale' ? '50%' : ''}</Text>
        <Text style={styles.productName}>{item.ten}</Text>
        <Text style={styles.productPrice}>${(item.gia / 1000000).toFixed(2)}M</Text>
        <Text style={styles.originalPrice}>${((item.gia * 1.5) / 1000000).toFixed(2)}M</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Text key={index} style={[styles.star, index < 4 ? styles.starFilled : styles.starEmpty]}>
              ★
            </Text>
          ))}
          <Text style={styles.ratingText}>(4.5)</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.header}>Sản phẩm theo hãng: {selectedBrand}</Text>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={styles.productList}
          />
        )}
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Image source={require('../acssets/them.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingTop: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  productList: {
    paddingBottom: 80,
  },
  productContainer: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: '1.5%',
    padding: 10,
    position: 'relative',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  deleteIcon: {
    fontSize: 18,
    color: '#FF3B30',
  },
  productImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  productInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  discountText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    top: -10,
    left: -5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#FF3B30',
  },
  originalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  star: {
    fontSize: 12,
    color: '#FFD700',
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#CCC',
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 50,
    height: 50,
  },
});

export default ProductBrandScreen;
