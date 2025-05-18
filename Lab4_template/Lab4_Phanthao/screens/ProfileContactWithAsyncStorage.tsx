import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ContactThumb from '../components/ContactThumb';
import DetailListItem from '../components/DetailListItem';
import { toggleContactFavorite } from '../asyncStorageService';

const ProfileContactWithAsyncStorage = ({ route }) => {
    const { contact } = route.params;
    const [isFavorite, setIsFavorite] = useState(contact.favorite);
    const navigation = useNavigation();

    const handleToggleFavorite = async () => {
        setIsFavorite(!isFavorite);

        await toggleContactFavorite(contact.id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThumb avatar={contact.avatar} name={contact.name} phone={contact.phone} />
            </View>
            <View style={styles.detailsSection}>
                <DetailListItem icon="email" title="Email" subtitle={contact.email} />
                <DetailListItem icon="phone" title="Work" subtitle={contact.phone} />
                <DetailListItem icon="cellphone" title="Personal" subtitle={contact.cell} />
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <IconButton
                        icon={isFavorite ? 'star' : 'star-outline'}
                        iconColor="#663399"
                        size={40}
                        onPress={handleToggleFavorite}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3366CC'
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white'
    },
});

export default ProfileContactWithAsyncStorage;