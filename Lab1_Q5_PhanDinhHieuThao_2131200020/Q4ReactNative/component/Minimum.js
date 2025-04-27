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

export default function Minimum() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [min, setMin] = useState(null);
    function findMin() {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        const num3 = parseFloat(c);
        const minimum = Math.min(num1, num2, num3);
        setMin(minimum);
      }

    return (
        <View>
            <TextInput placeholder="Enter first number" value={a} onChangeText={setA} keyboardType="numeric"/>
            <TextInput placeholder="Enter second number" value={b} onChangeText={setB} keyboardType="numeric"/>
            <TextInput placeholder="Enter third number" value={c} onChangeText={setC} keyboardType="numeric"/>
            <Button title="Find Minimum" onPress={findMin}/>
            {min !== null && <Text style={{ marginTop: 10 }}>Minimum: {min}</Text>}
        </View>
    )
}