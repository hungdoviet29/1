import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EditPersonalInformation = ({ route, navigation }) => {
  const { userData } = route.params;
  const [name, setName] = useState(userData.name);
  const [nationality, setNationality] = useState(userData.nationality);

  const handlePress = (field) => {
    if (field === 'Họ và tên') {
      navigation.navigate('RenameScreen', {
        currentName: name,
        onSave: (newName) => setName(newName),
      });
    } else if (field === 'Ảnh đại diện') {
      Alert.alert(
        'Chọn Ảnh đại diện',
        '',
        [
          { text: 'Chụp Ảnh', onPress: () => console.log('Chụp ảnh') },
          { text: 'Chọn từ Album', onPress: () => console.log('Chọn từ Album') },
          { text: 'Hủy bỏ', style: 'cancel' },
        ],
        { cancelable: true }
      );
    } else if (field === 'Quốc tịch') {
      navigation.navigate('CountrySelectScreen', {
        currentCountry: nationality,
        onSelectCountry: (selectedCountry) => setNationality(selectedCountry),
      });
    } else {
      Alert.alert('Chỉnh sửa thông tin', `Chức năng chỉnh sửa ${field}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Edit Personal Information</Text>
      </View>

      <TouchableOpacity style={styles.infoItem1} onPress={() => handlePress('Ảnh đại diện')}>
        <Text style={styles.label}>Ảnh đại diện</Text>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoItem2} onPress={() => handlePress('Họ và tên')}>
        <Text style={styles.label}>Họ và tên</Text>
        <Text style={styles.value}>{name}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoItem2} onPress={() => handlePress('Quốc tịch')}>
        <Text style={styles.label}>Quốc tịch</Text>
        <Text style={styles.value}>{nationality}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoItem2} onPress={() => handlePress('Giới tính')}>
        <Text style={styles.label}>Giới tính</Text>
        <Text style={styles.value}>{userData.gender}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoItem3} onPress={() => handlePress('Số điện thoại')}>
        <Text style={styles.label}>Số điện thoại</Text>
        <Text style={styles.value}>{userData.phone}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoItem4} onPress={() => handlePress('Email')}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoItem4} onPress={() => handlePress('Ngày sinh')}>
        <Text style={styles.label}>Ngày sinh</Text>
        <Text style={styles.value}>{userData.birthDate}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.infoItem5} onPress={() => handlePress('Mật khẩu')}>
        <Text style={styles.label}>Mật khẩu</Text>
        <Text style={styles.value}>{userData.password}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    padding: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  infoItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 45,
    marginBottom: 45,
    width: '100%',
  },
  infoItem2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  infoItem3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
    marginTop: 35,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  infoItem4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  infoItem5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 35,
    width: '100%',
  },
  label: {
    fontSize: 16,
    padding: 10,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default EditPersonalInformation;
