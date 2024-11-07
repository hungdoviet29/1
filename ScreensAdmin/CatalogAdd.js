import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Icon bút chỉnh sửa

export default function CatalogAdd() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CATALOG ADD</Text>
      
      <View style={styles.card}>
        <Image
          source={require('../acssets/nhanhang.png')} // Link ảnh logo của nhãn hàng
          style={styles.logo}
        />
        
        <View style={styles.inputRow}>
          <Text style={styles.label}>Tên nhãn hàng</Text>
          <MaterialIcons name="edit" size={20} color="black" />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Mô tả nhãn hàng</Text>
          <MaterialIcons name="edit" size={20} color="black" />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Nhà phân phối</Text>
          <MaterialIcons name="edit" size={20} color="black" />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Giá bán</Text>
          <MaterialIcons name="edit" size={20} color="black" />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Địa chỉ</Text>
          <MaterialIcons name="edit" size={20} color="black" />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Tình trạng hàng hóa</Text>
          <MaterialIcons name="edit" size={20} color="black" />
        </View>
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ok</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#66cdaa',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
