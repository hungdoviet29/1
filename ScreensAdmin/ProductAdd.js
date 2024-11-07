import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook để lấy navigation

export default function ProductAdd() {
  const navigation = useNavigation(); // Sử dụng useNavigation hook để lấy đối tượng navigation

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Header Text */}
      <Text style={styles.headerText}>PRODUCT ADD</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Image */}
        <Image 
          source={require('../acssets/acersp.png')} 
          style={styles.productImage} 
        />
        
        {/* Product Name Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Tên sản phẩm</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Product Description Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>MÔ TẢ SẢN PHẨM</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Distributor Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>NHÀ PHÂN PHỐI</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Price Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>GIÁ BÁN</Text>
          <Text style={styles.infoText}>50 Tô Hiệu, Q. Ba Đình, TP. Hà Nội</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Stock Status Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>TÌNH TRẠNG HÀNG HÓA</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Product Code Section */}
        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>Mã sản phẩm</Text>
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
    color: '#8A2BE2',
    fontWeight: 'bold',
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#999',
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
    marginBottom: 250,
    alignSelf: 'center',
    width: '50%',
  },
  okButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});
