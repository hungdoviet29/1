import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ProductDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>PRODUCT DETAILS</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Image 
          source={require('../acssets/acersp.png')}
          style={styles.productImage}
        />
        <View style={styles.infoSection}>
          <Text style={styles.label}>ACER</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>MÔ TẢ SẢN PHẨM</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>NHÀ PHÂN PHỐI</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>GIÁ BÁN</Text>
          <Text style={styles.infoText}>50 Tô Hiệu, Quận Hoàn Kiếm, Hà Nội</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>TÌNH TRẠNG HÀNG HÓA</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.fieldLabel}>Mã sản phẩm</Text>
          <TouchableOpacity style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
