import { configureStore, createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

// Initial state for the contacts slice
const initialState = {
    contacts: []
};

// Create the contacts slice with reducers
const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // Set all contacts
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        // Toggle favorite status for a contact
        toggleFavorite: (state, action) => {
            const contactId = action.payload;
            const contact = state.contacts.find(c => c.id === contactId);
            if (contact) {
                contact.favorite = !contact.favorite;
            }
        }
    }
});

// Export action creators
export const { setContacts, toggleFavorite } = contactsSlice.actions;

// Configure the Redux store
const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer
    }
});

export default store;