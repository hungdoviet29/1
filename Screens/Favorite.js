import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions'; // Đảm bảo đường dẫn chính xác
import { useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
    const navigation = useNavigation();
    // Lấy danh sách sản phẩm yêu thích từ Redux
    const favoriteItems = useSelector(state => state.favorites.favorites) || [];
    const dispatch = useDispatch();

    // Hàm thêm tất cả sản phẩm vào giỏ hàng
    const handleAddAllToCart = () => {
        if (favoriteItems.length === 0) {
            alert("Không có sản phẩm nào trong danh sách yêu thích!");
            return;
        }

        favoriteItems.forEach(item => {
            dispatch(addToCart({ ...item, quantity: 1 })); // Thay đổi nếu bạn có thuộc tính số lượng
            navigation.navigate('Cart');
        });

        alert("Đã thêm tất cả sản phẩm vào giỏ hàng!");
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { /* Logic quay lại màn hình trước */ }}>
                    <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Favorite</Text>
            </View>

            <ScrollView contentContainerStyle={styles.favoriteContainer}>
                {/* Danh sách sản phẩm yêu thích */}
                {favoriteItems.length === 0 ? (
                    <Text style={styles.emptyMessage}>Chưa có sản phẩm nào trong danh sách yêu thích!</Text>
                ) : (
                    favoriteItems.map(item => (
                        <View key={item._id} style={styles.favoriteItem}>
                            <Image source={{ uri: item.hinhAnh }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.ten}</Text>
                                {/* <Text style={styles.itemCollection}>GEETA COLLECTION</Text> */}
                                <Text style={styles.itemPrice}>{item.gia.toLocaleString()} VND</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.arrow}>➔</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Nút thêm tất cả vào giỏ hàng */}
            <View style={styles.addToCartBar}>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddAllToCart}>
                    <Text style={styles.addToCartText}>ADD ALL TO CART</Text>
                </TouchableOpacity>
            </View>

            {/* Thanh điều hướng dưới cùng */}
            <View style={styles.bottomNavigation}>
                <TouchableOpacity>
                    <Image source={require('../acssets/home.png')} style={styles.iconNav} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../acssets/BasketIcon.png')} style={styles.iconNav} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../acssets/Vector.png')} style={styles.iconNav} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../acssets/profile.png')} style={styles.iconNav} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    favoriteContainer: {
        paddingHorizontal: 16,
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F4FA',
        borderRadius: 10,
        marginVertical: 10,
        padding: 16,
    },
    itemImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    itemCollection: {
        fontSize: 12,
        color: '#888',
        marginBottom: 8,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    arrow: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    addToCartBar: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    addToCartButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 25,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    addToCartText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
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
