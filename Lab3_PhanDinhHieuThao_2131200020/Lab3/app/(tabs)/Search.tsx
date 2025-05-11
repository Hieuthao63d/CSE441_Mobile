import { useState } from "react";
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Search() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    let filePath = 'https://dummyjson.com/products';

    const searchProduct = () => {
        if (value !== '') {
            filePath = 'https://dummyjson.com/products/search?q=' + value;
        }

        setLoading(true);
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d.products);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    const renderItem = ({ item }:any) => (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>Price: ${item.price}</Text>
            <Text style={styles.productDiscount}>Discount: {item.discountPercentage}%</Text>
            <TouchableOpacity style={styles.productDetailButton}>
                <Text style={styles.productDetailText}>Product Detail</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Products"
                value={value}
                onChangeText={setValue}
            />
            <Button title="SEARCH" onPress={searchProduct} color="#007bff" />

            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.productList}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f7f7f7',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 20,
    },
    productList: {
        marginTop: 20,
    },
    productContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    productPrice: {
        fontSize: 16,
        color: '#000',
        marginTop: 5,
    },
    productDiscount: {
        fontSize: 14,
        color: '#ff5722',
        marginTop: 5,
    },
    productDetailButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    productDetailText: {
        color: '#fff',
        textAlign: 'center',
    },
});
