// ProductScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; // Import hành động từ cartSlice

const ProductScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params; // Lấy dữ liệu sản phẩm từ params

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch(); // Khởi tạo useDispatch

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity })); // Thêm sản phẩm vào giỏ hàng
        navigation.navigate('Cart'); // Điều hướng tới màn hình giỏ hàng
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../acssets/Vector.png')} style={styles.iconHeart} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Hình ảnh sản phẩm */}
                <Image source={{ uri: product.hinhAnh }} style={styles.productImage} />

                {/* Thông tin sản phẩm */}
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{product.HangSX}</Text>
                    <Text style={styles.productName}>{product.TenSP}</Text>
                    <Text style={styles.productPrice}>{product.gia.toLocaleString()} VND</Text>

                    {/* Đánh giá */}
                    <View style={styles.rating}>
                        <Text>⭐⭐⭐⭐</Text>
                        <Text style={styles.ratingText}>(4.5)</Text>
                    </View>

                    {/* Chọn số lượng */}
                    <View style={styles.quantityShareContainer}>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={handleDecreaseQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityNumber}>{quantity}</Text>
                            <TouchableOpacity onPress={handleIncreaseQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Mô tả */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.sectionTitle}>MÔ TẢ</Text>
                        <Text style={styles.descriptionText}>{product.MoTa}</Text>
                    </View>

                    {/* Nút thêm vào giỏ hàng */}
                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                        <Text style={styles.addToCartText}>THÊM VÀO GIỎ HÀNG</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
    contentContainer: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconHeart: {
        width: 24,
        height: 24,
        tintColor: '#FF6B6B',
    },
    productImage: {
        width: '100%',
        height: 240,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    productInfo: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
    },
    productTitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 4,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    productPrice: {
        fontSize: 22,
        color: '#4A90E2',
        marginBottom: 16,
        fontWeight: 'bold',
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
    quantityShareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    quantityButton: {
        paddingHorizontal: 12,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    quantityNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#333',
    },
    shareButton: {
        backgroundColor: '#f5f7fb',
        borderRadius: 50,
        padding: 12,
    },
    iconShare: {
        width: 24,
        height: 24,
    },
    descriptionContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    descriptionText: {
        fontSize: 14,
        color: '#888',
        lineHeight: 20,
    },
    addToCartButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 25,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
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
});

export default ProductScreen;
