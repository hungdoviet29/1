import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const banners = [
  require('../acssets/banner.png'),
  require('../acssets/Banner2.png'),
  require('../acssets/Banner3.png'),
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        const offset = nextIndex * (screenWidth * 0.85 + 20);
        scrollViewRef.current?.scrollTo({ x: offset, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.bannerSliderContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bannerSlider}
      >
        {banners.map((banner, index) => (
          <Image key={index} source={banner} style={styles.banner} />
        ))}
      </ScrollView>
    </View>
  );
};

const MainHome = () => {
  const navigation = useNavigation();
  const [popularLaptops, setPopularLaptops] = useState([]);
  const [saleLaptops, setSaleLaptops] = useState([]);
  const [trendingLaptops, setTrendingLaptops] = useState([]);
  const [NewsLapTops, setNewsLapTops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [popularResponse, saleResponse, trendingResponse,newsResponse] = await Promise.all([
        axios.get('http://10.24.27.16:3000/LapTop/getPopularLapTop'),
        axios.get('http://10.24.27.16:3000/LapTop/getSaleLapTop'),
        axios.get('http://10.24.27.16:3000/LapTop/getTrendingLapTop'),
        axios.get('http://10.24.27.16:3000/LapTop/getNewsLapTop'),
      ]);

      setPopularLaptops(popularResponse.data.data);
      setSaleLaptops(saleResponse.data.data);
      setTrendingLaptops(trendingResponse.data.data);
      setNewsLapTops(newsResponse.data.data);

    } catch (error) {
      console.error('Error fetching laptop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProducts = (laptops) =>
    laptops
      .filter((laptop) => laptop.soLuong > 0)
      .slice(0, 5)
      .map((laptop) => (
        <View style={styles.product} key={laptop._id}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductScreen', { product: laptop })}
          >
            <View style={styles.productRow}>
              <Image source={{ uri: laptop.hinhAnh }} style={styles.productImage} />
              <View style={styles.descriptionContainer}>
                <View style={styles.descriptionRow}>
                  <View style={styles.descriptionItem}>
                    <Image source={require('../acssets/cpu.png')} style={styles.iconImage} />
                    <Text style={styles.descriptionText}>{laptop.CPU}</Text>
                  </View>
                  {/* <View style={styles.descriptionItem}>
                    <Image source={require('../acssets/RAM.png')} style={styles.iconImage} />
                    <Text style={styles.descriptionText}>{laptop.RAM}</Text>
                  </View> */}
                </View>
                <View style={styles.descriptionRow}>
                  <View style={styles.descriptionItem}>
                    <Image source={require('../acssets/RAM.png')} style={styles.iconImage} />
                    <Text style={styles.descriptionText}>{laptop.RAM}</Text>
                  </View>
                  {/* <View style={styles.descriptionItem}>
                    <Image source={require('../acssets/RAM.png')} style={styles.iconImage} />
                    <Text style={styles.descriptionText}>{laptop.RAM}</Text>
                  </View> */}
                </View>
                
                <View style={styles.descriptionRow}>
                  <View style={styles.descriptionItem}>
                    <Image source={require('../acssets/Card1.png')} style={styles.iconImage} />
                    <Text style={styles.descriptionText}>{laptop.CardManHinh}</Text>
                  </View>
                  {/* <View style={styles.descriptionItem}>
                    <Image source={require('../acssets/kichthuoc.png')} style={styles.iconImage} />
                    <Text style={styles.descriptionText}>{laptop.KichThuocManHinh}</Text>
                  </View> */}
                </View>
              </View>
            </View>
            <Text style={styles.productName}>{laptop.ten}</Text>
            <Text style={styles.productPrice}>{laptop.gia.toLocaleString()} VND</Text>
          </TouchableOpacity>
        </View>
      ));

  const openZalo = () => {
    const phoneNumber = '0357103658';
    const zaloUrl = `zalo://chat?phone=${phoneNumber}`;
    const fallbackUrl = `https://zalo.me/${phoneNumber}`;

    Linking.canOpenURL(zaloUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(zaloUrl);
        } else {
          Linking.openURL(fallbackUrl);
        }
      })
      .catch((err) => console.error('Error opening Zalo:', err));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6C63FF" style={styles.loader} />
      ) : (
        <ScrollView style={styles.mainContent}>
          <View style={styles.header}>
            <Image
              source={require('../acssets/lapstore_logo.png')}
              style={styles.profileImage}
            />
            <View style={styles.headerIcons}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationScreen')}
                style={styles.iconButton}
              >
                <Image
                  source={require('../acssets/bell.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Find')}
                style={styles.iconButton}
              >
                <Image
                  source={require('../acssets/SearchIcon.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CustomDrawerContent')}
                style={styles.iconButton}
              >
                <Image
                  source={require('../acssets/Menu.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <BannerSlider />
          <View style={styles.fixedCategories}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { category: 'Phổ biến' })}>
              <Text style={styles.category}>Phổ biến ➞</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productScrollView}
          >
            {renderProducts(popularLaptops)}
          </ScrollView>
          <View style={styles.fixedCategories}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { category: 'Mới' })}>
              <Text style={styles.category}>Mới  ➞</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productScrollView}
          >
            {renderProducts(NewsLapTops)}
          </ScrollView>
          <View style={styles.fixedCategories}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', { category: 'Xu hướng' })}
            >
              <Text style={styles.category}>Xu hướng ➞</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productScrollView}
          >
            {renderProducts(trendingLaptops)}
          </ScrollView>
        </ScrollView>
      )}
      <TouchableOpacity style={styles.fixedZaloButton} onPress={openZalo}>
        <Image
          source={require('../acssets/Zalo.png')}
          style={styles.zaloIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
//hhdhfdfdh
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 5 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: { width: 60, height: 60, borderRadius: 20 },
  headerIcons: { flexDirection: 'row' },
  iconButton: { marginHorizontal: 5 },
  icon: { width: 24, height: 24 },
  bannerSlider: { height: 200, marginBottom: 20 },
  banner: {
    width: screenWidth * 0.85,
    height: 170,
    resizeMode: 'cover',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  fixedCategories: { paddingHorizontal: 16, marginBottom: 10 },
  category: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  productScrollView: { marginBottom: 20, paddingHorizontal: 16 },
  product: {
    width: 180,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
   
  },
  productImage: { width: 80, height: 80, resizeMode: 'contain', marginRight: 20 },
  descriptionContainer: { flex: 1 },
  descriptionRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  descriptionItem: { flexDirection: 'column', alignItems: 'center' },
  iconImage: { width: 16, height: 16, marginRight: 5 , },
  descriptionText: { fontSize: 12, color: '#666' },
  productName: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  productPrice: { fontSize: 14, color: '#FF5733', fontWeight: 'bold' },
  fixedZaloButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  zaloIcon: { width: 60, height: 60 },
});

export default MainHome;