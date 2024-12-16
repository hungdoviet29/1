import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//djfdoifj
const ProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {product} = route.params;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(0);

  const handleLayout = (event) => {
    const { y, height } = event.nativeEvent.layout;
    setButtonPosition(y + height); // Calculate button position
  }; 

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const showToast = (type, text) => {
    Toast.show({
      type,
      text1: text,
      position: 'bottom',
      visibilityTime: 5000,
      bottomOffset:   60, // Adjust position dynamically
    });
  };

  const handleAddToCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        showToast('error', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
        navigation.navigate('Login');
        return;
      }

      const response = await axios.post('http://192.168.1.37:3000/cart/add', {
        userId,
        productId: product._id,
        quantity,
      });

      if (response.status === 200) {
        showToast('success', 'Sản phẩm đã được thêm vào giỏ hàng');
        // navigation.navigate('Cart');
      } else {
        throw new Error(response.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng');
      }
    } catch (error) {
      showToast('error', `${error.response?.data?.message || error.message}`);
    }
  };

  const toggleFavorite = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        showToast('error', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
        navigation.navigate('Login');
        return;
      }

      if (isFavorite) {
        const response = await axios.delete(`http://192.168.1.37:3000/favorites/${userId}/${product._id}`);
        if (response.status === 200) {
          setIsFavorite(false);
          showToast('success', 'Sản phẩm đã bị gỡ khỏi danh sách yêu thích');
        } else {
          throw new Error(response.data?.message || 'Không thể gỡ sản phẩm khỏi danh sách yêu thích');
        }
      } else {
        const response = await axios.post('http://192.168.1.37:3000/favorites', {
          userId,
          productId: product._id,
        });
        if (response.status === 200) {
          setIsFavorite(true);
          showToast('success', 'Sản phẩm đã được thêm vào danh sách yêu thích');
        } else {
          throw new Error(response.data?.message || 'Không thể thêm sản phẩm vào danh sách yêu thích');
        }
      }
    } catch (error) {
      showToast('error', `Lỗi: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error('User ID không tồn tại');
          return;
        }

        const response = await axios.get(`http://192.168.1.37:3000/favorites/${userId}`);
        const favoriteList = response.data?.favorites || [];
        const isFav = favoriteList.some((item) => item._id === product._id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Lỗi khi kiểm tra danh sách yêu thích:', error);
      }
    };
    checkIfFavorite();
  }, [product._id]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite}>
          <Image
            source={
              isFavorite
                ? require('../acssets/heart1.png')
                : require('../acssets/Vector.png')
            }
            style={[styles.iconHeart, isFavorite && {tintColor: 'red'}]}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{uri: product.hinhAnh}} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.hang}</Text>
          <Text style={styles.productName}>{product.ten}</Text>
          <Text style={styles.productPrice}>{product.gia.toLocaleString()} VND</Text>
          <View style={styles.rating}>
            <Text>⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>(4.5)</Text>
          </View>
          <View style={styles.quantityShareContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle1}>Số lượng máy còn lại :{product.soLuong}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={handleDecreaseQuantity}
                style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityNumber}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncreaseQuantity}
                style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.descriptionRow}>
            <View style={styles.descriptionItem}>
              <Text style={styles.sectionTitle}>CPU</Text>
              <Text style={styles.descriptionText}>{product.CPU}</Text>
            </View>
            <View style={styles.descriptionItem}>
              <Text style={styles.sectionTitle}>RAM</Text>
              <Text style={styles.descriptionText}>{product.RAM}</Text>
            </View>
          </View>
          <View style={styles.descriptionRow}>
            <View style={styles.descriptionItem}>
              <Text style={styles.sectionTitle}>Card Màn Hình</Text>
              <Text style={styles.descriptionText}>{product.CardManHinh}</Text>
            </View>
            <View style={styles.descriptionItem}>
              <Text style={styles.sectionTitle}>Kích Thước Màn Hình</Text>
              <Text style={styles.descriptionText}>{product.KichThuocManHinh}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>MÔ TẢ</Text>
            <Text style={styles.descriptionText} numberOfLines={isDescriptionExpanded ? undefined : 3}>
              {product.moTa}
            </Text>
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.toggleDescriptionText}>
                {isDescriptionExpanded ? 'Ẩn bớt' : 'Xem thêm'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.buttonContainer}
            onLayout={handleLayout}
          >
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                handleAddToCart();
                showToast('success', 'Sản phẩm đã thêm vào giỏ hàng!');
              }}
            >
              <Text style={styles.addToCartText}>THÊM VÀO GIỎ HÀNG</Text>
            </TouchableOpacity>
          </View>
          <Toast />
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    fontSize: 30,
  },
  iconHeart: {
    width: 24,
    height: 24,
    tintColor: '#FF6B6B',
  },
  productImage: {
    width: '100%',
    height: 240,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  productInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  productTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  productPrice: {
    fontSize: 22,
    color: '#4A90E2',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 5,
    color: '#888',
    fontSize: 16,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionTitle1: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  descriptionText1: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  toggleDescriptionText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    alignSelf: 'center',
    marginTop: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityShareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  quantityButton: {
    paddingHorizontal: 12,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#333',
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  descriptionItem: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ProductScreen;
