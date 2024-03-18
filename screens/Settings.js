import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';

const SettingsScreen = () => {
  const { isDark, setIsDark } = useDarkMode();
  const { isLargeText, setLargeText } = useLargeText();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      backgroundColor: isDark ? '#191919' : '#fff',
    },
    text: {
      color: isDark ? '#fff' : '#000',
      fontSize: isLargeText ? 24 : 18,
      marginBottom: 5,
      marginHorizontal: 5,
      textAlign:'left'
    },
    heading: {
      color: isDark ? '#fff' : '#000',
      fontSize: isLargeText ? 40 : 24,
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
      <Text style={styles.text}>Enable Larger Text Size</Text>
      <Switch value={isLargeText}
        onValueChange={() => setLargeText(!isLargeText)}
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