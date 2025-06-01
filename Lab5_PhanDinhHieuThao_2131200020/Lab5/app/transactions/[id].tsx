import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import axios from 'axios';

export default function TransactionDetail() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchDetail = async () => {
        try {
            const res = await axios.get(
                `https://kami-backend-5rs0.onrender.com/transactions/${id}`
            );
            setData(res.data);
        } catch (error) {
            console.log('Error fetching transaction detail:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, []);

    const formatCurrency = (num: number) =>
        (num ?? 0).toLocaleString('vi-VN') + ' ₫';

    if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
    if (!data) return <Text style={{ padding: 20 }}>Transaction not found.</Text>;

    const total = data.services?.reduce(
        (sum: number, s: any) => sum + (s.price || 0) * (s.quantity || 1),
        0
    );
    const discount = data.discount ?? 0;
    const final = total - discount;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>General information</Text>
            <View style={styles.box}>
                <Row label="Transaction code" value={data._id} />
                <Row
                    label="Customer"
                    value={`${data.customer?.name ?? 'N/A'} - ${data.customer?.phone ?? ''}`}
                />
                <Row
                    label="Creation time"
                    value={new Date(data.createdAt).toLocaleString()}
                />
            </View>

            <Text style={styles.sectionTitle}>Services list</Text>
            <View style={styles.box}>
                {data.services.map((s: any, i: number) => (
                    <View key={i} style={styles.serviceRow}>
                        <Text style={styles.serviceName}>
                            {s.name} <Text style={styles.quantity}>x{s.quantity ?? 1}</Text>
                        </Text>
                        <Text>{formatCurrency((s.price ?? 0) * (s.quantity ?? 1))}</Text>
                    </View>
                ))}
                <Row label="Total" value={formatCurrency(total)} />
            </View>

            <Text style={styles.sectionTitle}>Cost</Text>
            <View style={styles.box}>
                <Row label="Amount of money" value={formatCurrency(total)} />
                <Row label="Discount" value={`- ${formatCurrency(discount)}`} />
                <Row
                    label="Total payment"
                    value={formatCurrency(final)}
                    bold
                    highlight
                />
            </View>
        </ScrollView>
    );
}

function Row({
    label,
    value,
    bold,
    highlight,
}: {
    label: string;
    value: string;
    bold?: boolean;
    highlight?: boolean;
}) {
    return (
        <View style={styles.row}>
            <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
            <Text style={[styles.value, bold && styles.bold, highlight && styles.highlight]}>
                {value}
            </Text>
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
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    label: { color: '#444' },
    value: { color: '#222' },
    bold: { fontWeight: 'bold' },
    highlight: { color: '#d43c63', fontWeight: 'bold' },
    serviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    serviceName: {
        flex: 1,
        marginRight: 12,
    },
    quantity: {
        color: '#888',
        fontWeight: 'bold',
    },
});
