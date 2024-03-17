import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useDarkMode } from './DarkModeContext';
import { useAutoBright } from './AutoBrightContext';

const SettingsScreen = () => {
  const { isDark, setIsDark } = useDarkMode();
  const { isAutoBright, setAutoBright } = useAutoBright();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      backgroundColor: isDark ? '#191919' : '#fff',
    },
    text: {
      color: isDark ? '#fff' : '#000',
      fontSize: 18,
      marginBottom: 5,
      marginHorizontal: 5,
      textAlign:'left'
    },
    heading: {
      color: isDark ? '#fff' : '#000',
      fontSize: 24,
      marginBottom: 10,
      marginHorizontal: 10,
      textAlign:'center'
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Update your setting here!
      </Text>
      <Text style={styles.text}>Dark Mode</Text>
      <Switch value={isDark}
        onValueChange={(value) => setIsDark(value)}
        activeText={'On'}
        inActiveText={'Off'}
        backgroundActive={'green'}
        backgroundInactive={'gray'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#000000'}/>
      <Text style={styles.text}>Enable Automatic Brightness for Running Screen</Text>
      <Switch value={isAutoBright}
        onValueChange={() => setAutoBright(!isAutoBright)}
        activeText={'On'}
        inActiveText={'Off'}
        backgroundActive={'green'}
        backgroundInactive={'gray'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#000000'}/>
    </View>
  );
};

export default SettingsScreen;