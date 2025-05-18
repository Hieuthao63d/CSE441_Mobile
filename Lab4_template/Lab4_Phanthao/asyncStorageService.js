import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const CONTACTS_KEY = 'contacts_data';

// Load contacts from AsyncStorage
export const loadContacts = async () => {
    try {
        const storedContacts = await AsyncStorage.getItem(CONTACTS_KEY);
        return storedContacts ? JSON.parse(storedContacts) : [];
    } catch (error) {
        console.error('Error loading contacts from AsyncStorage:', error);
        return [];
    }
};

// Save contacts to AsyncStorage
export const saveContacts = async (contacts) => {
    try {
        await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    } catch (error) {
        console.error('Error saving contacts to AsyncStorage:', error);
    }
};

// Fetch contacts from API and save to AsyncStorage
export const fetchAndSaveContacts = async () => {
    try {
        // Check if we already have contacts in AsyncStorage
        const storedContacts = await loadContacts();

        if (storedContacts.length > 0) {
            return storedContacts;
        }

        // If no stored contacts, fetch from API
        const response = await fetch('https://randomuser.me/api/?results=50');
        const data = await response.json();

        const contacts = data.results.map(item => ({
            id: item.login.uuid,
            name: `${item.name.first} ${item.name.last}`,
            avatar: item.picture.thumbnail,
            phone: item.phone,
            email: item.email,
            cell: item.cell,
            favorite: false,
        }));

        // Save to AsyncStorage
        await saveContacts(contacts);
        return contacts;
    } catch (error) {
        console.error('Error fetching contacts from API:', error);
        return [];
    }
};

// Toggle favorite status of a contact
export const toggleContactFavorite = async (contactId) => {
    try {
        const contacts = await loadContacts();
        const updatedContacts = contacts.map(contact => {
            if (contact.id === contactId) {
                return { ...contact, favorite: !contact.favorite };
            }
            return contact;
        });

        await saveContacts(updatedContacts);
        return updatedContacts;
    } catch (error) {
        console.error('Error toggling favorite status:', error);
        return null;
    }
};