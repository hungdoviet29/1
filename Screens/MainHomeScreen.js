import React, {useState, useEffect} from 'react';
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

const MainHome = () => {
  const navigation = useNavigation();
  const [popularLaptops, setPopularLaptops] = useState([]);
  const [saleLaptops, setSaleLaptops] = useState([]);
  const [trendingLaptops, setTrendingLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [popularResponse, saleResponse, trendingResponse] =
        await Promise.all([
          axios.get('http://172.20.10.6:3000/LapTop/getPopularLapTop'),
          axios.get('http://172.20.10.6:3000/LapTop/getSaleLapTop'),
          axios.get('http://172.20.10.6:3000/LapTop/getTrendingLapTop'),
        ]);

      setPopularLaptops(popularResponse.data.data);
      setSaleLaptops(saleResponse.data.data);
      setTrendingLaptops(trendingResponse.data.data);
    } catch (error) {
      console.error('Error fetching laptop data:', error);
      setPopularLaptops([]);
      setSaleLaptops([]);
      setTrendingLaptops([]);
    } finally {
      setLoading(false);
    }
  };

  const renderProducts = (laptops, isSale = false) =>
    laptops.slice(0, 5).map(laptop => (
      <View style={styles.product} key={laptop._id}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductScreen', {product: laptop})
          }>
          {isSale && <Text style={styles.productSale}>-50%</Text>}
          <Image source={{uri: laptop.hinhAnh}} style={styles.productImage} />
          <Text style={styles.productName}>{laptop.ten}</Text>
          <Text style={styles.productPrice}>
            {laptop.gia.toLocaleString()} VND
          </Text>
          {isSale && (
            <Text style={styles.productOldPrice}>
              {(laptop.gia * 2).toLocaleString()} VND
            </Text>
          )}
          <Text style={styles.productRating}>⭐️ 4.5</Text>
        </TouchableOpacity>
      </View>
    ));

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6C63FF" style={styles.loader} />
      ) : (
        <ScrollView style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../acssets/profile1.png')}
              style={styles.profileImage}
            />
            <View style={styles.headerIcons}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationScreen')}>
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

          {/* Banner */}
          <Image
            source={require('../acssets/banner.png')}
            style={styles.banner}
          />
          {/* Popular Section */}
          {/* Popular Section */}
          <View style={styles.fixedCategories}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Home', {category: 'Popular'})
              }>
              <Text style={styles.category}>Popular ➞</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productScrollView}>
            {renderProducts(popularLaptops)}
          </ScrollView>

          {/* Sale Section */}
          <View style={styles.fixedCategories}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', {category: 'Sale'})}>
              <Text style={styles.category}>Sale ➞</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productScrollView}>
            {renderProducts(saleLaptops, true)}
          </ScrollView>

          {/* Trending Section */}
          <View style={styles.fixedCategories}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Home', {category: 'Trending'})
              }>
              <Text style={styles.category}>Trending ➞</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productScrollView}>
            {renderProducts(trendingLaptops)}
          </ScrollView>

          <View style={styles.bottomSpacing} />

          {/* Bottom Navigation */}
          <View style={styles.bottomNavigation}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                source={require('../acssets/home.png')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
              <Image
                source={require('../acssets/BasketIcon.png')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('FavoritesScreen')}>
              <Image
                source={require('../acssets/Vector.png')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}>
              <Image
                source={require('../acssets/profile.png')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {width: 40, height: 40, borderRadius: 20},
  headerIcons: {flexDirection: 'row'},
  icon: {width: 24, height: 24, marginLeft: 16},
  banner: {
    width: '80%',
    height: 170,
    resizeMode: 'cover',
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 10,
  },
  fixedCategories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  category: {fontSize: 18, fontWeight: 'bold', color: '#6C63FF'},
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
  productImage: {width: 100, height: 100, resizeMode: 'contain'},
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  productPrice: {fontSize: 14, color: '#000', marginTop: 5},
  productSale: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    position: 'absolute',
    top: 5,
    left: 5,
  },
  productOldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#888',
    marginTop: 2,
  },
  productRating: {fontSize: 12, color: '#888', marginTop: 5},
  bottomSpacing: {height: 80},
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  iconNav: {width: 24, height: 24},
});

export default MainHome;
