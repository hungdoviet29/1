import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const RenameScreen = ({ route, navigation }) => {
  const { currentName, onSave } = route.params;
  const [name, setName] = useState(currentName);

  const handleSave = () => {
    onSave(name); // Gọi hàm callback để cập nhật tên trong màn hình trước
    navigation.goBack(); // Quay lại màn hình trước
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Rename</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveIcon}>✓</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter new name"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    textAlign: 'center',
    flex: 1,
  },
  saveButton: {
    marginLeft: 10,
  },
  saveIcon: {
    fontSize: 24,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#00BFFF',
    padding: 10,
  },
  input: {
    fontSize: 18,
    color: '#333',
  },
});

export default RenameScreen;
