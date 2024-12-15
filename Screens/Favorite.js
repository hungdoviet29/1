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
                const response = await axios.get(`http://10.24.25.222:3000/favorites/${userId}`);
                setFavoriteItems(response.data.favorites || []);
            } catch (error) {
                console.error('Lỗi khi tải danh sách yêu thích:', error.response || error.message);
                Alert.alert('Lỗi', 'Không thể tải danh sách yêu thích.');
            }
        };

        fetchFavorites();
    }, [navigation]);

    const handleRemoveFromFavorites = async (productId) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.');
                navigation.navigate('Login');
                return;
            }
            const response = await axios.delete(`http://10.24.25.222:3000/favorites/${userId}/${productId}`);

            if (response.status === 200) {
                setFavoriteItems((prevItems) => prevItems.filter((item) => item._id !== productId));
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
        <TouchableOpacity
            style={styles.favoriteItem}
            onPress={() => navigation.navigate('ProductScreen', { product: item })}
        >
            <Image source={{ uri: item.hinhAnh }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.ten}</Text>
                <Text style={styles.itemPrice}>{item.gia.toLocaleString()} VND</Text>
                <View style={styles.rating}>
                    <Text>⭐⭐⭐⭐</Text>
                    <Text style={styles.ratingText}>(4.5)</Text>
                </View>
                <View style={styles.descriptionRow}>
                    <View style={styles.descriptionItem}>
                        <Image 
                            source={require('../acssets/cpu.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.descriptionText}>{item.CPU}</Text>
                    </View>
                    <View style={styles.descriptionItem}>
                        <Image 
                            source={require('../acssets/RAM.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.descriptionText}>{item.RAM}</Text>
                    </View>
                </View>

                <View style={styles.descriptionRow}>
                    <View style={styles.descriptionItem}>
                        <Image 
                            source={require('../acssets/Card1.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.descriptionText}>{item.CardManHinh}</Text>
                    </View>
                    <View style={styles.descriptionItem}>
                        <Image 
                            source={require('../acssets/kichthuoc.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.descriptionText}>{item.KichThuocManHinh}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemoveFromFavorites(item._id)}
            >
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
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.favoriteContainer}
                numColumns={2}
                ListEmptyComponent={
                    <Text style={styles.emptyMessage}>
                        Chưa có sản phẩm nào trong danh sách yêu thích!
                    </Text>
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
        backgroundColor: '#F2F4FA',
        borderRadius: 10,
        padding: 16,
        margin: 8,
        maxWidth: '49%',
    },
    itemImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 8,
        alignSelf: 'center',
    },
    itemDetails: {},
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        fontSize: 15,
        color: '#FF0000',
        marginTop: 4,
    },
    descriptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    descriptionItem: {
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center', // Center content horizontally
    },
    iconImage: {
        width: 24,
        height: 24,
        marginBottom: 4,
        alignSelf: 'center', // Center the image
    },
    descriptionText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center', // Center text
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
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingText: {
        marginLeft: 5,
        color: '#888',
        fontSize: 16,
    },
});

export default FavoriteScreen;
