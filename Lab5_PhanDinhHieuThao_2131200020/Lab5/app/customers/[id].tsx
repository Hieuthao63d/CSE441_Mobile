import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomerDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [customer, setCustomer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchCustomer = async () => {
        try {
            const res = await axios.get(
                `https://kami-backend-5rs0.onrender.com/customers/${id}`
            );
            setCustomer(res.data);
        } catch (err) {
            console.log('Error fetching customer:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (iso: string) => {
        const date = new Date(iso);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    };

    const formatCurrency = (v: number) =>
        (v ?? 0).toLocaleString('vi-VN') + ' ₫';

    const handleDelete = () => {
        Alert.alert(
            "Delete Customer",
            "Are you sure you want to delete this customer? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('loginToken');
                            await axios.delete(
                                `https://kami-backend-5rs0.onrender.com/Customers/${id}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            Alert.alert("Success", "Customer deleted");
                            router.replace('/customer');
                        } catch (err) {
                            console.log("Delete error:", err);
                            Alert.alert("Error", "Could not delete customer");
                        }
                    },
                },
            ]
        );
    };


    useEffect(() => {
        fetchCustomer();
    }, []);

    if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
    if (!customer) return <Text style={{ padding: 20 }}>Customer not found</Text>;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>General information</Text>
            <View style={styles.box}>
                <Row label="Name:" value={customer.name} />
                <Row label="Phone:" value={customer.phone} />
                <Row
                    label="Total spent:"
                    value={formatCurrency(customer.totalMoney)}
                    highlight
                />
                <Row label="Time:" value={formatDate(customer.createdAt)} />
                <Row label="Last update:" value={formatDate(customer.updatedAt)} />
            </View>

            <Text style={styles.sectionTitle}>Transaction history</Text>
            <View style={styles.box}>
                {customer.transactions?.map((t: any, index: number) => (
                    <View key={index} style={styles.transactionCard}>
                        <Text style={styles.transHeader}>
                            {t._id} - {formatDate(t.createdAt)}
                        </Text>
                        <Text style={styles.transServices}>
                            {t.services.map((s: any) => `- ${s.name}`).join('\n')}
                        </Text>
                        <Text style={styles.transTotal}>{formatCurrency(t.total)}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#06d6a0' }]}
                    onPress={() => router.push(`/customers/${id}/edit`)}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#ef476f' }]}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

function Row({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <View style={styles.row}>
            <Text style={[styles.label]}>{label}</Text>
            <Text style={[styles.value, highlight && styles.highlight]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff', flex: 1 },
    sectionTitle: {
        fontWeight: 'bold',
        color: '#d43c63',
        marginTop: 16,
        marginBottom: 8,
    },
    box: {
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    label: { color: '#444' },
    value: { color: '#222', fontWeight: 'bold' },
    highlight: { color: '#d43c63', fontWeight: 'bold' },
    transactionCard: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    transHeader: { fontWeight: 'bold', marginBottom: 4 },
    transServices: { color: '#555', fontSize: 13 },
    transTotal: {
        marginTop: 4,
        color: '#d43c63',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        paddingHorizontal: 10,
        marginBottom: 40,
    },
    button: {
        flex: 1,
        marginHorizontal: 6,
        paddingVertical: 14,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
});
