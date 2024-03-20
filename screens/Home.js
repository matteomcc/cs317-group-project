import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const { isDark } = useDarkMode();
  const { isLargeText } = useLargeText();
  const [name, setName] = useState('');
  const [lastWorkoutDay, setLastWorkoutDay] = useState('');
  const [benchPressWeight, setBenchPressWeight] = useState(0);
  const [deadliftWeight, setDeadliftWeight] = useState(0);
  const [squatWeight, setSquatWeight] = useState(0);

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
      marginBottom: 10,
      textAlign: 'center',
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedLastWorkoutDay = await AsyncStorage.getItem('lastWorkoutDay');
      const storedBenchPressWeight = await AsyncStorage.getItem('benchPressWeight');
      const storedDeadliftWeight = await AsyncStorage.getItem('deadliftWeight');
      const storedSquatWeight = await AsyncStorage.getItem('squatWeight');

      if (storedName) {setName(storedName)};
      if (storedLastWorkoutDay) {setLastWorkoutDay(storedLastWorkoutDay)}
      if (storedBenchPressWeight) {setBenchPressWeight(parseInt(storedBenchPressWeight))};
      if (storedDeadliftWeight) {setDeadliftWeight(parseInt(storedDeadliftWeight))};
      if (storedSquatWeight) {setSquatWeight(parseInt(storedSquatWeight))};
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Last Workout Day: {lastWorkoutDay}</Text>
      <Text style={styles.text}>Bench Press Weight: {benchPressWeight} kg</Text>
      <Text style={styles.text}>Deadlift Weight: {deadliftWeight} kg</Text>
      <Text style={styles.text}>Squat Weight: {squatWeight} kg</Text>
    </View>
  );
};

export default HomeScreen;