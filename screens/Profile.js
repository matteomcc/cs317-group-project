import * as React from 'react';
import { View, Text } from "react-native";

export default function ProfileScreen() {
   return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text style={{fontSize:16,fontWeight:'700'}}>Manage your profile here!</Text>
    <Text style={{fontSize:16,fontWeight:'700'}}>This is a profile screen</Text>
</View>
   );
 }