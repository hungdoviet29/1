import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DirectMessaging = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: message }]);
      setMessage('');
    }
  };

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const handleAddImage = () => {
    // Placeholder function to handle adding an image
    console.log("Add image functionality will go here.");
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
          <Image source={require('../acssets/but.png')} style={styles.addButtonIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={message}
          onChangeText={setMessage}
          multiline={true}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageList: {
    paddingBottom: 90, // Increased to create space for the input area
  },
  messageContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    height: 150,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Space between button and input
  },
  addButtonIcon: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
    maxHeight: 80,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default DirectMessaging;
