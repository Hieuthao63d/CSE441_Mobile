import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    Alert,
    TextInput
} from 'react-native';

export default function Sum() {
    const [number, setNumber] = useState('');
    const [sum, setSum] = useState(0);
    function calculate() {
        let first = parseInt(number[0]);
        let last = parseInt(number[number.length - 1]);
        setSum(first + last);
    }
    return (
        <View>
            <TextInput
                keyboardType="numeric"

                placeholder='enter number'
                onChangeText={setNumber}
                value={number}
            />
            <Button title='calculate' onPress={calculate}></Button>
            <Text>Sum:{sum}</Text>
        </View>
    )
}