import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsScreen = () => {
  const navigation = useNavigation();

  const [brandName, setBrandName] = useState("ACER"); // State để lưu tên thương hiệu có thể chỉnh sửa

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>PRODUCT DETAILS</Text>
      <Image source={require('../acssets/logo_acer.png')} style={styles.logo} />
      <View style={styles.nameContainer}>
        <Text style={styles.nameLabel}>Name: </Text>
        <TextInput
          style={styles.brandNameInput}
          value={brandName}
          onChangeText={(text) => setBrandName(text)}
        />
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Image source={require('../acssets/image_hang.png')} style={styles.editIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.okButton}>
        <Text style={styles.okText}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#F0F0F0' },
  backButton: { alignSelf: 'flex-start' },
  backText: { fontSize: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  logo: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 20 },
  nameContainer: { flexDirection: 'row', alignItems: 'center' },
  nameLabel: { fontSize: 18 },
  brandNameInput: { fontSize: 18, color: '#6C63FF', borderBottomWidth: 1, borderBottomColor: '#6C63FF', minWidth: 70, textAlign: 'center' },
  editButton: { position: 'absolute', right: 120, top: 190 },
  editIcon: { width: 24, height: 24, resizeMode: 'contain' },
  okButton: { marginTop: 30, backgroundColor: '#68C3A3', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10 },
  okText: { color: '#FFF', fontSize: 20 }
});

export default ProductDetailsScreen;
