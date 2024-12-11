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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Linking } from 'react-native';


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
        scrollViewRef.current.scrollTo({ x: offset, animated: true });
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
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [popularResponse, saleResponse, trendingResponse] = await Promise.all([
        axios.get('http://localhost:3000/LapTop/getPopularLapTop'),
        axios.get('http://localhost:3000/LapTop/getSaleLapTop'),
        axios.get('http://localhost:3000/LapTop/getTrendingLapTop'),
      ]);

      setPopularLaptops(popularResponse.data.data);
      setSaleLaptops(saleResponse.data.data);
      setTrendingLaptops(trendingResponse.data.data);
    } catch (error) {
      console.error('Error fetching laptop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOption = (key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderProducts = (laptops) =>
    laptops.slice(0, 5).map((laptop) => (
      <View style={styles.product} key={laptop._id}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductScreen', { product: laptop })}
        >
          <Image source={{ uri: laptop.hinhAnh }} style={styles.productImage} />
          <Text style={styles.productName}>{laptop.ten}</Text>
          <Text style={styles.productPrice}>
            {laptop.gia.toLocaleString()} VND
          </Text>
          <Text style={styles.productRating}>⭐️ 4.5</Text>
        </TouchableOpacity>
      </View>
    ));
    const openZalo = () => {
      // Chuyển đến cuộc trò chuyện Zalo với số điện thoại hoặc tài khoản Zalo
      const zaloUrl = 'https://zalo.me/0357103658'; // Đổi số điện thoại theo ý muốn
      Linking.canOpenURL(zaloUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(zaloUrl);
          } else {
            console.log('Không thể mở Zalo');
          }
        })
        .catch((err) => console.error('Lỗi khi mở Zalo:', err));
    };
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
      onPress={() => navigation.navigate('NotificationScreen')}
      style={styles.iconButton}
    >
      <Image
        source={require('../acssets/bell.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Find')}
      style={styles.iconButton}>
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

          {/* Banner */}
          <BannerSlider />

          {/* Filter Button */}
          {/* <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Image
              source={require('../acssets/filter1.png')}
              style={styles.filterIcon}
            />
          </TouchableOpacity> */}



          {/* Product Categories */}
          <View style={styles.fixedCategories}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { category: 'Popular' })}>
              <Text style={styles.category}>Popular ➞</Text>
            </TouchableOpacity>
            
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScrollView}>
            {renderProducts(popularLaptops)}
          </ScrollView>

          <View style={styles.fixedCategories}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { category: 'Sale' })}>
              <Text style={styles.category}>Sale ➞</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScrollView}>
            {renderProducts(saleLaptops)}
          </ScrollView>

          <View style={styles.fixedCategories}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { category: 'Trending' })}>
              <Text style={styles.category}>Trending ➞</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScrollView}>
            {renderProducts(trendingLaptops)}
          </ScrollView>

          <View style={styles.bottomSpacing} />

        
        </ScrollView>
        
      )}
       <TouchableOpacity
    style={styles.fixedZaloButton}
    onPress={openZalo}
  >
    <Image
      source={require('../acssets/Zalo.png')}
      style={styles.zaloIcon}
    />
  </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Đầy đủ như code ban đầu */
  container: { flex: 1, backgroundColor: '#fff' , padding:5},
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  headerIcons: { flexDirection: 'row', margin: 10 },

  filterButton: {
    position: 'absolute',  // Đặt vị trí tuyệt đối
    right: 10,             // Cách bên phải 10 đơn vị (có thể thay đổi theo nhu cầu)
    top: 270,               // Cách trên 10 đơn vị (có thể thay đổi theo nhu cầu)
    zIndex: 10,            // Đảm bảo nút nổi lên trên các thành phần khác
  },
  filterIcon: {
    width: 30,   // Chỉnh kích thước icon (có thể thay đổi theo yêu cầu)
    height: 30,  // Chỉnh kích thước icon (có thể thay đổi theo yêu cầu)
  },


    // Các style khác...
    zaloButton: {
      position: 'absolute', // Đặt vị trí tuyệt đối
      right: 10,            // Cách từ phải 10 đơn vị
      bottom:'50%',           // Cách từ dưới lên 20 đơn vị (có thể thay đổi tùy nhu cầu)
      zIndex: 1,            // Đảm bảo nút nổi lên trên các thành phần khác
    },
    zaloIcon: {
      width: 50,   // Kích thước icon Zalo
      height: 50,
    },
    // Các style khác...

  
  iconButton: {
    marginHorizontal: 5,           // Khoảng cách 5 đơn vị giữa các icon
  },
  icon: { width: 24, height: 24, margin: 16 },
  bannerSlider: {
    height: 200,
    width: screenWidth * 0.9,
    marginLeft: screenWidth * 0.05,
    marginBottom: 20,
  },
  banner: {
    width: screenWidth * 0.85,
    height: 170,
    resizeMode: 'cover',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  fixedCategories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  category: { fontSize: 18, fontWeight: 'bold', color: '#6C63FF' },
  productScrollView: {
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
  productName: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 5 },
  productPrice: { fontSize: 14, color: '#000', marginTop: 5 },
  productRating: { fontSize: 12, color: '#888', marginTop: 5 },
  bottomSpacing: { height: 80 },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  iconNav: { width: 24, height: 24 },
  modalOverlay: {
    flex: 1,
   
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row', // Vẫn giữ 'row' để các nút nằm ngang
    flexWrap: 'wrap',      // Cho phép bọc các phần tử khi không còn không gian
    justifyContent: 'space-between', // Đảm bảo khoảng cách đều giữa các nút
    alignItems: 'flex-start', // Căn lề các nút ở phía trên cùng
  },
  
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    margin:2,
    width: '40%', // Điều chỉnh width để mỗi nút chiếm 48% chiều rộng
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  selectedOption: {
    backgroundColor: '#6C63FF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#6C63FF',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#6C63FF',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  resetText: {
    fontSize: 14,
    color: '#333',
  },
  applyText: {
    fontSize: 14,
    color: 'white',
  },
  fixedZaloButton: {
    position: 'absolute', // Đặt vị trí cố định
    bottom: 70,           // Khoảng cách phía trên BottomNavigation
    right: 20,            // Cách mép phải
    zIndex: 10,           // Hiển thị trên các thành phần khác
  },
  zaloIcon: {
    width: 50,            // Kích thước icon Zalo
    height: 50,
  },
  
});

export default MainHome;
