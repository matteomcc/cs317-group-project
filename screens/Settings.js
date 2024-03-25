import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';

const SettingsScreen = () => {
  const { isDark, setIsDark } = useDarkMode();
  const { isLargeText, setLargeText } = useLargeText();

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [isDark, isLargeText]);

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify({ isDark, isLargeText }));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('settings');
      if (settings !== null) {
        const { isDark, isLargeText } = JSON.parse(settings);
        setIsDark(isDark);
        setLargeText(isLargeText);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

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