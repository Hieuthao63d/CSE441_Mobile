import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

export default function Add() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [rating, setRating] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState('');

    const handleSubmit = () => {
        if (!title || !description || !price || !discountPercentage || !rating || !stock || !brand || !category || !images) {
            Alert.alert("Error", "All fields must be filled out!");
            return;
        }

        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                discountPercentage: discountPercentage,
                rating: rating,
                stock: stock,
                brand: brand,
                category: category,
                images: images.split(',')
            }),
        })
            .then((res) => res.json())
            .then(() => {
                Alert.alert("Add sucessfully");
                setTitle('');
                setDescription('');
                setPrice('');
                setDiscountPercentage('');
                setRating('');
                setStock('');
                setBrand('');
                setCategory('');
                setImages('');
            })
            .catch(() => {
                Alert.alert("Error");
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add a Product</Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Discount Percentage</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter discount percentage"
                value={discountPercentage}
                onChangeText={setDiscountPercentage}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Rating</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter rating"
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Stock</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter stock"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Brand</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter brand"
                value={brand}
                onChangeText={setBrand}
            />

            <Text style={styles.label}>Category</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter category"
                value={category}
                onChangeText={setCategory}
            />

            <Text style={styles.label}>Images</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter images URL(s)"
                value={images}
                onChangeText={setImages}
            />

            <Button title="Submit" onPress={handleSubmit} color="#007bff" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});
