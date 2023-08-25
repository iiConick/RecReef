// OrderDetails.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { db, storage } from '../firebaseConfig';

const OrderDetails = ({ route, navigation }) => {
  const { product } = route.params;

  const handleConfirmPurchase = () => {
    const order = {
      userId: db.auth().currentUser.uid,
      productId: product.id,
      productName: product.name,
      quantity: 1, // or any quantity
      totalPrice: product.price,
      timestamp: db.firestore.Timestamp.now(),
    };

    firebase.firestore()
      .collection('orders')
      .add(order)
      .then(() => {
        alert('Purchase successful!');
        navigation.goBack();
      })
      .catch((error) => {
        alert('Error making purchase:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>{product.productName}</Text>
      <Text>{product.price} Sand Dollars</Text>
      <Button title="Confirm Purchase" onPress={handleConfirmPurchase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderDetails;
