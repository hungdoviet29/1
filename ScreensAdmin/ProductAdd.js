import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductAdd() {
  const navigation = useNavigation();

  // State để lưu dữ liệu đầu vào của sản phẩm
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [distributor, setDistributor] = useState('');
  const [price, setPrice] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [productCode, setProductCode] = useState('');

  // Hàm xử lý khi nhấn nút OK
  const handleSaveProduct = () => {
    // Hiển thị thông báo thành công và điều hướng về màn hình ProductManagement
    Alert.alert("Thành công", "Sản phẩm đã được thêm thành công!", [
      {
        text: "OK",
        onPress: () => navigation.navigate('ProductManagementScreen'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Nút Quay Lại */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Tiêu đề */}
      <Text style={styles.headerText}>PRODUCT ADD</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hình ảnh sản phẩm */}
        <Image source={require('../acssets/acersp.png')} style={styles.productImage} />

        {/* Tên sản phẩm */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Tên sản phẩm</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên sản phẩm"
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Mô tả sản phẩm */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Mô tả sản phẩm</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mô tả sản phẩm"
            value={productDescription}
            onChangeText={setProductDescription}
          />
        </View>

        {/* Nhà phân phối */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Nhà phân phối</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên nhà phân phối"
            value={distributor}
            onChangeText={setDistributor}
          />
        </View>

        {/* Giá bán */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Giá bán</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập giá bán"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        {/* Tình trạng hàng hóa */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Tình trạng hàng hóa</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tình trạng hàng hóa"
            value={stockStatus}
            onChangeText={setStockStatus}
          />
        </View>

        {/* Mã sản phẩm */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Mã sản phẩm</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mã sản phẩm"
            value={productCode}
            onChangeText={setProductCode}
          />
        </View>
      </ScrollView>
      
      {/* Nút OK */}
      <TouchableOpacity onPress={handleSaveProduct} style={styles.okButton}>
        <Text style={styles.okButtonText}>OK</Text>
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
    color: 'black',
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
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  okButton: {
    backgroundColor: '#8DC9C1',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
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
  
});

