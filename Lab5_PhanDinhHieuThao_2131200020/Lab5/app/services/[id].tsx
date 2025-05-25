import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchService = async () => {
        try {
            const response = await axios.get(`https://kami-backend-5rs0.onrender.com/services/${id}`);
            setService(response.data);
        } catch (error) {
            console.log('Error fetching service:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Warning",
            "Are you sure you want to remove this service? This operation cannot be returned",
            [
                { text: "CANCEL", style: "cancel" },
                {
                    text: "DELETE",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('loginToken');
                            await axios.delete(`https://kami-backend-5rs0.onrender.com/services/${id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            Alert.alert("Deleted", "Service has been deleted.");
                            router.replace('/');
                        } catch (error) {
                            console.log('Delete error:', error);
                            Alert.alert("Error", "Cannot delete service.");
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        fetchService();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#ef476f" />;
    }

    if (!service) {
        return <Text style={{ padding: 20 }}>Service not found.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}><Text style={styles.bold}>Service name:</Text> {service.name}</Text>
            <Text style={styles.label}><Text style={styles.bold}>Price:</Text> {service.price.toLocaleString()} ₫</Text>
            <Text style={styles.label}><Text style={styles.bold}>Creator:</Text> {service.creator || 'Unknown'}</Text>
            <Text style={styles.label}><Text style={styles.bold}>Time:</Text> {new Date(service.createdAt).toLocaleString()}</Text>
            <Text style={styles.label}><Text style={styles.bold}>Final update:</Text> {new Date(service.updatedAt).toLocaleString()}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#06d6a0' }]}
                    onPress={() => router.push(`/services/${id}/edit`)}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 14,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
