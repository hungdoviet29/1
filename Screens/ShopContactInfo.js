import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ShopContactInfo = () => {
  const navigation = useNavigation(); // Hook to get the navigation object

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

  // Function to go back to the previous screen
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button with Image only */}
      <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

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
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    
    borderRadius: 5,
    width: 40, // Size of the button
    height: 40, // Size of the button
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    fontSize: 24,
  
  },
  shopName: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    width: 120,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  link: {
    fontSize: 16,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default ShopContactInfo;
