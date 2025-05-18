import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import ContactThumb from '../components/ContactThumb';

const Favorites = ({ navigation }) => {
    const contacts = useSelector(state => state.contacts.contacts);
    const favorites = contacts.filter(c => c.favorite);

    const renderFavorite = ({ item }) => (
        <ContactThumb
            avatar={item.avatar}
            name={item.name}
            phone={item.phone}
            onPress={() => navigation.navigate('ProfileContact', { contact: item })}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.list}
                renderItem={renderFavorite}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    list: {
        alignItems: 'center'
    },
});

export default Favorites;