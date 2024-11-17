import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

export default function ProductAdd() {
  const navigation = useNavigation();
  const route = useRoute();

  // Nhận thông tin hãng từ route params
  const [selectedBrand, setSelectedBrand] = useState('');
  useEffect(() => {
    if (route.params?.selectedBrand) {
      setSelectedBrand(route.params.selectedBrand); // Gán hãng từ màn trước
    }
  }, [route.params]);

  // State để lưu dữ liệu đầu vào của sản phẩm
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [category, setCategory] = useState('');

  // Hàm chọn ảnh
  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUrl(response.assets[0].uri); // Lấy URI từ ảnh
      }
    });
  };

  // Hàm xử lý khi nhấn nút OK
  const handleSaveProduct = async () => {
    if (!productName || !productDescription || !price || !category || !stockStatus) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const formData = new FormData();
    formData.append('ten', productName);
    formData.append('moTa', productDescription);
    formData.append('gia', price);
    formData.append('danhMuc', category);
    formData.append('soLuong', stockStatus);
    formData.append('hang', selectedBrand);

    if (imageUrl) {
      formData.append('hinhAnh', {
        uri: imageUrl,
        name: 'product_image.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await fetch('http://192.168.3.110:3000/laptop/addLapTop', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const result = await response.json();
      console.log('Response:', result);

      if (response.ok) {
        Alert.alert('Thành công', 'Sản phẩm đã được thêm!');
        navigation.navigate('ProductManagementScreen'); // Quay lại màn hình quản lý sản phẩm
      } else {
        Alert.alert('Lỗi', result.message || 'Có lỗi xảy ra.');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Lỗi', error.message);
    }
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
        <Text style={styles.label}>Hãng: {selectedBrand}</Text>

        {/* Hình ảnh sản phẩm */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Ảnh sản phẩm</Text>
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.imagePicker}>
            <Text>Chọn ảnh</Text>
          </TouchableOpacity>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          ) : (
            <Text style={styles.placeholder}>Chưa chọn ảnh</Text>
          )}
        </View>

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

        {/* Giá bán */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Giá bán</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập giá sản phẩm"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        {/* Danh mục */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Danh mục</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập danh mục (e.g., Sale, Popular)"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* Tình trạng hàng hóa */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Số lượng</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số lượng"
            value={stockStatus}
            onChangeText={setStockStatus}
            keyboardType="numeric"
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
  placeholder: {
    fontStyle: 'italic',
    color: '#888',
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
  imagePicker: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
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
