import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DirectMessaging = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddImage = () => {
    console.log("Add image functionality will go here.");
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageRow, item.sender === 'user' ? styles.userMessageRow : styles.otherMessageRow]}>
      <Image
        source={{ uri: 'https://example.com/avatar.jpg' }} // Replace with actual avatar source
        style={styles.avatar}
      />
      <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
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

      {/* Centered Input Section */}
      <View style={styles.centeredInputContainer}>
        <Image source={{ uri: 'https://example.com/avatar.jpg' }} style={styles.avatarOnInput} />
        
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    left: 10,
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
    paddingVertical: 10,
    paddingBottom: 150, // Leave space for input area
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  centeredInputContainer: {
    position: 'absolute',
    bottom: '10%',  // Adjusted to place it in the middle of the screen
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  avatarOnInput: {
    width: 40,
    height: 40,
    borderRadius: 20,
   
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    marginHorizontal: 8,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default DirectMessaging;
