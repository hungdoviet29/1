import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADMIN</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('UserManagementScreen')}>
          <Image source={require('../acssets/user_icon.png')} style={styles.icon} />
          <Text style={styles.itemText}>Quản lí người dùng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CategoryManagement')}>
          <Image source={require('../acssets/category_icon.png')} style={styles.icon} />
          <Text style={styles.itemText}>Quản lí danh mục</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProductManagement')}>
          <Image source={require('../acssets/product_icon.png')} style={styles.icon} />
          <Text style={styles.itemText}>Quản lí sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('OrderManagement')}>
          <Image source={require('../acssets/order_icon.png')} style={styles.icon} />
          <Text style={styles.itemText}>Đơn hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ContactManagement')}>
          <Image source={require('../acssets/contact_icon.png')} style={styles.icon} />
          <Text style={styles.itemText}>Quản lí liên hệ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProfileDetail')}>
          <Image source={require('../acssets/profile_icon.png')} style={styles.icon} />
          <Text style={styles.itemText}>Chi tiết hồ sơ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Statistics')}>
          <Image source={require('../acssets/statistics_icon.png')} style={styles.icon} />
          <Text style={styles.itemText}>Thống kê</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Promotions')}>
          <Image source={require('../acssets/promotion_icon.png')} style={styles.icon} />
          <Text style={styles.itemText}>Khuyến mãi</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 50, // Thêm khoảng trống để cuộn dễ dàng
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7f1fd',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AdminScreen;
