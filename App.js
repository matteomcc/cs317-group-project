import React, {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Import screens
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import RunningScreen from './screens/Running';
import WeightsScreen from './screens/Weights';
import SettingsScreen from './screens/Settings';

import { DarkModeProvider } from './screens/DarkModeContext';
import { LargeTextProvider } from './screens/LargeTextContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ profileImageUri, ...props }) => (
    <DrawerContentScrollView {...props}>
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            {profileImageUri && <Image source={{ uri: profileImageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
        </View>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>
);


export default function App() {
      const [profileImageUri, setProfileImageUri] = React.useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let imageUri = await AsyncStorage.getItem('imageUri');
            if (!imageUri) {
                imageUri = require('./assets/profile.png');
            }
            setProfileImageUri(imageUri);
        } catch (e) {
            console.log(e);
        }
    }
    return (
      <DarkModeProvider>
        <LargeTextProvider>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} profileImageUri={profileImageUri} />}>
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
                    options={{
                        drawerIcon: ({ focused, color, size }) => (
                            <Image
                                source={require('./assets/profile.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        ),
                    }}
                    >
                    {() => <ProfileScreen profileImageUri={profileImageUri} setProfileImageUri={setProfileImageUri} />}
                </Drawer.Screen>
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
      </LargeTextProvider>
      </DarkModeProvider>
    );
}
