
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 5,
        marginBottom: 20,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 15,
        borderRadius: 8,
        backgroundColor: '#E1E1E1',
    },
    productInfo: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D9CDB',
        marginBottom: 5,
    },
    discount: {
        fontSize: 14,
        color: 'green',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#EF506B',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    
   
});

export default styles;
