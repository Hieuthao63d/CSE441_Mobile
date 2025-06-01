import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SettingScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.removeItem('loginToken');
                    router.replace('/login');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#ef476f',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
