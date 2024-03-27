import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';

// Function to get the current day name
const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  return days[today];
};

const HomeScreen = () => {
  const { isDark, setIsDark } = useDarkMode();
  const { isLargeText, setLargeText } = useLargeText();
  const [myArray, setMyArray] = useState([]);
  const [currentDayData, setCurrentDayData] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadUserName();
    loadWeights();
  }, []);

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      if (name !== null) {
        setUserName(name);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

  const loadWeights = async () => {
    try {
      const value = await AsyncStorage.getItem('myArray');
      if (value !== null) {
        setMyArray(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error loading weights:', error);
    }
  };

  useEffect(() => {
    const currentDayIndex = new Date().getDay();
    setCurrentDayData(myArray[currentDayIndex] ? myArray[currentDayIndex].slice(1) : []);
  }, [myArray]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#333' : '#f7f7f7',
    },
    text: {
      color: isDark ? '#fff' : '#333',
      fontSize: isLargeText ? 24 : 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    heading: {
      color: isDark ? '#fff' : '#333',
      fontSize: isLargeText ? 40 : 24,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {userName}</Text>
      <Text style={styles.text}>Current Day: {getCurrentDay()}</Text>
      <Text style={styles.text}>Most Recent Workout</Text>
      <View>
        {currentDayData.length > 0 ? (
          currentDayData.map((exercise, index) => (
            <Text key={index} style={styles.text}>
              {exercise[0]}: {exercise[1]}kg
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No exercises recorded today</Text>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;