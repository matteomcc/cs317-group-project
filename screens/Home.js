import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const { isDark } = useDarkMode();
  const { isLargeText } = useLargeText();
  const [name, setName] = useState('');
  const [workoutData, setWorkoutData] = useState({});
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    getCurrentDay();
    getData();
  }, []);

  const getCurrentDay = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    setCurrentDay(days[currentDayIndex]);
  };

  const getData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedWorkoutData = await AsyncStorage.getItem(currentDay.toLowerCase());
      if (storedName) setName(storedName);
      if (storedWorkoutData) setWorkoutData(JSON.parse(storedWorkoutData));
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      marginTop: 20,
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    weightImage: {
      width: 100,
      height: 100,
    },
    subheading: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 10,
    },
    currentDay: {
      fontSize: 18,
      marginBottom: 10,
    },
    text: {
      color: '#333',
      fontSize: 18,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{name}</Text>
      </View>
      <Text style={styles.currentDay}>Current Day: {currentDay}</Text>
      <Text style={styles.subheading}>Most Recent Workout</Text>
      {Object.entries(workoutData).map(([exercise, weight]) => (
        <Text key={exercise} style={styles.text}>{exercise}: {weight} kg</Text>
      ))}
    </View>
  );
};

export default HomeScreen;