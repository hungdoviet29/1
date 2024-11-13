import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ProductManagementScreen = () => {
  const navigation = useNavigation();

  const brands = [
    {
      id: '1',
      name: 'ACER',
      logo: require('../acssets/logo_acer.png'),
    },
    {
      id: '2',
      name: 'APPLE',
      logo: require('../acssets/logo_apple.png'),
    },
    {
      id: '3',
      name: 'DELL',
      logo: require('../acssets/logo_dell.png'),
    },
    {
      id: '4',
      name: 'HP',
      logo: require('../acssets/logo_hp.png'),
    },
  ];

  const handleEdit = (id) => {
    navigation.navigate('ProductDetails', { productId: id });
  };

  const handleDelete = (id) => {
    console.log(`Delete item with id: ${id}`);
  };

  const handleAdd = () => {
    navigation.navigate('AddBrand');
  };
  const handleBrandPress = (id) => {
    navigation.navigate('ProductBrandScreen', { brandId: id });
  };

  const renderBrand = ({ item }) => (
    <TouchableOpacity onPress={() => handleBrandPress(item.id)} style={styles.brandContainer}>
      <Image source={item.logo} style={styles.logo} />
      <Text style={styles.brandName}>{item.name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
          <Image source={require('../acssets/bin.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.iconButton}>
          <Image source={require('../acssets/edit.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.header}>Quản lí sản phẩm</Text>
      <FlatList
        data={brands}
        renderItem={renderBrand}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Image source={require('../acssets/them.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    textAlign:'center',
    color:'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 100,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
  },
  brandName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C4AB6',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00C853',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductManagementScreen;
