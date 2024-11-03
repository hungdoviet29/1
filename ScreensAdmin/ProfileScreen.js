import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết hồ sơ</Text>
      </View>

      
      <View style={styles.profileContainer}>
        <Image source={require('../acssets/hihi.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>NGUYỄN VĂN ADMIN</Text>
        <Text style={styles.profileId}>ID: 0336394558</Text>
      </View>

      
      <View style={styles.fieldContainer}>
        
       
        <View style={styles.fieldRow}>
          <Image source={require('../acssets/profile.png')} style={styles.fieldIcon} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.fieldInput}
              value="Admin28043@gmail.com"
              editable={false}
            />
            <TouchableOpacity style={styles.editButton}>
              <Image source={require('../acssets/but.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

       
        <View style={styles.fieldRow}>
          <Image source={require('../acssets/profile.png')} style={styles.fieldIcon} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.fieldInput}
              value="admin123456"
              secureTextEntry
              editable={false}
            />
            <TouchableOpacity style={styles.editButton}>
              <Image source={require('../acssets/but.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

       
        <View style={styles.fieldRow}>
          <Image source={require('../acssets/profile.png')} style={styles.fieldIcon} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.fieldInput}
              value="09813862714"
              editable={false}
            />
            <TouchableOpacity style={styles.editButton}>
              <Image source={require('../acssets/but.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProfileScreen;
