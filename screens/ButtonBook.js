import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { db, storage } from '../firebaseConfig';


function ButtonGuide() {
  const [buttons, setButtons] = useState([]);
  const numColumns = 3;
const padding = 5; // You can adjust this value as needed
const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - (numColumns + 1) * padding) / numColumns;


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
    <View style={[styles.buttonContainer, { width: imageSize, height: imageSize }]}>
      <Image
        source={{ uri: `${item.imageUrl}` }}
        style={[styles.buttonImage, { width: imageSize - 20, height: imageSize - 20 }]}
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, { padding: padding }]}
        numColumns={numColumns}
        key={numColumns} // Add this line
      />
      
    </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    resizeMode: 'cover',
  },
  text: {
    fontSize: 10,
  },
});




export default ButtonGuide;
