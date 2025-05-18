import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ContactThumb from '../components/ContactThumb';
import { loadContacts } from '../asyncStorageService';

const FavoritesWithAsyncStorage = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavoriteContacts = async () => {
            try {
                const contacts = await loadContacts();
                setFavorites(contacts.filter(c => c.favorite));
            } catch (error) {
                console.error('Error loading favorite contacts:', error);
            }
        };

        loadFavoriteContacts();

        const unsubscribe = navigation.addListener('focus', () => {
            loadFavoriteContacts();
        });

        return unsubscribe;
    }, [navigation]);

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

export default FavoritesWithAsyncStorage;