import React, {useEffect, useState} from 'react';
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Popular');

  const fetchData = category => {
    setLoading(true);
    let apiUrl = '';

    // Xác định link API cho từng danh mục
    switch (category) {
      case 'Popular':
        apiUrl = 'http://192.168.137.236:3000/LapTop/getListLapTop';
        break;
      case 'Trending':
        apiUrl = 'http://192.168.137.236:3000/LapTop/getListLapTop';
        break;
      case 'News':
        apiUrl = 'http://192.168.137.236:3000/LapTop/getListLapTop';
        break;
      case 'Sale':
        apiUrl = 'http://192.168.137.236:3000/LapTop/getListLapTop';
        break;
      default:
        apiUrl = 'http://192.168.137.236:3000/LapTop/getListLapTop'; // URL mặc định
    }

    axios
      .get(apiUrl)
      .then(response => {
        setLaptops(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching laptop data:', error);
        setLaptops([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(activeCategory);
  }, [activeCategory]);

  const handleCategoryPress = category => {
    setActiveCategory(category);
    fetchData(category);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../acssets/profile1.png')}
          style={styles.profileImage}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image
              source={require('../acssets/bell.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Find')}>
            <Image
              source={require('../acssets/SearchIcon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomDrawerContent')}>
            <Image
              source={require('../acssets/Menu.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <TouchableOpacity onPress={() => handleCategoryPress('Popular')}>
          <Text
            style={[
              styles.category,
              activeCategory === 'Popular' && styles.categoryActive,
            ]}>
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryPress('Trending')}>
          <Text
            style={[
              styles.category,
              activeCategory === 'Trending' && styles.categoryActive,
            ]}>
            Trending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryPress('News')}>
          <Text
            style={[
              styles.category,
              activeCategory === 'News' && styles.categoryActive,
            ]}>
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryPress('Sale')}>
          <Text
            style={[
              styles.category,
              activeCategory === 'Sale' && styles.categoryActive,
            ]}>
            Sale
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      ) : (
        <ScrollView style={styles.productScrollView}>
          <View style={styles.productList}>
            {Array.isArray(laptops) &&
              laptops.map(laptop => (
                <View style={styles.product} key={laptop._id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductScreen', {product: laptop})
                    }>
                    <Image
                      source={{uri: laptop.hinhAnh}}
                      style={styles.productImage}
                    />
                    <Text style={styles.productName}>{laptop.ten}</Text>
                    <Text style={styles.productPrice}>
                      {laptop.gia.toLocaleString()} VND
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.heartIconContainer}>
                    <Image
                      source={require('../acssets/Vector.png')}
                      style={styles.heartIcon}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {flexDirection: 'row', justifyContent: 'space-between', padding: 16},
  profileImage: {width: 40, height: 40, borderRadius: 20},
  headerIcons: {flexDirection: 'row'},
  icon: {width: 24, height: 24, marginLeft: 16},
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  category: {fontSize: 16, fontWeight: 'bold', color: '#999'},
  categoryActive: {
    color: '#6C63FF',
    borderBottomWidth: 2,
    borderBottomColor: '#6C63FF',
  },
  productScrollView: {paddingVertical: 16},
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  product: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    width: '47%',
    padding: 16,
    marginBottom: 16,
  },
  productImage: {width: 100, height: 100, resizeMode: 'contain'},
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productPrice: {fontSize: 14, color: '#888', marginTop: 5},
  heartIconContainer: {position: 'absolute', top: 10, right: 10},
  heartIcon: {width: 20, height: 20},
});

export default HomeScreen;
