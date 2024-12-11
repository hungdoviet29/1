import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Dùng hook cho navigation

const FindScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Sử dụng useNavigation

  // Hàm gọi API dựa trên từ khóa tìm kiếm
  const fetchProducts = async query => {
    if (!query) {
      setProducts([]);
      return;
    }

    setLoading(true);
    let apiUrl = `http://localhost:3000/LapTop/getListLapTop?search=${query}`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      const filteredProducts = result.data.filter(product =>
        product.ten.toLowerCase().includes(query.toLowerCase()),
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật kết quả tìm kiếm khi người dùng nhập từ khóa
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../acssets/BackButton.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Find Products</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../acssets/SearchIcon.png')}
          style={styles.findicon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Loading Indicator */}
      {loading && <Text>Loading...</Text>}

      {/* Results Info */}
      <Text style={styles.resultInfo}>
        {searchQuery
          ? `${products.length} Items found for "${searchQuery}"`
          : 'No search results yet'}
      </Text>

      {/* Products List */}
      <ScrollView contentContainerStyle={styles.productList}>
        {products.length === 0 && searchQuery ? (
          <Text style={styles.noResultsText}>No products found</Text>
        ) : (
          <View style={styles.row}>
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productItem}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ProductScreen', {product})}>
                <Image
                  source={{uri: product.hinhAnh}}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{product.ten}</Text>
                <Text style={styles.productPrice}>{product.gia} VND</Text>
                <Image
                  source={require('../acssets/Vector.png')}
                  style={styles.iconHeart}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  resultInfo: {
    marginBottom: 20,
    fontSize: 16,
    color: '#888',
  },
  productList: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Để sản phẩm tự xuống dòng nếu không đủ chỗ
    gap: 10, // Khoảng cách giữa các item
    marginBottom: 20,
  },
  productItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  iconHeart: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  findicon: {
    width: 14,
    height: 14,
  },
  noResultsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FindScreen;
