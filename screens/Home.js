import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';

const HomeScreen = () => {
  const { isDark, setIsDark } = useDarkMode();
  const { isLargeText, setLargeText } = useLargeText();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('settings');
      if (settings !== null) {
        const { isDark, isLargeText } = JSON.parse(settings);
        setIsDark(isDark);
        setLargeText(isLargeText);
      }
    } catch (error) {
      console.error('Error loading home settings:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
          Home
        </Text>
    </View>
  );
};

export default HomeScreen;