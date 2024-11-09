import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetails() {
  const navigation = useNavigation();

  // State quản lý các trường dữ liệu và chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState({
    label: false,
    description: false,
    distributor: false,
    price: false,
    status: false,
    productCode: false,
  });
  
  const [productDetails, setProductDetails] = useState({
    label: 'ACER',
    description: 'Mô tả sản phẩm',
    distributor: 'Nhà phân phối',
    price: '50 Tô Hiệu, Quận Hoàn Kiếm, Hà Nội',
    status: 'Tình trạng hàng hóa',
    productCode: 'Mã sản phẩm',
  });

  const handleEdit = (field) => {
    setIsEditing((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleChangeText = (field, value) => {
    setProductDetails((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSave = () => {
    Alert.alert(
      "Cập nhật thành công",
      "Thông tin sản phẩm đã được cập nhật.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('ProductManagementScreen', { updatedProduct: productDetails }),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>PRODUCT DETAILS</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Image 
          source={require('../acssets/acersp.png')}
          style={styles.productImage}
        />
        
        {/* Các trường thông tin */}
        {Object.keys(productDetails).map((field, index) => (
          <View style={styles.infoSection} key={index}>
            {isEditing[field] ? (
              <TextInput
                style={styles.input}
                value={productDetails[field]}
                onChangeText={(text) => handleChangeText(field, text)}
              />
            ) : (
              <Text style={styles.fieldLabel}>{productDetails[field]}</Text>
            )}
            <TouchableOpacity onPress={() => handleEdit(field)} style={styles.editIcon}>
              <Text>✏️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleSave} style={styles.okButton}>
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
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
  okButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
});
