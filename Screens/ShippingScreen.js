import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShippingScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSavedShippingInfo = async () => {
            try {
                const savedShippingInfo = await AsyncStorage.getItem('shippingInfo');
                if (savedShippingInfo) {
                    const parsedInfo = JSON.parse(savedShippingInfo);
                    setName(parsedInfo.name);
                    setAddress(parsedInfo.address);
                    setPhone(parsedInfo.phone);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin giao hàng:', error);
            }
        };

        getSavedShippingInfo();
    }, []);

    const handleSaveShippingInfo = async () => {
        if (!name || !address || !phone) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin giao hàng');
            return;
        }

        const shippingInfo = { name, address, phone };

        try {
            await AsyncStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));

            // Chuyển sang CheckoutScreen với thông tin giao hàng và tổng tiền
            navigation.navigate('OderScreen', { shippingInfo });
        } catch (error) {
            console.error('Lỗi khi lưu thông tin giao hàng:', error);
            Alert.alert('Lỗi', 'Không thể lưu thông tin giao hàng. Vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tên"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <Button title="Lưu và Tiếp tục" onPress={handleSaveShippingInfo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
        padding: 10,
        fontSize: 16,
    },
});

export default ShippingScreen;
