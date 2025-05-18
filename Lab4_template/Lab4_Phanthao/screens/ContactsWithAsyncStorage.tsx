import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { fetchAndSaveContacts } from '../asyncStorageService';
import ContactListItem from '../components/ContactListItem';

const ContactsWithAsyncStorage = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const fetchedContacts = await fetchAndSaveContacts();
                setContacts(fetchedContacts);
            } catch (error) {
                console.error('Error loading contacts:', error);
            }
        };

        loadContacts();
    }, []);

    const renderContact = ({ item }) => (
        <ContactListItem
            name={item.name}
            avatar={item.avatar}
            phone={item.phone}
            onPress={() => navigation.navigate('ProfileContact', { contact: item })}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={renderContact}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
});

export default ContactsWithAsyncStorage;