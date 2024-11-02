import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const notifications = [
  { id: '1', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '2', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '3', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '4', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '5', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '6', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '7', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '8', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '9', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
  { id: '10', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
];

export default function NotificationScreen() {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Image
        source={require('./assets/acer2.png')} // Thay bằng đường dẫn hình ảnh sản phẩm
        style={styles.productImage}
      />
      <Text style={styles.notificationText}>{item.message}</Text>
      <TouchableOpacity style={styles.closeButton}>
        <Image
          source={require('./assets/Shape.png')} // Thay đường dẫn bằng icon "đóng" của bạn
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('./assets/Back_Button.png')} // Thay đường dẫn bằng icon "quay lại" của bạn
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity>
          <Image
            source={require('./assets/Search.png')} // Thay đường dẫn bằng icon "tìm kiếm" của bạn
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  notificationList: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 4,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
});
