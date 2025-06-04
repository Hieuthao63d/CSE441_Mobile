import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Transaction {
    _id: string;
    createdAt: string;
    customer?: { name: string };
    services: { name: string; price?: number }[];
    total: number;
    status?: string;
}

export default function TransactionScreen() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('https://kami-backend-5rs0.onrender.com/transactions');
            const transactionsWithTotal = response.data.map((t: any) => {
                const total = t.services?.reduce(
                    (sum: number, s: any) => sum + (s.price || 0),
                    0
                );
                return { ...t, total };
            });
            setTransactions(transactionsWithTotal);
        } catch (error) {
            console.log('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const formatDate = (iso: string) => {
        const date = new Date(iso);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    };

    const renderItem = ({ item }: { item: Transaction }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/transactions/${item._id}`)}
        >
            <Text style={styles.billId}>
                {item._id} - {formatDate(item.createdAt)}
                {item.status === 'Cancelled' && (
                    <Text style={styles.cancelled}> - Cancelled</Text>
                )}
            </Text>

            <Text style={styles.serviceList}>
                {item.services.map((s) => `- ${s.name}`).join('\n')}
            </Text>

            <Text style={styles.total}>
                {(item.total ?? 0).toLocaleString()} ₫
            </Text>

            <Text style={styles.customer}>
                Customer: {item.customer?.name || 'N/A'}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#d43c63" />
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/transactions/add-transaction')}
            >
                <FontAwesome5 name="plus" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    card: {
        backgroundColor: '#f8f8f8',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    billId: { fontWeight: 'bold', marginBottom: 6 },
    cancelled: { color: 'red', fontWeight: 'bold' },
    serviceList: { fontSize: 14, marginBottom: 6, color: '#333' },
    total: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#d43c63',
        marginBottom: 4,
    },
    customer: { color: '#666', fontSize: 13 },
    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#ef476f',
        padding: 16,
        borderRadius: 50,
        elevation: 4,
    },
});
