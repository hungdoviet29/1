import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

const AdminScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADMIN</Text>
      <ScrollView>
        <View style={styles.item}>
          <Image
            source={require('../acssets/user_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Quản lí người dùng</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require('../acssets/category_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Quản lí danh mục</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require('../acssets/product_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Quản lí sản phẩm</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require('../acssets/order_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Đơn hàng</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require('../acssets/contact_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Quản lí liên hệ</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require('../acssets/profile_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Chi tiết hồ sơ</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require('../acssets/statistics_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>thống kê</Text>
        </View>
        <View style={styles.item}>
          <Image
            source={require('../acssets/promotion_icon.png')}
            style={styles.icon}
          />
          <Text style={styles.itemText}>Khuyến mãi</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
