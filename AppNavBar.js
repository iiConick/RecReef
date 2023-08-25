import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from './header.js';
import ButtonBook from './screens/ButtonBook';
import ButtonGuide from './screens/ButtonGuide';
import Shop from './screens/Shop';
import Account from './screens/Account';
import ManageButtons from './screens/manageButtons.js'; // Remember to create this screen if it doesn't exist
import ManageShop from './screens/manageShop.js'
import ManageUsers from './screens/manageUsers.js'

const Tab = createMaterialBottomTabNavigator();

function AppNavigator() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="ButtonBook"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad' }}
      >
        {isAdminMode ? (
          <>
            <Tab.Screen
              name="manageButtons"
              component={ManageButtons}
              options={{
                tabBarLabel: 'Buttons',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="medal" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="manageShop"
              component={ManageShop}
              options={{
                tabBarLabel: 'Shop',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="store" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="manageUsers"
              component={ManageUsers}
              options={{
                tabBarLabel: 'Users',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account-cog" color={color} size={26} />
                ),
              }}
            />
            
          </>
        ) : (
          <>
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
            <Tab.Screen
              name="ToggleAdmin"
              component={ButtonBook} // This is a placeholder, as we'll use custom behavior on tap
              listeners={{
                tabPress: e => {
                  e.preventDefault(); // Prevent the default behavior (navigation)
                  toggleAdminMode();
                },
              }}
              options={{
                tabBarLabel: 'Admin',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="shield-crown" color={color} size={26} />
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </>
  );
}

export default AppNavigator;

