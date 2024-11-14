import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const ShopContactInfo = () => {
  const contactInfo = {
    shopName: 'LAPSTORE',
    address: 'Tòa nhà FPT Polytechnic., Cổng số 2, 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội',
    phone: '0357103758',
    email: 'nguyentientai280403@gmail.com',
    website: 'https://www.shopabc.com',
    facebook: 'https://www.facebook.com/shopabc',
    openingHours: 'Thứ 2 - Thứ 7: 9:00 - 18:00',
    contactPerson: 'Nguyễn Văn B (Quản lý)',
  };

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.shopName}>{contactInfo.shopName}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.value}>{contactInfo.address}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(`tel:${contactInfo.phone}`)}>
          <Text style={styles.link}>{contactInfo.phone}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(`mailto:${contactInfo.email}`)}>
          <Text style={styles.link}>{contactInfo.email}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Website:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(contactInfo.website)}>
          <Text style={styles.link}>{contactInfo.website}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Facebook:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(contactInfo.facebook)}>
          <Text style={styles.link}>{contactInfo.facebook}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Giờ hoạt động:</Text>
        <Text style={styles.value}>{contactInfo.openingHours}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Người liên hệ:</Text>
        <Text style={styles.value}>{contactInfo.contactPerson}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    width: 120,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default ShopContactInfo;
