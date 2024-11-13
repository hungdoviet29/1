import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites, removeFromFavorites} from '../redux/favoriteSlice';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Popular');

  const fetchData = category => {
    setLoading(true);
    let apiUrl = '';

    // Xác định link API cho từng danh mục
    switch (category) {
      case 'Popular':
        apiUrl = 'http://192.168.101.9:3000/LapTop/getPopularLapTop';
        break;
      case 'Trending':
        apiUrl = 'http://192.168.101.9:3000/LapTop/getTrendingLapTop';
        break;
      case 'News':
        apiUrl = 'http://192.168.101.9:3000/LapTop/getNewsLapTop';
        break;
      case 'Sale':
        apiUrl = 'http://192.168.101.9:3000/LapTop/getSaleLapTop';
        break;
      case 'All':
        apiUrl = 'http://192.168.101.9:3000/LapTop/getListLapTop';
        break;
      default:
        apiUrl = 'http://192.168.101.9:3000/LapTop/getListLapTop';
    }

    axios
      .get(apiUrl)
      .then(response => {
        setLaptops(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching laptop data:', error);
        setLaptops([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(activeCategory);
  }, [activeCategory]);

  const handleCategoryPress = category => {
    setActiveCategory(category);
  };

  const handleAddToFavorites = laptop => {
    const isFavorite = favorites.some(item => item._id === laptop._id);
    if (isFavorite) {
      dispatch(removeFromFavorites(laptop._id));
    } else {
      dispatch(addToFavorites(laptop));
    }
  };

  const isFavorite = laptop =>
    Array.isArray(favorites) && favorites.some(item => item._id === laptop._id);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../acssets/profile1.png')} style={styles.profileImage} />
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Image source={require('../acssets/bell.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Find')}>
          <Image source={require('../acssets/SearchIcon.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomDrawerContent')}>
          <Image source={require('../acssets/Menu.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.mainContent}>
      {/* Banner */}
      <Image source={require('../acssets/banner.png')} style={styles.banner} />

      {/* ScrollView bao quanh phần nội dung dưới banner */}
      
        {/* Brand Section */}
        <Text style={styles.brandTitle}>Brand</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandScroll}>
          <Image source={require('../acssets/logo_hp.png')} style={styles.brandIcon} />
          <Image source={require('../acssets/logo_dell.png')} style={styles.brandIcon} />
          <Image source={require('../acssets/logo_apple.png')} style={styles.brandIcon} />
          <Image source={require('../acssets/logo_acer.png')} style={styles.brandIcon} />
          <Image source={require('../acssets/logo_acer.png')} style={styles.brandIcon} />
          <Image source={require('../acssets/logo_acer.png')} style={styles.brandIcon} />
          <Image source={require('../acssets/logo_acer.png')} style={styles.brandIcon} />
          <Image source={require('../acssets/logo_acer.png')} style={styles.brandIcon} />
          <Image source={require('../acssets/logo_acer.png')} style={styles.brandIcon} />
        </ScrollView>

        {/* Danh mục sản phẩm cố định */}
        <View style={styles.fixedCategories}>
          <Text style={styles.category}>Popular ➞</Text>
        </View>

        {/* Danh sách sản phẩm Popular */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScrollView}>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
        </ScrollView>

        {/* Danh mục sản phẩm Sale */}
        <View style={styles.fixedCategories}>
          <Text style={styles.category}>Sale ➞</Text>
        </View>

        {/* Danh sách sản phẩm Sale */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScrollView}>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productSale}>-50%</Text>
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productOldPrice}>$240.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productSale}>-50%</Text>
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productOldPrice}>$240.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
        </ScrollView>
        <View style={styles.fixedCategories}>
          <Text style={styles.category}>Trending ➞</Text>
        </View>

        {/* Danh sách sản phẩm Sale */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScrollView}>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productSale}>-50%</Text>
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productOldPrice}>$240.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
          <View style={styles.product}>
            <Image source={require('../acssets/laptop1.png')} style={styles.productImage} />
            <Text style={styles.productSale}>-50%</Text>
            <Text style={styles.productName}>$120.00 USD</Text>
            <Text style={styles.productOldPrice}>$240.00 USD</Text>
            <Text style={styles.productRating}>⭐️ 4.5</Text>
          </View>
        </ScrollView>


        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  headerIcons: { flexDirection: 'row' },
  icon: { width: 24, height: 24, marginLeft: 16 },
  banner: {
    width: '80%',               // Giảm chiều rộng xuống còn 60% màn hình
    height: 170,                // Điều chỉnh chiều cao phù hợp với tỷ lệ
    resizeMode: 'cover',
    marginBottom: 20,
    alignSelf: 'center',        // Căn giữa banner trong View cha
    borderRadius: 10,           // Bo tròn nhẹ các góc với bán kính 10
  },
  
  mainContent: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  brandScroll: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  brandIcon: { width: 60, height: 60, resizeMode: 'contain', marginRight: 15 },
  fixedCategories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  productScrollView: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  product: {
    width: 140,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 16,
    marginRight: 16,
    alignItems: 'center',
  },
  productImage: { width: 100, height: 100, resizeMode: 'contain' },
  productName: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 5 },
  productSale: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
  productOldPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#888',
    marginTop: 2,
  },
  productRating: { fontSize: 12, color: '#888', marginTop: 5 },
  bottomSpacing: {
    height: 80, // Chiều cao của khoảng trống, tùy chỉnh theo nhu cầu của bạn
  },
});

export default HomeScreen;
