import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CommentScreen = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.backButton}>
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>

    <View style={styles.productContainer}>
      <Image
        source={require('../acssets/acer2.png')}
        style={styles.productImage}
      />
      <View style={styles.productInfoContainer}>
        <Text style={styles.productTitle}>Printed Shirt</Text>
        <Text style={styles.productSubtitle}>GEETA COLLECTION</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>ĐÁNH GIÁ SẢN PHẨM NÀY</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                source={require('../acssets/Star1.png')}
                style={styles.starIcon}
              />
            ))}
          </View>
        </View>
      </View>
    </View>

    <Text style={styles.sectionTitle}>Viết Đánh Giá</Text>
    <TextInput
      style={styles.input}
      placeholder="Suy nghĩ của bạn về sản phẩm"
      placeholderTextColor="#A9A9A9"
      multiline
    />

    <Text style={styles.sectionTitle}>Thêm ảnh hoặc video</Text>
    <TouchableOpacity style={styles.uploadContainer}>
      <Image
        source={require('../acssets/Pictures.png')}
        style={styles.uploadIcon}
      />
      <Text style={styles.uploadText}>Thêm ảnh hoặc video</Text>
    </TouchableOpacity>

    <View style={styles.checkboxContainer}>
      <View style={styles.radioButton} />
      <Text style={styles.checkboxText}>Đánh giá ẩn danh</Text>
    </View>

    <TouchableOpacity style={styles.submitButton}>
      <Text style={styles.submitButtonText}>GỬI</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  productInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starIcon: {
    width: 24,
    height: 24,
    margin: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  input: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  uploadContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
  },
  uploadIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  uploadText: {
    color: '#888',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommentScreen;
