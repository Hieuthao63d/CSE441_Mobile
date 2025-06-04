import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Dropdown } from 'react-native-element-dropdown';

interface Customer {
    label: string;
    value: string;
}

interface Service {
    _id: string;
    name: string;
    price?: number;
    checked: boolean;
    quantity: number;
    userID: string;
}

export default function AddTransaction() {
    const router = useRouter();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

    useEffect(() => {
        fetchCustomers();
        fetchServices();
    }, []);

    const fetchCustomers = async () => {
        const res = await axios.get('https://kami-backend-5rs0.onrender.com/customers');
        const data = res.data.map((c: any) => ({
            label: c.name,
            value: c._id,
        }));
        setCustomers(data);
    };

    const fetchServices = async () => {
        const res = await axios.get('https://kami-backend-5rs0.onrender.com/services');
        const data = res.data.map((s: any) => ({
            ...s,
            checked: false,
            quantity: 1,
            userID: '',
        }));
        setServices(data);
    };

    const toggleService = (index: number) => {
        const updated = [...services];
        updated[index].checked = !updated[index].checked;
        setServices(updated);
    };

    const handleQuantity = (index: number, delta: number) => {
        const updated = [...services];
        updated[index].quantity = Math.max(1, updated[index].quantity + delta);
        setServices(updated);
    };

    const handleSubmit = async () => {

        const token = await AsyncStorage.getItem('loginToken');
        console.log("Token being used:", token); // thêm dòng này
        if (!token) {
            Alert.alert('Error', 'Login token is missing.');
            return;
        }

        const selected = services
            .filter((s) => s.checked)
            .map((s) => ({
                _id: s._id,
                quantity: s.quantity,
                userID: s.userID || 'default-user',
            }));

        if (!selectedCustomer || selected.length === 0) {
            Alert.alert('Missing Info', 'Select customer and at least one service');
            return;
        }

        try {
            const res = await axios.post(
                'https://kami-backend-5rs0.onrender.com/transactions',
                {
                    customerId: selectedCustomer,
                    services: selected,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            router.replace(`/transactions/${res.data._id}`);
        } catch (e) {
            console.log('Submit error:', e);
            Alert.alert('Error', 'Failed to add transaction');
        }
    };

    const total = services
        .filter((s) => s.checked)
        .reduce((sum, s) => sum + (s.price || 0) * s.quantity, 0);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Customer *</Text>
            <Dropdown
                data={customers}
                value={selectedCustomer}
                labelField="label"
                valueField="value"
                placeholder="Select customer"
                onChange={(item: Customer) => setSelectedCustomer(item.value)}
                style={styles.dropdown}
            />

            {services.map((s: Service, i: number) => (
                <View key={s._id} style={styles.serviceCard}>
                    <BouncyCheckbox
                        isChecked={s.checked}
                        onPress={() => toggleService(i)}
                        fillColor="#ef476f"
                        text={s.name}
                    />

                    {s.checked && (
                        <View style={styles.serviceDetails}>
                            <View style={styles.qtyRow}>
                                <TouchableOpacity onPress={() => handleQuantity(i, -1)}>
                                    <Text style={styles.qtyBtn}>-</Text>
                                </TouchableOpacity>
                                <Text>{s.quantity}</Text>
                                <TouchableOpacity onPress={() => handleQuantity(i, 1)}>
                                    <Text style={styles.qtyBtn}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.price}>
                                Price: {s.price?.toLocaleString() ?? '0'} ₫
                            </Text>
                        </View>
                    )}
                </View>
            ))}

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>See summary: ({total.toLocaleString()} ₫)</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff' },
    label: { fontWeight: 'bold', marginBottom: 6 },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    serviceCard: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    serviceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 30,
        marginTop: 6,
    },
    qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    qtyBtn: {
        fontSize: 20,
        width: 30,
        textAlign: 'center',
        color: '#ef476f',
    },
    price: { color: '#d43c63', fontWeight: 'bold' },
    submitBtn: {
        backgroundColor: '#ef476f',
        padding: 16,
        borderRadius: 10,
        marginTop: 24,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
