import { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet, Alert, ScrollView } from "react-native";

export default function Detail() {
    const [data, setData] = useState(null);
    const filePath = 'https://dummyjson.com/products/1';

    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = () => {
        Alert.alert(
            "Delete Product",
            `Are you sure you want to delete ${data?.title}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: () => {
                        Alert.alert("Product deleted");
                    },
                },
            ],
            { cancelable: true }
        );
    };

    if (!data) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: data.images[0] }} style={styles.productImage} />
            <Text style={styles.title}>Title: {data.title}</Text>
            <Text style={styles.description}>Description: {data.description}</Text>
            <Text style={styles.price}>Price: ${data.price}</Text>
            <Text style={styles.discount}>Discount: {data.discountPercentage}%</Text>
            <Text style={styles.rating}>Rating: {data.rating} stars</Text>
            <Text style={styles.stock}>Stock: {data.stock} units</Text>
            <Text style={styles.brand}>Brand: {data.brand}</Text>
            <Text style={styles.category}>Category: {data.category}</Text>
            <Text style={styles.warranty}>Warranty: {data.warrantyInformation}</Text>
            <Text style={styles.shipping}>Shipping: {data.shippingInformation}</Text>
            <Text style={styles.availability}>Availability: {data.availabilityStatus}</Text>
            <Text style={styles.returnPolicy}>Return Policy: {data.returnPolicy}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Delete" onPress={handleDelete} color="#d9534f" />
                <Button title="Cancel" onPress={() => {}} color="#5bc0de" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f7f7f7',
    },
    productImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        fontSize: 18,
        marginBottom: 5,
    },
    discount: {
        fontSize: 16,
        color: '#ff5722',
        marginBottom: 5,
    },
    rating: {
        fontSize: 16,
        marginBottom: 5,
    },
    stock: {
        fontSize: 16,
        marginBottom: 5,
    },
    brand: {
        fontSize: 16,
        marginBottom: 5,
    },
    category: {
        fontSize: 16,
        marginBottom: 5,
    },
    warranty: {
        fontSize: 14,
        marginBottom: 5,
    },
    shipping: {
        fontSize: 14,
        marginBottom: 5,
    },
    availability: {
        fontSize: 14,
        marginBottom: 5,
    },
    returnPolicy: {
        fontSize: 14,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
