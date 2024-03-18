import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';

const RunningScreen = () => {
  const { isDark } = useDarkMode();
  const { isLargeText } = useLargeText();

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
      <Text style={styles.heading}>Running Screen</Text>
    </View>
  );
};

export default RunningScreen;