import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; // adjust the path accordingly
import { useNavigation } from '@react-navigation/native';


export default function Shop() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection('products')
        .onSnapshot((snapshot) => {
            const productList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productList);
        });
    }, []);

    return (
        <FlatList
            data={products}
            numColumns={2}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.itemContainer}
                     onPress={() => navigation.navigate('ProductDetails', { item })}
                     >
                    <Image source={{ uri: `${item.imageUrl}` }} style={styles.image} />
                    <Text style={styles.title}>{item.productName}</Text>
                    <View style={styles.priceContainer}>
                        <Image source={require('../assets/sand-dollar.png')} style={styles.sandDollar} />
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    sandDollar: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    price: {
        fontSize: 14,
    },
});
