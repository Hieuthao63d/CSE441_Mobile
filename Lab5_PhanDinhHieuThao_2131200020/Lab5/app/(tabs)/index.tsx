import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Service {
  _id: string;
  name: string;
  price: number;
}

export default function HomeScreen() {
  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();

  const fetchServices = async () => {
    try {
      const token = await AsyncStorage.getItem('loginToken');
      const response = await axios.get('https://kami-backend-5rs0.onrender.com/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(response.data);
    } catch (error) {
      console.log('Failed to fetch services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const renderItem = ({ item }: { item: Service }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => router.push(`/services/${item._id}`)}
  >
    <Text style={styles.serviceName} numberOfLines={1}>{item.name}</Text>
    <Text style={styles.price}>{item.price.toLocaleString()} ₫</Text>
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>HUYỀN TRINH</Text>
        {/* <TouchableOpacity>
          <Text style={styles.addButton}>＋</Text>
        </TouchableOpacity> */}
      </View>

      {/* Logo */}
      <Image
        source={require('@/assets/images/kami_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.serviceHeader}>
        <Text style={styles.title}>Danh sách dịch vụ</Text>
        <TouchableOpacity onPress={() => router.push('/add')}>
          <Text style={styles.addButton}>＋</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d43c63',
  },
  addButton: {
    fontSize: 28,
    color: '#d43c63',
  },
  logo: {
    height: 60,
    alignSelf: 'center',
    marginVertical: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 12,
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  price: {
    fontWeight: 'bold',
    marginLeft: 12,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },

});
