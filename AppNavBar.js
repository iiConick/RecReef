import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// Import your screen components here
import ButtonBook from './screens/ButtonBook';
import ButtonGuide from './screens/ButtonGuide';
import Shop from './screens/Shop';
import Account from './screens/Account';

const Tab = createMaterialBottomTabNavigator();

function AppNavigator() {
  return (
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="ButtonBook"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen
          name="ButtonBook"
          component={ButtonBook}
          options={{
            tabBarLabel: 'Button Book',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="notebook" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ButtonGuide"
          component={ButtonGuide}
          options={{
            headerShown: false, // hide the header
        headerLeft: null, // remove the back button

            tabBarLabel: 'Button Guide',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book-open-variant" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={Shop}
          options={{
            tabBarLabel: 'Shop',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="store" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

export default AppNavigator;
