import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions'; // Đảm bảo đường dẫn chính xác
import { useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
    const navigation = useNavigation();
    const favoriteItems = useSelector(state => state.favorites.favorites) || [];
    const dispatch = useDispatch();

    const handleAddAllToCart = () => {
        if (favoriteItems.length === 0) {
            alert("Không có sản phẩm nào trong danh sách yêu thích!");
            return;
        }

        favoriteItems.forEach(item => {
            dispatch(addToCart({ ...item, quantity: 1 }));
            navigation.navigate('Cart');
        });

        alert("Đã thêm tất cả sản phẩm vào giỏ hàng!");
    };

    const renderFavoriteItem = ({ item }) => (
        <View style={styles.favoriteItem}>
            {/* <TouchableOpacity onPress={()=> navigation.navigate('Buy')}> */}
            <Image source={{ uri: item.hinhAnh }} style={styles.itemImage} />
            {/* </TouchableOpacity > */}
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.ten}</Text>
                <Text style={styles.itemPrice}>{item.gia.toLocaleString()} USD</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Favorite</Text>
                <TouchableOpacity onPress={() => { /* Logic để thực hiện chức năng yêu thích */ }}>
                    <Image source={require('../acssets/Vector.png')} style={styles.headerIcon} />
                </TouchableOpacity>
            </View>

            {/* Danh sách sản phẩm yêu thích theo dạng lưới */}
            <FlatList
                data={favoriteItems}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item._id}
                numColumns={2}
                contentContainerStyle={styles.favoriteContainer}
                ListEmptyComponent={<Text style={styles.emptyMessage}>Chưa có sản phẩm nào trong danh sách yêu thích!</Text>}
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
        fontSize: 34,
        fontWeight: 'bold',
        color: '#333',
        bottom: 30,
    },
    headerIcon: {
        position: 'absolute',
        left: 10,
        width: 27,
        height: 26,
        bottom:15 
    },
    favoriteContainer: {
        paddingHorizontal: 16,
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
        maxWidth: '48%', // Để đảm bảo mỗi hàng hiển thị 2 sản phẩm
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
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 30,
        backgroundColor: '#f1f1f1',
        borderRadius: 30,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    iconNav: {
        width: 24,
        height: 24,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default FavoriteScreen;
