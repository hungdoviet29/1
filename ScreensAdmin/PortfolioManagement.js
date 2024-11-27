import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PortfolioManagement = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([
    {
      name: 'ALL',
      count: 0,
      url: 'http://192.168.0.4:3000/LapTop/getListLapTop',
    },
    {
      name: 'Popular',
      count: 0,
      url: 'http://192.168.0.4:3000/LapTop/getPopularLapTop',
    },
    {
      name: 'Trending',
      count: 0,
      url: 'http://192.168.0.4:3000/LapTop/getTrendingLapTop',
    },
    {
      name: 'Sale',
      count: 0,
      url: 'http://192.168.0.4:3000/LapTop/getSaleLapTop',
    },
    {
      name: 'New',
      count: 0,
      url: 'http://192.168.0.4:3000/LapTop/getNewsLapTop',
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryCounts();
  }, []);

  const fetchCategoryCounts = async () => {
    setLoading(true);
    const updatedCategories = await Promise.all(
      categories.map(async category => {
        try {
          const response = await fetch(category.url);
          const data = await response.json();
          if (response.ok && data.data) {
            return {...category, count: data.data.length};
          } else {
            return {...category, count: 0};
          }
        } catch (error) {
          console.error(`Error fetching category ${category.name}:`, error);
          return {...category, count: 0};
        }
      }),
    );
    setCategories(updatedCategories);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Nút Quay Lại */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image
          source={require('../acssets/BackButton.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.header}>Quản lí danh mục</Text>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView style={styles.scrollView}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryContainer}
                onPress={() =>
                  navigation.navigate('DetailPortfolio', {
                    category: category.name,
                  })
                } // Truyền tên danh mục
              >
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.productCount}>
                  {category.count} Product
                </Text>
                <TouchableOpacity style={styles.deleteButton}>
                  <Image
                    source={require('../acssets/bin.png')} // Đường dẫn tới ảnh icon thùng rác
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PortfolioAdd')}>
          <Image
            source={require('../acssets/them.png')} // Đường dẫn tới ảnh icon nút thêm
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingTop: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C4AB6',
  },
  productCount: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 50,
    height: 50,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default PortfolioManagement;
