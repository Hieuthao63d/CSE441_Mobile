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

export default function () {
    const [n, setN] = useState('');
    const [sequence, setSequence] = useState([]);
    function generateSequence() {
        let num = parseInt(n);
        let seq = [];
        while (num !== 1 && num > 0) {
            seq.push(num);
            if (num % 2 === 0) {
                num = num / 2;
            } else {
                num = num * 3 + 1;
            }
        }
        if (num === 1) seq.push(1);
        setSequence(seq);
    }

    return (
        <View>
            <TextInput placeholder="Enter a positive number" value={n} onChangeText={setN} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
            <Button title="Generate Hailstone Sequence" onPress={generateSequence} />
            <ScrollView style={{ marginTop: 20 }}>
                {sequence.map((item, index) => (
                    <Text key={index}>{item}</Text>
                ))}
            </ScrollView>
        </View>
    )
}