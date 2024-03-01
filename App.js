import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
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
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Running" component={RunningScreen} />
        <Drawer.Screen name="Weights" component={WeightsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}