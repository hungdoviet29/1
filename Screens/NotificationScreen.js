import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = ({ route, navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState(null);

    // Fetch userId from AsyncStorage when the screen loads
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    setUserId(id);
                } else {
                    Alert.alert('Error', 'User information not found. Please log in again.');
                }
            } catch (error) {
                console.error('Error fetching userId:', error);
            }
        };

        fetchUserId();
    }, []);

    // Load notifications from server when the screen loads
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://192.168.3.105:3000/donhang/notifications/${userId}`);
                const data = await response.json();
                if (data.success) {
                    setNotifications(data.data); // Set notifications from server response
                } else {
                    console.error('Failed to fetch notifications:', data.message);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userId]);

    // Clear all notifications
    const clearNotifications = async () => {
        if (!userId) return;

        Alert.alert(
            'Clear All Notifications',
            'Are you sure you want to clear all notifications?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            await fetch(`http://<YOUR_SERVER_URL>/donhang/notifications/${userId}`, {
                                method: 'DELETE',
                            });
                            setNotifications([]); // Clear notifications from UI
                        } catch (error) {
                            console.error('Error clearing notifications:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Notifications</Text>
            {notifications.length > 0 ? (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.notificationItem}>
                            <Text style={styles.notificationText}>{item.message}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noNotifications}>No notifications available</Text>
            )}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearNotifications}
                >
                    <Text style={styles.buttonText}>Clear All</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    notificationItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
    noNotifications: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 30,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 2,
        marginRight: 10,
        alignItems: 'center',
        marginTop: 20, // Add this property to push the button higher
    marginBottom: 50,
    },
    clearButton: {
        backgroundColor: '#f44336',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 2,
        marginLeft: 10,
        alignItems: 'center',
        marginTop: 20, // Add this property to push the button higher
    marginBottom: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NotificationScreen;
