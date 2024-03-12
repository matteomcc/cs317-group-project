import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// Import screens
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import RunningScreen from './screens/Running';
import WeightsScreen from './screens/Weights';
import SettingsScreen from './screens/Settings';
import { DarkModeProvider } from './screens/DarkModeContext';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <DarkModeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Running" component={RunningScreen} />
          <Drawer.Screen name="Weights" component={WeightsScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </DarkModeProvider>
  );
}