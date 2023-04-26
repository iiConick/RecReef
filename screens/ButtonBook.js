// ButtonBook.js
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { db, storage } from '../firebaseConfig';

function ImageDisplay({ imagePath }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImageUrl() {
      const imageRef = storage.ref(imagePath);
      const url = await imageRef.getDownloadURL();
      setImageUrl(url);
    }

    fetchImageUrl();
  }, [imagePath]);

  if (imageUrl) {
    return <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />;
  } else {
    return null;
  }
}

function ButtonBook() {
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
      <Text style={styles.buttonTitle}>{item.name}</Text>
      <Text style={styles.buttonDescription}>{item.description}</Text>
      <ImageDisplay imagePath={item.imageUrl} />
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
    justifyContent: 'center',
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
});

export default ButtonBook;
