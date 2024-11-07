import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CatalogAddScreen() {
  const navigation = useNavigation(); // Sử dụng useNavigation để lấy đối tượng navigation

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>CATALOG ADD</Text>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../acssets/nhanhang.png')}
          style={styles.logo}
        />

        {/* Form fields with edit icons */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabelActive}>Tên nhãn hàng</Text>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Mô tả nhãn hàng</Text>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabelBold}>Nhà phân phối</Text>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Giá bán</Text>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabelSmall}>Địa chỉ</Text>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabelBold}>Tình trạng hàng hóa</Text>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </View>
      </View>

      {/* OK button */}
      <TouchableOpacity style={styles.okButton}>
        <Text style={styles.okButtonText}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F4',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  fieldContainer: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    color: '#A1A1A1',
  },
  fieldLabelActive: {
    fontSize: 16,
    color: '#7A57D1',
  },
  fieldLabelBold: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  fieldLabelSmall: {
    fontSize: 12,
    color: '#000',
  },
  icon: {
    width: 20,
    height: 20,
  },
  okButton: {
    backgroundColor: '#85B9C9',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginTop: 20,
  },
  okButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
