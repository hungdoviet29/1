import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook

export default function OrderDetails() {
  const navigation = useNavigation(); // Initialize the navigation hook

  const handleBackPress = () => {
    navigation.goBack(); // Dùng navigation.goBack() để quay lại màn hình trước
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Order details</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Image 
          source={require('../acssets/macbook_img.png')} // Replace with actual image URL
          style={styles.productImage}
        />
        
        {/* Product Name Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>MacBook M1 pro</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Price Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>50.000.000 Đ</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Quantity Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>SL: 1</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Order ID Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>MÃ ĐƠN HÀNG: 28242845</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Customer Name Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>Tên khách hàng: Nguyễn Đức Trọng</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Phone Number Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>SDT: 0987654321</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>Tiền thanh toán: 50.000.000</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Status Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>Trạng thái: Đặt hàng thành công</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Date Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>Ngày đặt: 08/01/2024</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* OK Button */}
      <TouchableOpacity style={styles.okButton}>
        <Text style={styles.okButtonText}>ok</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EDED',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#000',
    flex: 2,
  },
  editIcon: {
    marginLeft: 10,
  },
  okButton: {
    backgroundColor: '#8DC9C1',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
  okButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
