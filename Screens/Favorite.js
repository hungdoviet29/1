import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteScreen = () => {
    const navigation = useNavigation();
    const [favoriteItems, setFavoriteItems] = React.useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.');
                    navigation.navigate('Login');
                    return;
                }
                const response = await axios.get(`http://192.168.3.106:3000/favorites/${userId}`);
                setFavoriteItems(response.data.favorites || []);
            } catch (error) {
                console.error('Lỗi khi tải danh sách yêu thích:', error.response || error.message);
                Alert.alert('Lỗi', 'Không thể tải danh sách yêu thích.');
            }
        };

        fetchFavorites();
    }, []);

    const handleRemoveFromFavorites = async (productId) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.');
                navigation.navigate('Login');
                return;
            }
            // Gửi yêu cầu xóa sản phẩm khỏi yêu thích
            const response = await axios.delete(`http://192.168.3.106:3000/favorites/${userId}/${productId}`);

            if (response.status === 200) {
                // Cập nhật lại danh sách yêu thích trên giao diện
                setFavoriteItems(prevItems => prevItems.filter(item => item._id !== productId));
                Alert.alert('Thành công', 'Sản phẩm đã được xóa khỏi danh sách yêu thích');
            } else {
                Alert.alert('Lỗi', 'Không thể xóa sản phẩm khỏi danh sách yêu thích');
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm yêu thích:', error);
            Alert.alert('Lỗi', 'Không thể xóa sản phẩm khỏi danh sách yêu thích');
        }
    };
    const renderFavoriteItem = ({ item }) => (
        <TouchableOpacity style={styles.favoriteItem} onPress={() =>
            navigation.navigate('ProductScreen', { product: item })}>
            <Image source={{ uri: item.hinhAnh }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.ten}</Text>
                <Text style={styles.itemPrice}>{item.gia.toLocaleString()} VND</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFromFavorites(item._id)}>
                <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Danh sách yêu thích</Text>
            </View>

            <FlatList
                data={favoriteItems}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.favoriteContainer}
                numColumns={2} // Số cột hiển thị
                ListEmptyComponent={
                    <Text style={styles.emptyMessage}>Chưa có sản phẩm nào trong danh sách yêu thích!</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    favoriteContainer: {
        paddingHorizontal: 8,
        paddingTop: 20,
    },
    favoriteItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F2F4FA',
        borderRadius: 10,
        padding: 16,
        margin: 8,
        maxWidth: '48%', // Chiều rộng tối đa để chia đều cột
    },
    itemImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    itemDetails: {
        alignItems: 'center',
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    itemPrice: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    deleteText: {
        fontSize: 16,
        color: '#888',
    },
    emptyMessage: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default FavoriteScreen;
