import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const countries = [
  'Việt Nam', 'Hoa Kỳ', 'Trung Quốc', 'Nhật Bản', 'Hàn Quốc', 'Ấn Độ',
  'Pháp', 'Đức', 'Canada', 'Úc', 'Nga', 'Brazil', 'Mexico', 'Anh Quốc',
  'Ý', 'Tây Ban Nha', 'Indonesia', 'Nam Phi',
];

const CountrySelectScreen = ({ navigation, route }) => {
  const [selectedCountry, setSelectedCountry] = useState(route.params?.currentCountry || '');

  const handleSelect = (country) => {
    setSelectedCountry(country);
    navigation.goBack();
    route.params?.onSelectCountry(country); // Gọi callback để cập nhật quốc gia ở màn hình trước
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Country</Text>
      </View>

      <FlatList
        data={countries}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.countryItem,
              selectedCountry === item && styles.selectedCountry,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.countryText}>{item}</Text>
            {selectedCountry === item && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    fontSize: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedCountry: {
    backgroundColor: '#CCE5FF',
  },
  countryText: {
    fontSize: 16,
    color: '#333',
  },
  checkmark: {
    fontSize: 18,
    color: '#00BFFF',
  },
});

export default CountrySelectScreen;
