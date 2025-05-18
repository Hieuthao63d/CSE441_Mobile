import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactListItem from '../components/ContactListItem';
import { setContacts } from '../store';

const fetchContactsFromAPI = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=50');
        const data = await response.json();
        return data.results.map(item => ({
            id: item.login.uuid,
            name: `${item.name.first} ${item.name.last}`,
            avatar: item.picture.thumbnail,
            phone: item.phone,
            email: item.email,
            cell: item.cell,
            favorite: false,
        }));
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
};

const Contacts = ({ navigation }) => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const fetchedContacts = await fetchContactsFromAPI();
                dispatch(setContacts(fetchedContacts));
            } catch (error) {
                console.error('Error loading contacts:', error);
            }
        };

        loadContacts();
    }, [dispatch]);

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

export default Contacts;