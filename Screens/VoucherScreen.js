import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng icon cho nút Back (cần cài thư viện này)

const VoucherScreen = ({ navigation }) => {
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const vouchers = [
        {
            id: 1,
            type: 'free_shipping',
            title: 'Giảm tối đa ₫300k',
            description: 'Đơn tối thiểu ₫0',
            condition: 'Đang hết nhanh • hết hạn trong 2 ngày',
        },
        {
            id: 2,
            type: 'discount',
            title: 'Giảm 10% Giảm tối đa ₫100k',
            description: 'Đơn tối thiểu ₫500k',
            condition: 'Đã dùng 73% • hết hạn 07.12.2024',
        },
        {
            id: 3,
            type: 'mall_discount',
            title: 'Giảm 8% Giảm tối đa ₫300k',
            description: 'Đơn tối thiểu ₫350k',
            condition: 'HSD: 06.12.2024',
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header với nút Back */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={require('../acssets/BackButton.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chọn Lapstore Voucher</Text>
            </View>

            {/* Danh sách Voucher */}
            <ScrollView style={styles.scrollContainer}>
                {vouchers.map((voucher) => (
                    <TouchableOpacity
                        key={voucher.id}
                        style={[
                            styles.voucherItem,
                            selectedVoucher === voucher.id && styles.selectedVoucher,
                        ]}
                        onPress={() => setSelectedVoucher(voucher.id)}
                    >
                        <View style={styles.voucherContent}>
                            <Text style={styles.voucherTitle}>{voucher.title}</Text>
                            <Text style={styles.voucherDescription}>{voucher.description}</Text>
                            <Text style={styles.voucherCondition}>{voucher.condition}</Text>
                        </View>
                        <View style={styles.radioButton}>
                            {selectedVoucher === voucher.id && (
                                <View style={styles.radioSelected}></View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.selectedInfo}>
                    {selectedVoucher
                        ? `1 Voucher đã được chọn`
                        : 'Chưa có voucher nào được chọn'}
                </Text>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.confirmButtonText}>Đồng ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
    },
    backButton: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContainer: {
        flex: 1,
        padding: 16,
    },
    voucherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 16,
    },
    selectedVoucher: {
        borderColor: '#f68b1e',
    },
    voucherContent: {
        flex: 1,
    },
    voucherTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    voucherDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    voucherCondition: {
        fontSize: 12,
        color: '#999',
    },
    radioButton: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        width: 12,
        height: 12,
        backgroundColor: '#f68b1e',
        borderRadius: 6,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedInfo: {
        fontSize: 14,
        color: '#666',
    },
    confirmButton: {
        backgroundColor: '#f68b1e',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    confirmButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default VoucherScreen;
