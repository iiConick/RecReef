import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { db, storage } from '../firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image as RNImage } from 'react-native';
import sandDollarImage from '../assets/sand-dollar.png';



function ButtonGuide() {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('buttons')
      .onSnapshot((snapshot) => {
        const buttonData = [];
        snapshot.forEach((doc) => {
          buttonData.push({ ...doc.data(), id: doc.id });
        });
        setButtons(buttonData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.buttonContainer}>
      <Image
        source={{ uri: `${item.imageUrl}` }}
        style={styles.buttonImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.buttonTitle}>{item.name}</Text>
        <Text style={styles.buttonDescription}>{item.description}</Text>
      </View>
      <View style={styles.sandDollarContainer}>
        <Text style={styles.sandDollarValue}>{item.sandDollarValue}</Text>
        <RNImage
          source={sandDollarImage}
          style={styles.sandDollarIcon}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width - 20,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDescription: {
    fontSize: 14,
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10, // Add some spacing between the image and the text
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Make the container display its children in a row
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width - 20,
  },
  sandDollarContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sandDollarValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2,
  },
  sandDollarIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default ButtonGuide;
