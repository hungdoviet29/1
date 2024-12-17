import React, { useState, useEffect, useRef } from 'react'; import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/favoriteSlice';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Nhận route
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false); // Trạng thái hiển thị bộ lọc
  const [selectedOptions, setSelectedOptions] = useState({}); // Trạng thái lưu tùy chọn bộ lọc
  const normalize = (value) => value?.toString().toLowerCase().trim();

  const applyFilters = () => {
    const filteredLaptops = laptops.filter((laptop) => {
      return (
        (!selectedOptions.cpu || normalize(laptop.CPU) === normalize(selectedOptions.cpu)) &&
        (!selectedOptions.ram || normalize(laptop.RAM) === normalize(selectedOptions.ram)) &&
        (!selectedOptions.card || normalize(laptop.CardManHinh) === normalize(selectedOptions.card)) &&
        (!selectedOptions.screenSize || normalize(laptop.KichThuocManHinh) === normalize(selectedOptions.screenSize)) &&
        (!selectedOptions.price || checkPriceRange(laptop.gia, selectedOptions.price))
      );
    });
    console.log('Kết quả lọc:', filteredLaptops);
    setLaptops(filteredLaptops);
    setFilterVisible(false);
  };
  const checkPriceRange = (price, range) => {
    console.log('Giá:', price, 'Khoảng giá:', range);
    switch (range) {
      case 'Dưới 10 triệu': return price < 10000000;
      case 'Từ 10 - 15 triệu': return price >= 10000000 && price <= 15000000;
      case 'Từ 15 - 20 triệu': return price > 15000000 && price <= 20000000;
      case 'Trên 30 triệu': return price > 30000000;
      default: return true;
    }
  };


  const fetchData = category => {
    setLoading(true);
    let apiUrl = '';

    switch (category) {
      case 'Phổ biến':
        apiUrl = 'http://10.24.27.16:3000/LapTop/getPopularLapTop';
        break;
      case 'Xu hướng':
        apiUrl = 'http://10.24.27.16:3000/LapTop/getTrendingLapTop';
        break;
      case 'Mới':
        apiUrl = 'http://10.24.27.16:3000/LapTop/getNewsLapTop';
        break;
      case 'Giảm Giá':
        apiUrl = 'http://10.24.27.16:3000/LapTop/getSaleLapTop';
        break;
      case 'Tất cả':
        apiUrl = 'http://10.24.27.16:3000/LapTop/getListLapTop';
        break;
      default:
    }

    axios
      .get(apiUrl)
      .then(response => {
        setLaptops(response.data.data || []);
      })
      .catch(error => {
        // console.error('Error fetching laptop data:', error);
        setLaptops([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const categoryFromRoute = route.params?.category || 'All'; // Lấy tham số
    setActiveCategory(categoryFromRoute); // Cập nhật danh mục
  }, [route.params]);

  useEffect(() => {
    fetchData(activeCategory); // Tải dữ liệu khi danh mục thay đổi
  }, [activeCategory]);

  const handleCategoryPress = category => {
    setActiveCategory(category);
  };
  const handleToggleOption = (key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
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
        <Image
          source={require('../acssets/lapstore_logo.png')}
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

      {/* Categories */}
      <View style={styles.categories}>
        {['Tất cả', 'Phổ biến', 'Xu hướng', 'Mới'].map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategoryPress(category)}>
            <Text
              style={[
                styles.category,
                activeCategory === category && styles.categoryActive,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterVisible(true)}>
        <Image
          source={require('../acssets/filter1.png')}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
        
      </View>

      {/* Product List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.productScrollView}>
          {laptops.length > 0 ? (
            <View style={styles.productList}>
              {laptops.map(laptop => (
                <View style={styles.product} key={laptop._id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductScreen', { product: laptop })
                    }>
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

                    {/* Tên sản phẩm */}
                    <Text style={styles.productName} numberOfLines={1}>
                      {laptop.ten}
                    </Text>

                    {/* Giá sản phẩm */}
                    <Text style={styles.productPrice}>
                      {laptop.gia.toLocaleString()} VND
                    </Text>
                  </TouchableOpacity>
                </View>



              ))}
            </View>
          ) : (
            <Text>Không có sản phẩm nào phù hợp với bộ lọc</Text>
          )}
        </ScrollView>

      )}
      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterVisible(false)}>
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
                  source={require('../acssets/delete.png')}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Nội dung */}
            <ScrollView>
              {/* CPU */}
              <Text style={styles.sectionTitle}>CPU</Text>
              <View style={styles.optionsContainer}>
                {['Core i3', 'Intel i7', 'AMD Ryzen 5'].map((cpu) => (
                  <TouchableOpacity
                    key={cpu}
                    style={[styles.optionButton, selectedOptions.cpu === cpu && styles.selectedOption]}
                    onPress={() => handleToggleOption('cpu', cpu)}>
                    <Text style={styles.optionText}>{cpu}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* RAM */}
              <Text style={styles.sectionTitle}>RAM</Text>
              <View style={styles.optionsContainer}>
                {['8 GB (1 thanh 8 GB)', '16GB'].map((ram) => (
                  <TouchableOpacity
                    key={ram}
                    style={[styles.optionButton, selectedOptions.ram === ram && styles.selectedOption]}
                    onPress={() => handleToggleOption('ram', ram)}>
                    <Text style={styles.optionText}>{ram}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Card màn hình */}
              <Text style={styles.sectionTitle}>Card màn hình</Text>
              <View style={styles.optionsContainer}>
                {['Intel UHD Graphics', 'NVIDIA GTX 1660 Ti'].map((card) => (
                  <TouchableOpacity
                    key={card}
                    style={[styles.optionButton, selectedOptions.card === card && styles.selectedOption]}
                    onPress={() => handleToggleOption('card', card)}>
                    <Text style={styles.optionText}>{card}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Kích thước màn hình */}
              <Text style={styles.sectionTitle}>Kích thước màn hình</Text>
              <View style={styles.optionsContainer}>
                {['14 inch', '15.6 inch'].map((screenSize) => (
                  <TouchableOpacity
                    key={screenSize}
                    style={[styles.optionButton, selectedOptions.screenSize === screenSize && styles.selectedOption]}
                    onPress={() => handleToggleOption('screenSize', screenSize)}>
                    <Text style={styles.optionText}>{screenSize}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>


            {/* Nút hành động */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => setSelectedOptions({})}>
                <Text style={styles.resetText}>Thiết lập lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}>
                <Text style={styles.applyText}>Áp dụng</Text>
              </TouchableOpacity>


            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: { width: 60, height: 60, borderRadius: 20 },
  headerIcons: { flexDirection: 'row' },
  icon: { width: 24, height: 24, marginLeft: 16 },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  category: { fontSize: 16, fontWeight: 'bold', color: '#999' },
  categoryActive: {
    color: '#6C63FF',
    borderBottomWidth: 2,
    borderBottomColor: '#6C63FF',
  },
  productScrollView: {
    paddingBottom: 100,
    marginTop: 10,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Cho phép xuống dòng
    justifyContent: 'space-between',
    paddingHorizontal: 8, // Giảm padding hai bên
  },
  product: {
    backgroundColor: '#FFFFFF', // Màu nền trắng
    borderRadius: 10, // Bo góc
    padding: 10, // Khoảng cách bên trong
    marginBottom: 16, // Khoảng cách giữa các sản phẩm
    borderColor: '#E0E0E0', // Màu viền
    borderWidth: 1, // Độ dày viền
    alignItems: 'center', // Căn giữa nội dung
  },
  productImage: { width: 100, height: 100, resizeMode: 'contain' },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productPrice: { fontSize: 14, color: '#888', marginTop: 5 },
  heartIconContainer: { position: 'absolute', top: 10, right: 10 },
  heartIcon: { width: 20, height: 20 },
  modalOverlay: {
    position: 'absolute', // Đảm bảo Modal nằm trên các thành phần khác
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, 
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
    zIndex: 1001, // Đặt cao hơn nền mờ
    elevation: 10, // Thêm hiệu ứng nổi (cho Android)
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Màu nền mờ phía sau modal
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Đảm bảo modal luôn nằm trên các thành phần khác
  },
  modalContainer: {
    backgroundColor: '#fff', // Nền trắng cho dialog
    borderRadius: 10,
    width: '90%', // Chiếm 90% chiều ngang màn hình
    maxHeight: '80%', // Đảm bảo chiều cao tối đa là 80% màn hình
    padding: 20,
    zIndex: 11,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Màu chữ tiêu đề
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Cho phép nội dung xuống dòng
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#6C63FF', // Màu nổi bật khi được chọn
    borderColor: '#6C63FF',
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
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#6C63FF', // Màu hiển thị khi checkbox được chọn
    borderColor: '#6C63FF',
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
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f44336', // Màu đỏ cho nút "Thiết lập lại"
  },
  applyButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4caf50', // Màu xanh cho nút "Áp dụng"
  },
  resetText: {
    color: '#fff', // Chữ màu trắng
    fontWeight: 'bold',
  },
  applyText: {
    color: '#fff', // Chữ màu trắng
    fontWeight: 'bold',
  },
  productContainer: {
    flexDirection: 'row', // Đặt ảnh và thông tin theo chiều ngang
    alignItems: 'center', // Căn giữa theo trục dọc
  },
  productDetails: {
    marginLeft: 15, // Tạo khoảng cách giữa ảnh và thông tin
    flex: 1, // Cho phép chiếm phần còn lại của chiều ngang
    justifyContent: 'space-between', // Căn đều các dòng
    flexDirection: 'column', // Căn theo cột
    alignItems: 'flex-start', // Căn trái
  },
  productDetailText: {
    fontSize: 14, // Cỡ chữ phù hợp
    color: '#333', // Màu chữ
    marginBottom: 2, // Khoảng cách nhỏ giữa các dòng
  },
  productImage: {
    width: 120, // Chiều rộng ảnh
    height: 120, // Chiều cao ảnh
    resizeMode: 'contain', // Đảm bảo ảnh không bị méo
    borderRadius: 10, // Bo góc
  },
  productName: {
    fontSize: 16, // Cỡ chữ lớn hơn cho tên sản phẩm
    fontWeight: 'bold', // Làm đậm chữ
    color: '#333', // Màu chữ đậm hơn
  },
  productPrice: {
    fontSize: 16, // Cỡ chữ cho giá sản phẩm
    fontWeight: 'bold', // Chữ đậm
    color: '#FF0000', // Màu đỏ cho giá
    marginTop: 5, // Khoảng cách phía trên
  },
  product: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 8, // Giảm padding bên trong
    marginBottom: 8, // Giảm khoảng cách giữa các sản phẩm
    width: '48%', // Giảm kích thước sản phẩm để vừa với màn hình
    borderColor: '#E0E0E0',
    borderWidth: 1,
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

});

export default HomeScreen;
