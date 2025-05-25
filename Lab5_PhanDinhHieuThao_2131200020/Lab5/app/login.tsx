import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
    Alert, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    StatusBar,
    Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        console.log("Login button pressed");

        try {
            const response = await axios.post('https://kami-backend-5rs0.onrender.com/auth', {
                phone: phone,
                password: password,
            });

            console.log("API response:", response.data);

            const token = response.data.token;
            await AsyncStorage.setItem('loginToken', token);
            console.log("Saved token:", token);

            Alert.alert('Login Successful');
            router.push('/');
        } catch (error) {
            console.log("Login error:", error);
            Alert.alert('Login Failed', 'Invalid phone or password');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FF6B9D" barStyle="light-content" />
            


            {/* Main content */}
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            placeholderTextColor="#999"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.passwordInput]}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity 
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons 
                                name={showPassword ? "eye" : "eye-off"} 
                                size={24} 
                                color="#999" 
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        style={styles.loginButton} 
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 48,
        fontWeight: '300',
        color: '#FF6B9D',
        textAlign: 'center',
        marginBottom: 80,
        letterSpacing: 2,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 24,
        position: 'relative',
    },
    input: {
        height: 56,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    passwordInput: {
        paddingRight: 60,
    },
    eyeIcon: {
        position: 'absolute',
        right: 18,
        top: 16,
        padding: 4,
    },
    loginButton: {
        backgroundColor: '#FF6B9D',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        shadowColor: '#FF6B9D',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1,
    },

});