import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
const ShippingScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const route = useRoute();
    const handleContinue = () => {
        if (!name || !address || !phone) {
            Alert.alert('Error', 'Please fill in all the fields');
            return;
        }
    
        const shippingInfo = {
            name,
            address,
            phone,
        };
    
        // Chuyển đến OrderScreen và truyền thông tin giao hàng cùng tổng tiền
        navigation.navigate('OderScreen', { shippingInfo, totalCost: route.params?.totalCost });
    };
    
    
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shipping Information</Text>
            <TextInput 
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput 
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueText}>Continue to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    continueButton: {
        backgroundColor: '#6C63FF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    continueText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ShippingScreen;
