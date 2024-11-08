import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const ProfileScreen = () => {
  // States to control the values and edit modes of each field
  const navigation = useNavigation(); // Sử dụng useNavigation để lấy đối tượng navigation

  const handleBackPress = () => {
    navigation.goBack(); // Dùng navigation.goBack() để quay lại màn hình trước
  };
  const [email, setEmail] = useState("Admin28043@gmail.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  
  const [password, setPassword] = useState("admin123456");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [phone, setPhone] = useState("09813862714");
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  return (
    <View style={styles.container}>
      
      {/* Header with Back Arrow and Title */}
      <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết hồ sơ</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={require('../acssets/hihi.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>NGUYỄN VĂN ADMIN</Text>
        <Text style={styles.profileId}>ID: 0336394558</Text>
      </View>

      {/* Editable Fields */}
      <View style={styles.fieldContainer}>
        
        {/* Email Field */}
        <View style={styles.fieldRow}>
          <Image source={require('../acssets/profile.png')} style={styles.fieldIcon} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.fieldInput}
              value={email}
              editable={isEditingEmail}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditingEmail(!isEditingEmail)}
            >
              <Image source={require('../acssets/but.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Password Field */}
        <View style={styles.fieldRow}>
          <Image source={require('../acssets/profile.png')} style={styles.fieldIcon} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.fieldInput}
              value={password}
              secureTextEntry
              editable={isEditingPassword}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditingPassword(!isEditingPassword)}
            >
              <Image source={require('../acssets/but.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Phone Number Field */}
        <View style={styles.fieldRow}>
          <Image source={require('../acssets/profile.png')} style={styles.fieldIcon} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.fieldInput}
              value={phone}
              editable={isEditingPhone}
              onChangeText={setPhone}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditingPhone(!isEditingPhone)}
            >
              <Image source={require('../acssets/but.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  // same style object as before
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    paddingTop: 10,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  profileContainer: {
    backgroundColor: '#A7D5FF',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileId: {
    fontSize: 16,
    color: '#555',
  },
  fieldContainer: {
    backgroundColor: '#A7D5FF',
    borderRadius: 20,
    padding: 20,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  fieldIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
  fieldInput: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingRight: 50,
  },
  editButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  signOutButton: {
    backgroundColor: '#5A5A5A',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  signOutText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    width: 20,
    height: 20,
  },
});

export default ProfileScreen;
