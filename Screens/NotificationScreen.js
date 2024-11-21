import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = ({ route, navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const { message } = route.params || {};
    const [userId, setUserId] = useState(null);

    // Lấy userId từ AsyncStorage khi màn hình được hiển thị
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    setUserId(id);
                } else {
                    Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy userId:', error);
            }
        };

        fetchUserId();
    }, []);

    // Load thông báo từ AsyncStorage khi màn hình được hiển thị
    useEffect(() => {
        const loadNotifications = async () => {
            if (!userId) return; // Chỉ tải khi có userId

            try {
                const storedNotifications = await AsyncStorage.getItem(`notifications_${userId}`);
                if (storedNotifications) {
                    setNotifications(JSON.parse(storedNotifications));
                }
            } catch (error) {
                console.error('Lỗi khi tải thông báo:', error);
            }
        };

        loadNotifications();
    }, [userId]);

    // Lưu thông báo mới khi có
    useEffect(() => {
        if (message && userId) {
            const addNotification = async () => {
                try {
                    // Lấy thông báo cũ từ AsyncStorage theo userId
                    const storedNotifications = await AsyncStorage.getItem(`notifications_${userId}`);
                    const currentNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];

                    // Tạo danh sách thông báo mới
                    const newNotifications = [
                        ...currentNotifications, // Thêm thông báo cũ
                        { id: Date.now(), text: message }, // Thêm thông báo mới
                    ];

                    // Cập nhật state và lưu vào AsyncStorage
                    setNotifications(newNotifications);
                    await AsyncStorage.setItem(
                        `notifications_${userId}`, // Lưu thông báo theo userId
                        JSON.stringify(newNotifications)
                    );
                } catch (error) {
                    console.error('Lỗi khi lưu thông báo:', error);
                }
            };

            addNotification();
        }
    }, [message, userId]);

    // Xóa tất cả thông báo
    const clearNotifications = async () => {
        if (!userId) return;

        Alert.alert(
            'Xóa tất cả thông báo',
            'Bạn có chắc chắn muốn xóa tất cả thông báo?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem(`notifications_${userId}`);
                            setNotifications([]); // Cập nhật state
                        } catch (error) {
                            console.error('Lỗi khi xóa thông báo:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông báo của bạn</Text>
            {notifications.length > 0 ? (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.notificationItem}>
                            <Text style={styles.notificationText}>{item.text}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noNotifications}>Không có thông báo nào</Text>
            )}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.backButtonText}>Quay lại trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearNotifications}
                >
                    <Text style={styles.clearButtonText}>Xóa tất cả thông báo</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    notificationItem: {
        backgroundColor: '#e9ecef',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
    noNotifications: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#f68b1e',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default NotificationScreen;
