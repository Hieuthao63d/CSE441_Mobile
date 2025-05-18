import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ContactThumb = ({ name, phone, avatar, textColor, onPress }) => {
    const colorStyle = {
        color: textColor,
    };

    const ImageContact = onPress ? TouchableOpacity : View;

    return (
        <View style={styles.container}>
            <ImageContact onPress={onPress}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
            </ImageContact>

            {name !== '' && <Text style={[styles.name, colorStyle]}>{name}</Text>}

            {phone !== '' && (
                <View style={styles.phoneSection}>
                    <Text style={[styles.phone, colorStyle]}>{phone}</Text>
                </View>
            )}
        </View>
    );
};

ContactThumb.defaultProps = {
    name: '',
    phone: '',
    textColor: 'white',
    onPress: null,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    },
    name: {
        fontSize: 20,
        marginTop: 24,
        fontWeight: 'bold',
    },
    phoneSection: {
        flexDirection: 'row',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    phone: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ContactThumb;