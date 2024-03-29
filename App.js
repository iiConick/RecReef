import AppNavigator from './AppNavBar';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import AppNavBar from './AppNavBar';
import ProductDetails from './screens/ProductDetails'; // adjust the path accordingly
import OrderDetails from './screens/OrderDetails';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false }}name="Login" component={LoginScreen} />
        <Stack.Screen name="AppNavBar" component={AppNavBar} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});