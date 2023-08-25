import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export default function ProductDetails({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;

  const handleBuyNow = () => {
    navigation.navigate('OrderDetails', { product: item });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.productName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.brand}>{item.brand}</Text>
      <View style={styles.priceContainer}>
        <Image source={require('../assets/sand-dollar.png')} style={styles.sandDollar} />
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <Button title="Buy Now" onPress={handleBuyNow} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  brand: {
    fontSize: 18,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});
