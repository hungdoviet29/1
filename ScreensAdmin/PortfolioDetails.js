import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailPortfolio = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryUrls = {
    ALL: 'http://172.20.10.6:3000/LapTop/getListLapTop',
    Popular: 'http://172.20.10.6:3000/LapTop/getPopularLapTop',
    Trending: 'http://172.20.10.6:3000/LapTop/getTrendingLapTop',
    Sale: 'http://172.20.10.6:3000/LapTop/getSaleLapTop',
    New: 'http://172.20.10.6:3000/LapTop/getNewsLapTop',
  };

  useEffect(() => {
    if (route.params?.category) {
      const selectedCategory = route.params.category;
      setCategory(selectedCategory);
      fetchProductsByCategory(selectedCategory);
    }
  }, [route.params]);

  const fetchProductsByCategory = async (categoryName) => {
    setLoading(true);
    const url = categoryUrls[categoryName] || categoryUrls.ALL;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok && data.data) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>×</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: item.hinhAnh || 'https://via.placeholder.com/150' }}
        style={styles.productImage}
      />

      <View style={styles.productInfo}>
        <Text style={styles.discountText}>-{item.discount || 50}%</Text>
        <Text style={styles.productName}>{item.ten || 'Tên sản phẩm'}</Text>
        <Text style={styles.productPrice}>${(item.gia || 0).toLocaleString()} USD</Text>
        <Text style={styles.originalPrice}>${((item.gia || 0) * 2).toLocaleString()}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Text key={index} style={[styles.star, index < item.rating ? styles.starFilled : styles.starEmpty]}>
              ★
            </Text>
          ))}
          <Text style={styles.ratingText}>({item.rating || '4.0'})</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Nút Quay Lại */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('PortfolioManagement')} 
        style={styles.backButton}>
        <Image 
          source={require('../acssets/BackButton.png')} 
          style={styles.backIcon} 
        />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Danh mục: {category || 'Tất cả sản phẩm'}</Text>

      {/* Danh sách sản phẩm */}
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
      </View>

      {/* Nút Thêm */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('PortfolioAdd')}>
        <Image
          source={require('../acssets/them.png')} // Đường dẫn tới ảnh icon nút thêm
          style={styles.addIcon}
        />
      </TouchableOpacity>
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
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: '2.5%',
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    marginBottom: 10,
  },
  productInfo: {
    alignItems: 'center',
  },
  discountText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  star: {
    fontSize: 12,
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10, // Đảm bảo nút nằm trên các thành phần khác
    backgroundColor: 'transparent',
    padding: 0,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 70,
    right: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  addIcon: {
    width: 50,
    height: 50,
  },
});

export default DetailPortfolio;
