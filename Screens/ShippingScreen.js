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

        // Navigate to OrderScreen and pass shipping info along with total cost
        navigation.navigate('OrderScreen', { shippingInfo, totalCost: route.params?.totalCost });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shipping Information</Text>
            <TextInput 
                style={[styles.input, { borderColor: '#007AFF' }]}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                style={[styles.input, { borderColor: '#8A2BE2' }]}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput 
                style={[styles.input, { borderColor: '#8A2BE2' }]}
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
        justifyContent: 'center', // Center elements on the screen
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        borderWidth: 2,
        padding: 15,  // Increase padding for larger input box
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 18,  // Larger font size for bigger text
    },
    continueButton: {
        backgroundColor: '#6C63FF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    continueText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ShippingScreen;
