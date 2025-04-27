import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    Alert
  } from 'react-native';
export default function Employee(props){
    function click(){
        Alert.alert('ThanhCong')
    }
    return(
        <View>
            <Text>{props.fullName}</Text>
            <Text>{props.age}</Text>
            <Text>{props.occupation}</Text>
            <Button title='update' onPress={click}></Button>
        </View>
    )
}