import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Customer {
    _id: string;
    name: string;
    phone: string;
    totalMoney?: number;
    level?: 'Guest' | 'Member';
}

export default function CustomerScreen() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://kami-backend-5rs0.onrender.com/customers');
            const customersWithDefault = response.data.map((c: Customer) => ({
                ...c,
                totalMoney: c.totalMoney ?? 0,
                level: c.level ?? 'Guest',
            }));
            setCustomers(customersWithDefault);
        } catch (error) {
            console.log('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const renderItem = ({ item }: { item: Customer }) => (
        <TouchableOpacity
            style={styles.card}
            
            onPress={() => router.push(`/customers/${item._id as string}`)}
        >
            <View>
                <Text style={styles.label}><Text style={styles.bold}>Customer:</Text> {item.name}</Text>
                <Text style={styles.label}><Text style={styles.bold}>Phone:</Text> {item.phone}</Text>
                <Text style={styles.label}>
                    <Text style={styles.bold}>Total money:</Text>{' '}
                    <Text style={{ color: item.totalMoney! > 0 ? '#d43c63' : 'black' }}>
                        {item.totalMoney?.toLocaleString() ?? '0'} ₫
                    </Text>
                </Text>
            </View>
            <View style={styles.levelContainer}>
                <FontAwesome5
                    name="crown"
                    size={16}
                    color={item.level === 'Member' ? '#ffb703' : '#ccc'}
                />
                <Text style={styles.levelText}>{item.level}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#d43c63" />
            ) : (
                <FlatList
                    data={customers}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/add-customer')}
            >
                <FontAwesome5 name="plus" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#eee',
    },
    label: {
        marginBottom: 4,
    },
    bold: {
        fontWeight: 'bold',
    },
    levelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    levelText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#d43c63',
    },
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
