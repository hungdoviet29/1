import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddBrand = () => {
const navigation = useNavigation();
  const [productName, setProductName] = useState('');


  return (
    <View style={styles.container}>
        
      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Tiêu đề */}
      <Text style={styles.title}>PRODUCT ADD</Text>

      {/* Khu vực hình ảnh sản phẩm */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../acssets/logoNoBG.png')} // Thay bằng tên file của ảnh sản phẩm
          style={styles.image}
        />
        <TouchableOpacity style={styles.uploadButton}>
          <Image
            source={require('../acssets/image_hang.png')} // Thay bằng tên file của icon upload
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Khu vực nhập tên sản phẩm */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={productName}
          onChangeText={setProductName}
        />
        <Image
          source={require('../acssets/image_but.png')} // Thay bằng tên file của icon chỉnh sửa
          style={styles.icon}
        />
      </View>

      {/* Nút OK */}
      <TouchableOpacity style={styles.okButton}>
        <Text style={styles.okButtonText}>ok</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
  },
  imageContainer: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  uploadButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  okButton: {
    backgroundColor: '#a0e0d0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  okButtonText: {
    fontSize: 18,
    color: 'white',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default AddBrand;
