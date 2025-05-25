import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditService() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const fetchDetail = async () => {
        try {
            const response = await axios.get(`https://kami-backend-5rs0.onrender.com/services/${id}`);
            setName(response.data.name);
            setPrice(response.data.price.toString());
        } catch (e) {
            console.log("Error fetch:", e);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, []);

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('loginToken');
            await axios.put(`https://kami-backend-5rs0.onrender.com/services/${id}`, {
                name,
                price: Number(price),
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            Alert.alert('Updated', 'Service updated successfully');
            router.replace(`/services/${id}`);
        } catch (error) {
            console.log('Update error:', error);
            Alert.alert('Error', 'Failed to update');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Service name *</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Price *</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType='numeric' />

            <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontWeight: 'bold', marginTop: 16 },
    input: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16
    },
    button: {
        backgroundColor: '#ef476f',
        padding: 15,
        borderRadius: 10,
        marginTop: 24,
    },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
