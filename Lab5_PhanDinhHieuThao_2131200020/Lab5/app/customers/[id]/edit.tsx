import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditCustomer() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCustomer = async () => {
        try {
            const res = await axios.get(`https://kami-backend-5rs0.onrender.com/customers/${id}`);
            setName(res.data.name);
            setPhone(res.data.phone);
        } catch (err) {
            console.log('Fetch error:', err);
            Alert.alert('Error', 'Unable to fetch customer data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!name || !phone) {
            Alert.alert('Validation', 'Please fill in all fields');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('loginToken');
            await axios.put(
                `https://kami-backend-5rs0.onrender.com/Customers/${id}`,
                { name, phone },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Alert.alert('Success', 'Customer updated');
            router.replace(`/customers/${id}`);
        } catch (err) {
            console.log('Update error:', err);
            Alert.alert('Error', 'Unable to update customer');
        }
    };


    useEffect(() => {
        fetchCustomer();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 40 }} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Customer name *</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter customer's name"
            />

            <Text style={styles.label}>Phone *</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, backgroundColor: '#fff' },
    label: { fontWeight: 'bold', marginTop: 16 },
    input: {
        backgroundColor: '#f1f1f1',
        padding: 12,
        borderRadius: 8,
        marginTop: 6,
    },
    button: {
        backgroundColor: '#ef476f',
        padding: 16,
        borderRadius: 10,
        marginTop: 32,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
