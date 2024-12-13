import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {product} = route.params;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert(
          'Lỗi',
          'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.',
        );
        navigation.navigate('Login');
        return;
      }
      await axios.post('http://192.168.0.104:3000/cart/add', {
        userId,
        productId: product._id,
        quantity,
      });
      Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng');
      navigation.navigate('Cart');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng');
    }
  };

  const toggleFavorite = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert(
          'Lỗi',
          'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.',
        );
        navigation.navigate('Login');
        return;
      }
  
      // Kiểm tra trạng thái yêu thích và thực hiện hành động tương ứng
      if (isFavorite) {
        // Nếu sản phẩm đã có trong danh sách yêu thích, gỡ bỏ sản phẩm khỏi yêu thích
        await axios.post('http://192.168.0.104:3000/removeFavoriteProduct', {
          userId,
          productId: product._id,
        });
        setIsFavorite(false); // Cập nhật lại trạng thái
        Alert.alert('Thành công', 'Sản phẩm đã bị gỡ khỏi danh sách yêu thích');
      } else {
        // Nếu sản phẩm chưa có trong danh sách yêu thích, thêm vào danh sách yêu thích
        await axios.post('http://192.168.0.104:3000/addFavoriteProduct', {
          userId,
          productId: product._id,
        });
        setIsFavorite(true); // Cập nhật lại trạng thái
        Alert.alert('Thành công', 'Sản phẩm đã được thêm vào danh sách yêu thích');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật danh sách yêu thích:', error.response?.data || error.message);
      Alert.alert('Lỗi', 'Không thể cập nhật danh sách yêu thích');
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
        const response = await axios.get(
          `http://192.168.0.104:3000/favorites/${userId}`,
        );
        const favoriteList = response.data.favorites || [];
        const isFavorite = favoriteList.some(item => item._id === product._id);
        setIsFavorite(isFavorite);
      } catch (error) {
        console.error('Lỗi khi kiểm tra danh sách yêu thích:', error);
      }
    };
    checkIfFavorite();
  }, [product._id]);

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
  source={isFavorite ? require('../acssets/heart1.png') : require('../acssets/Vector.png')}
  style={[styles.iconHeart, isFavorite && {tintColor: 'red'}]}
/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{uri: product.hinhAnh}} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.hang}</Text>
          <Text style={styles.productName}>{product.ten}</Text>
          <Text style={styles.productPrice}>
            {product.gia.toLocaleString()} VND
          </Text>
          <View style={styles.rating}>
            <Text>⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>(4.5)</Text>
          </View>
          <View style={styles.quantityShareContainer}>
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
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>CPU</Text>
            <Text style={styles.descriptionText}>{product.CPU}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>RAM</Text>
            <Text style={styles.descriptionText}>{product.RAM}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>CardManHinh</Text>
<Text style={styles.descriptionText}>{product.CardManHinh}</Text>
          </View><View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>KichThuocManHinh</Text>
            <Text style={styles.descriptionText}>{product.KichThuocManHinh}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>MÔ TẢ</Text>
            <Text style={styles.descriptionText}>{product.moTa}</Text>
          </View>
          <View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.addToCartButton}
    onPress={handleAddToCart}>
    <Text style={styles.addToCartText}>THÊM VÀO GIỎ HÀNG</Text>
  </TouchableOpacity>
</View>
        </View>
      </ScrollView>
    </View>
  );
};
//fdgsdfsgt
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  contentContainer: {
    padding: 16,
    
  },
  buttonContainer: {
    marginTop: 16,  // Space above the button
    marginBottom: 24, // Space below the button
    width: '100%', // Ensure the container is full width
    alignItems: 'center', // Center the button horizontally
  },
  
  addToCartButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350, // Fixed width in pixels
    alignSelf: 'center', // Centers the button horizontally
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
  icon: {
    width: 24,
    height: 24,
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
  descriptionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  addToCartButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductScreen;