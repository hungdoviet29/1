import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FilterScreen = () => {
    const [promotion, setPromotion] = useState(false);
    const [selectedSort, setSelectedSort] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { /* Logic quay lại màn hình trước */ }}>
                    <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Filter</Text>
            </View>

            {/* Lọc nhanh */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>LỌC NHANH</Text>
            </View>
            <TouchableOpacity style={styles.row} onPress={() => setPromotion(!promotion)}>
                <Text style={styles.optionText}>Khuyến mại</Text>
                <Image
                    source={promotion ? require('../acssets/checkbox-checked.png') : require('../acssets/checkbox-unchecked.png')}
                    style={styles.checkbox}
                />
            </TouchableOpacity>

            {/* Sắp xếp */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SẮP XẾP</Text>
            </View>
            {['Đề xuất (Mặc định)', 'Giá rẻ nhất', 'Bán chạy nhất', 'Đánh giá tốt'].map((item, index) => (
                <TouchableOpacity key={index} style={styles.row} onPress={() => setSelectedSort(item)}>
                    <Text style={styles.optionText}>{item}</Text>
                    <Image
                        source={selectedSort === item ? require('../acssets/radio-checked.png') : require('../acssets/radio-unchecked.png')}
                        style={styles.radio}
                    />
                </TouchableOpacity>
            ))}

            {/* Đánh giá */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ĐÁNH GIÁ</Text>
            </View>
            <View style={styles.ratingContainer}>
                {[3.5, 4.0, 4.5].map((rating, index) => (
                    <TouchableOpacity key={index} style={[styles.ratingBox, selectedRating === rating && styles.selectedRatingBox]} onPress={() => setSelectedRating(rating)}>
                        <Image source={require('../acssets/Star.png')} style={styles.star} />
                        <Text style={styles.ratingText}>{rating} trở lên</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Khoảng giá */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>KHOẢNG GIÁ</Text>
            </View>
            <View style={styles.priceRangeContainer}>
                <TouchableOpacity style={styles.priceBox}>
                    <Text>Tối thiểu</Text>
                </TouchableOpacity>
                <Text style={styles.arrow}>→</Text>
                <TouchableOpacity style={styles.priceBox}>
                    <Text>Tối đa</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.priceOptions}>
                {[1000000, 10000000, 100000000].map((price, index) => (
                    <TouchableOpacity key={index} style={styles.priceOption}>
                        <Text>0đ - {price.toLocaleString()}đ</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.submitButton}>
    <Text style={styles.submitButtonText}>Submit</Text>
</TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    icon: {
        width: 24,
        height: 24,
    },
    section: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#E0E0E0',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    checkbox: {
        width: 20,
        height: 20,
    },
    radio: {
        width: 20,
        height: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 16,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        width: '30%',
        justifyContent: 'center',
    },
    selectedRatingBox: {
        borderColor: '#6C63FF',
    },
    star: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    ratingText: {
        fontSize: 14,
        color: '#333',
    },
    priceRangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 16,
    },
    priceBox: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        alignItems: 'center',
    },
    arrow: {
        fontSize: 20,
        paddingHorizontal: 10,
    },
    priceOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 16,
    },
    priceOption: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    submitButton: {
        backgroundColor: '#6C63FF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 30,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FilterScreen;
