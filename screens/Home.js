import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from './DarkModeContext';

const HomeScreen = () => {
  const { isDark } = useDarkMode();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#000' : '#fff',
    },
    text: {
      color: isDark ? '#fff' : '#000',
    },
  });

  return (
    <View style={styles.container}>
        <Text style={styles.text}>
          Home
        </Text>
    </View>
  );
};

export default HomeScreen;