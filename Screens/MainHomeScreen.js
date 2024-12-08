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
        axios.get('http://192.168.0.104:3000/LapTop/getPopularLapTop'),
        axios.get('http://192.168.0.104:3000/LapTop/getSaleLapTop'),
        axios.get('http://192.168.0.104:3000/LapTop/getTrendingLapTop'),
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
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Image
              source={require('../acssets/filter1.png')}
              style={styles.filterIcon}
            />
          </TouchableOpacity>

          <Modal
            visible={filterVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setFilterVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      {/* Tiêu đề */}
      <View style={styles.header}>
        <Image
          source={require('../acssets/filter1.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>Bộ lọc tìm kiếm</Text>
        <TouchableOpacity onPress={() => setFilterVisible(false)}>
          <Image
            source={require('../acssets/but.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Nội dung */}
      <ScrollView>
        {/* Hãng sản xuất */}
        <Text style={styles.sectionTitle}>Hãng sản xuất</Text>
        <View style={styles.optionsContainer}>
          {['Apple', 'Lenovo', 'Asus', 'MSI', 'Acer', 'HP', 'Dell', 'Gigabyte', 'Huawei', 'Masstel', 'VAIO'].map((brand) => (
            <TouchableOpacity
              key={brand}
              style={[styles.optionButton, selectedOptions.brand === brand && styles.selectedOption]}
              onPress={() => handleToggleOption('brand', brand)}
            >
              <Text style={styles.optionText}>{brand}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mức giá */}
        <Text style={styles.sectionTitle}>Mức giá</Text>
        <View style={styles.checkboxContainer}>
          {['Tất cả', 'Dưới 10 triệu', 'Từ 10 - 15 triệu', 'Từ 15 - 20 triệu', 'Từ 20 - 25 triệu', 'Từ 25 - 30 triệu', 'Trên 30 triệu'].map((price) => (
            <TouchableOpacity
              key={price}
              style={styles.checkboxOption}
              onPress={() => handleToggleOption('price', price)}
            >
              <View style={[styles.checkbox, selectedOptions.price === price && styles.checkedCheckbox]} />
              <Text style={styles.checkboxText}>{price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Kích thước màn hình */}
        <Text style={styles.sectionTitle}>Kích thước màn hình</Text>
        <View style={styles.optionsContainer}>
          {['Dưới 13 inch', '13 - 15 inch', 'Trên 15 inch'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.optionButton, selectedOptions.screenSize === size && styles.selectedOption]}
              onPress={() => handleToggleOption('screenSize', size)}
            >
              <Text style={styles.optionText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Công nghệ */}
        <Text style={styles.sectionTitle}>Công nghệ</Text>
        <View style={styles.optionsContainer}>
          {['LCD', 'LED', 'OLED', 'IPS', 'Retina'].map((tech) => (
            <TouchableOpacity
              key={tech}
              style={[styles.optionButton, selectedOptions.technology === tech && styles.selectedOption]}
              onPress={() => handleToggleOption('technology', tech)}
            >
              <Text style={styles.optionText}>{tech}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CPU */}
        <Text style={styles.sectionTitle}>CPU</Text>
        <View style={styles.optionsContainer}>
          {['Intel', 'AMD', 'ARM'].map((cpu) => (
            <TouchableOpacity
              key={cpu}
              style={[styles.optionButton, selectedOptions.cpu === cpu && styles.selectedOption]}
              onPress={() => handleToggleOption('cpu', cpu)}
            >
              <Text style={styles.optionText}>{cpu}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Card đồ hoạ */}
        <Text style={styles.sectionTitle}>Card đồ hoạ</Text>
        <View style={styles.optionsContainer}>
          {['NVIDIA', 'AMD', 'Intel', 'Không có'].map((gpu) => (
            <TouchableOpacity
              key={gpu}
              style={[styles.optionButton, selectedOptions.gpu === gpu && styles.selectedOption]}
              onPress={() => handleToggleOption('gpu', gpu)}
            >
              <Text style={styles.optionText}>{gpu}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RAM */}
        <Text style={styles.sectionTitle}>RAM</Text>
        <View style={styles.optionsContainer}>
          {['4GB', '8GB', '16GB', '32GB'].map((ram) => (
            <TouchableOpacity
              key={ram}
              style={[styles.optionButton, selectedOptions.ram === ram && styles.selectedOption]}
              onPress={() => handleToggleOption('ram', ram)}
            >
              <Text style={styles.optionText}>{ram}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nút hành động */}
      </ScrollView>
      <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setSelectedOptions({})}
          >
            <Text style={styles.resetText}>Thiết lập lại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setFilterVisible(false)}
          >
            <Text style={styles.applyText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
    </View>
  </View>
</Modal>

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

          {/* bottomNavigation */}
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
            <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')}>
              <Image
                source={require('../acssets/Vector.png')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
              <Image
                source={require('../acssets/profile.png')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
            <TouchableOpacity
  style={styles.zaloButton}
  onPress={() => console.log("Nút Zalo được nhấn") /* Thực hiện hành động khi nhấn nút Zalo */}
>
  <Image
    source={require('../acssets/zalo1.png')} // Đường dẫn tới icon Zalo
    style={styles.zaloIcon}
  />
</TouchableOpacity>
          </View>
        </ScrollView>
      )}
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

  zaloButton: {
    position: 'absolute',
    right: 10,
    bottom: 70,  // Cách từ dưới lên 70 đơn vị
    zIndex: 1,
  },
  zaloIcon: {
    width: 50,
    height: 50,
  },
  
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
});

export default MainHome;
