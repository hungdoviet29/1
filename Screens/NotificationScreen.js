import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList, 
    Alert, 
    ActivityIndicator, 
    RefreshControl 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [isRefreshing, setIsRefreshing] = useState(false); // Pull-to-refresh state

    // Fetch userId from AsyncStorage when the screen loads
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    setUserId(id);
                    fetchNotifications(id); // Fetch notifications when userId is set
                } else {
                    Alert.alert('Error', 'User information not found. Please log in again.');
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching userId:', error);
                setIsLoading(false);
            }
        };

        fetchUserId();
    }, []);

    // Function to fetch notifications from server
    const fetchNotifications = async (id) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://172.20.10.6:3000/donhang/notifications/${id}`);
            const data = await response.json();
            if (data.success) {
                setNotifications(data.data); // Set notifications from server response
            } else {
                console.error('Failed to fetch notifications:', data.message);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // Pull-to-refresh functionality
    const handleRefresh = async () => {
        if (!userId) return;
        setIsRefreshing(true);
        await fetchNotifications(userId);
        setIsRefreshing(false);
    };

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
                            await fetch(`http://172.20.10.6:3000/donhang/notifications/${userId}`, {
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
            {isLoading ? (
                <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
            ) : notifications.length > 0 ? (
<FlatList
    data={notifications}
    keyExtractor={(item) => item._id.toString()}
    renderItem={({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
            {/* Hiển thị lý do hủy nếu có */}
            {item.message.toLowerCase().includes('đã được hủy'.toLowerCase()) && (
                <Text style={styles.cancelReasonText}>
                    {item.reason
                        ? `Lý do hủy: ${item.reason}`
                        : 'Không có lý do hủy được cung cấp.'}
                </Text>
            )}
        </View>
    )}
/>



            ) : (
                <Text style={styles.noNotifications}>No notifications available</Text>
            )}
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
    loadingIndicator: {
        marginTop: 20,
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
    cancelReasonText: {
        fontSize: 14,
        color: '#f44336',
        marginTop: 8,
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
    },
    clearButton: {
        backgroundColor: '#f44336',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 2,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NotificationScreen;
