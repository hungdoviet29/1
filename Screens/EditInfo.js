import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditInfo = () => {
  const navigation = useNavigation();
  const [editingField, setEditingField] = useState(null); // Track the field being edited
  const [inputValue, setInputValue] = useState(''); // Track input value for the field

  const handleEditStart = (field) => {
    setEditingField(field);
    setInputValue(''); // Set to the current value if you have default values
  };

  const handleSave = () => {
    alert(`${editingField} updated to: ${inputValue}`);
    setEditingField(null); // End editing
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.profileContainer}>
          <Image source={require('../acssets/profile.png')} style={styles.avatar} />
          <TouchableOpacity style={styles.editIconContainer} onPress={() => handleEditStart("Profile Picture")}>
            <Image source={require('../acssets/fix.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>

        {/* Mapping fields to create editable items */}
        {["Họ và tên", "Email", "Số điện thoại", "Địa chỉ", "Ngày sinh", "Giới tính", "Mật khẩu", "Quốc tịch"].map((item) => (
          <View key={item} style={styles.fieldContainer}>
            {editingField === item ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter new ${item}`}
                  value={inputValue}
                  onChangeText={setInputValue}
                />
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.fieldText}>{item}</Text>
                <TouchableOpacity onPress={() => handleEditStart(item)}>
                  <Image source={require('../acssets/fix.png')} style={styles.editIcon} />
                </TouchableOpacity>
              </>
            )}
          </View>
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
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: 20,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  saveButtonText: {
    color: '#FFF',
  },
});

export default EditInfo;
