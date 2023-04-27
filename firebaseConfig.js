// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseConfig = {
    apiKey: Constants.manifest.extra.firebaseApiKey,
    authDomain: Constants.manifest.extra.firebaseAuthDomain,
    projectId: Constants.manifest.extra.firebaseProjectId,
    storageBucket: Constants.manifest.extra.firebaseStorageBucket,
    messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
    appId: Constants.manifest.extra.firebaseAppId,
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const storage = new firebase.storage.Storage(firebase.app(), {
    storageBucket: firebaseConfig.storageBucket,
  });

  const auth = firebase.auth();
  
  const db = firebase.firestore();

    export { db, storage, auth };