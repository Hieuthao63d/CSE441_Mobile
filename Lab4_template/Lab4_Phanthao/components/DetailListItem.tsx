import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type DetailListItemProps = {
    icon: string;
    title: string;
    subtitle: string;
};

const DetailListItem: React.FC<DetailListItemProps> = ({ icon, title, subtitle }) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={icon} size={28} color="#663399" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    icon: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 16,
    },
    subtitle: {
        color: '#666',
        marginTop: 4,
        fontSize: 14,
    },
});

export default DetailListItem;