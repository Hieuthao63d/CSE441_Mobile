import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AddServiceScreen() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const router = useRouter();

    const handleAdd = async () => {
        if (!name || !price) {
            Alert.alert('Error', 'Please enter both service name and price.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('loginToken');

            await axios.post(
                'https://kami-backend-5rs0.onrender.com/services',
                { name, price: Number(price) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Alert.alert('Success', 'Service added successfully');
            router.replace('/');
        } catch (error) {
            console.log('Add error:', error);
            Alert.alert('Failed', 'Could not add service');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Service name *</Text>
            <TextInput
                placeholder="Input a service name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Price *</Text>
            <TextInput
                placeholder="0"
                keyboardType="numeric"
                style={styles.input}
                value={price}
                onChangeText={setPrice}
            />

            <TouchableOpacity onPress={handleAdd} style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#f6f6f6',
        padding: 12,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#ef476f',
        marginTop: 32,
        padding: 16,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
