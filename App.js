import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Import screens
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import RunningScreen from './screens/Running';
import WeightsScreen from './screens/Weights';
import SettingsScreen from './screens/Settings';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/home.png')}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Drawer.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/profile.png')}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Drawer.Screen 
          name="Running" 
          component={RunningScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/shoe.png')}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Drawer.Screen 
          name="Weights" 
          component={WeightsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/weight.png')}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Drawer.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/settings.png')}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}