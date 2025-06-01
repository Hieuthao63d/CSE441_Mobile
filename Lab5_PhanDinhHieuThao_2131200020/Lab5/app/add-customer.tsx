import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AddCustomer() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const router = useRouter();

    const handleAdd = async () => {
        if (!name || !phone) {
            Alert.alert('Error', 'Please enter both name and phone number');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('loginToken');
            await axios.post(
                'https://kami-backend-5rs0.onrender.com/customers',
                { name, phone },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Alert.alert('Success', 'Customer added');
            router.replace('/customer');
        } catch (error) {
            console.log('Add customer error:', error);
            Alert.alert('Error', 'Failed to add customer');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Customer name *</Text>
            <TextInput
                style={styles.input}
                placeholder="Input your customer's name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Phone *</Text>
            <TextInput
                style={styles.input}
                placeholder="Input phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontWeight: 'bold', marginBottom: 6, marginTop: 16 },
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
