import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditInfo = () => {
  const navigation = useNavigation();

  const handleEdit = (field) => {
    // Navigate to a detailed edit screen or handle the edit logic here
    alert(`Chỉnh sửa ${field}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.profileContainer}>
          <Image source={require('../acssets/profile.png')} style={styles.avatar} />
          <TouchableOpacity style={styles.editIconContainer} onPress={() => handleEdit("Profile Picture")}>
            <Image source={require('../acssets/fix.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>

        {["Họ và tên", "Email", "Số điện thoại", "Địa chỉ", "Ngày sinh", "Giới tính", "Mật khẩu", "Quốc tịch"].map((item) => (
          <TouchableOpacity key={item} style={styles.fieldContainer} onPress={() => handleEdit(item)}>
            <Text style={styles.fieldText}>{item}</Text>
            <Image source={require('../acssets/fix.png')} style={styles.editIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Optional: Adds padding at the bottom of the scroll view
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 20,
  },
  editIcon: {
    width: 16,
    height: 16,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '90%',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  fieldText: {
    fontSize: 16,
  },
});

export default EditInfo;
