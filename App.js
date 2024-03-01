import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import SavedScreen from './screens/Saved';
import ReferScreen from './screens/Refer';
import DrawerItems from './constants/DrawerItems';

const Drawer = createDrawerNavigator();

export default function App() {
 return (
<NavigationContainer>
<Drawer.Navigator
       drawerType="front"
       initialRouteName="Profile"
       drawerContentOptions={{
         activeTintColor: '#e91e63',
         itemStyle: { marginVertical: 10 },
       }}

>
       {
        <Drawer.Screen
                key={drawer.name}
                name={drawer.name}
                options={{
                drawerIcon:({focused})=>
                drawer.iconType==='Material' ?
        <MaterialCommunityIcons
                      name={drawer.iconName}
                      size={24}
                      color={focused ? "#e91e63" : "black"}
                  />
                :
                drawer.iconType==='Feather' ?
        <Feather
                    name={drawer.iconName}
                    size={24}
                    color={focused ? "#e91e63" : "black"}
                  />
                :
        <FontAwesome5
                    name={drawer.iconName}
                    size={24}
                    color={focused ? "#e91e63" : "black"}
                  />
                }}
        />
       }
</Drawer.Navigator>
</NavigationContainer>
 );
}