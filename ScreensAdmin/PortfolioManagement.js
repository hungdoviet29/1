// PortfolioManagement.js
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  {
    id: '1',
    name: 'ACER',
    status: 'HẾT HÀNG',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxMaWh99FF_Adpx6RAXXH48EUb295u90hNxA&s',
  },
  {
    id: '2',
    name: 'Apple',
    status: 'SẮP HẾT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png',
  }
];

const PortfolioManagement = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.logo }} style={styles.logo} />
      <View style={styles.categoryInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>
          Trạng thái: <Text style={styles.statusText}>{item.status}</Text>
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../acssets/bin.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../acssets/NextButton.png')} style={styles.iconNext} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AdminHome')} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Quản lí danh mục</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* Thay đổi sự kiện onPress để điều hướng đến màn hình CatalogAdd */}
      <TouchableOpacity onPress={() => navigation.navigate('CatalogAdd')} style={styles.addButton}>
        <Image source={require('../acssets/them.png')} style={styles.addButtonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  logo: {
    width: 75,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A00E0',
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  statusText: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginVertical: 5,
  },
  iconNext: {
    width: 24,
    height: 14,
    marginVertical: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonImage: {
    width: 40,
    height: 40,
  }
});

export default PortfolioManagement;
