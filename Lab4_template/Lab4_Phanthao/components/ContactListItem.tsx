import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const ContactListItem = ({ name, avatar, phone, onPress }) => {
    return (
        <TouchableHighlight underlayColor="#eeeeee" style={styles.container} onPress={onPress}>
            <View style={styles.contactInfo}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <View style={styles.details}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{phone}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        marginTop: 0,
    },
    contactInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    avatar: {
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    details: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 20,
    },
    title: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        color: '#3366CC',
        fontSize: 14,
        marginTop: 4,
    },
});

export default ContactListItem;