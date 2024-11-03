import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Arrow Icon and Title */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton}>
          <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Quản lí liên hệ</Text>
        {/* Placeholder for spacing */}
        <View style={{ width: 20 }} />
      </View>

      {/* Zalo & SDT Field */}
      <View style={styles.row}>
        <Text style={styles.label}>Zalo & SDT</Text>
        <TextInput style={styles.input} value="0981386666" />
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../acssets/but.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Email Field */}
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value="Lapstore@gmail.com" />
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../acssets/fix.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Address Field */}
      <View style={styles.row}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.address}>123 Phuong Canh - Nam Từ Liêm - Hà Nội</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../acssets/bin.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Map Image */}
      <Image source={require('../acssets/image.png')} style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Distributes items evenly
    marginBottom: 20,
  },
  backButton: {
    width: 20,
    height: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 20,  // Smaller title
    fontWeight: 'bold',
    textAlign: 'center',  // Center the text horizontally
    flex: 1,  // Ensures it takes up the full width of the available space between the icons
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  address: {
    flex: 2,
    fontSize: 16,
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  map: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
});

export default ContactScreen;
