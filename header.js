import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { auth, db } from './firebaseConfig'; // adjust the path accordingly

export default function Header() {
    const [sandDollars, setSandDollars] = useState(0);
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    useEffect(() => {
        if(userId) {
            db.collection('users').doc(userId)
            .onSnapshot((doc) => {
                setSandDollars(doc.data().sandDollars);
            });
        }
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.sandDollarsText}>{sandDollars}</Text>
            <Image style={styles.sandDollarsImage} source={require('./assets/sand-dollar.png')} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60, // this is your container height
        width: '100%', // this is your container width
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    sandDollarsText: {
        fontSize: 20,
        marginRight: 10,
    },
    sandDollarsImage: {
        width: 30,
        height: 30,
    },
});
