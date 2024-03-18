import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { useDarkMode } from './DarkModeContext';
import { useAutoBright } from './AutoBrightContext';

const RunningScreen = () => {
  const { isDark } = useDarkMode();
  const { isAutoBright } = useAutoBright();
  const [brightness, setBrightness] = useState(1);

  useEffect(() => {
    let subscription; // Declare subscription variable outside useEffect

    const startLightSensor = async () => {
      try {
        // Check if light sensor is available
        if (await LightSensor.isAvailableAsync()) {
          subscription = LightSensor.addListener(({ light }) => {
            setBrightness(light);
          });
          // Start light sensor updates
          await LightSensor.setUpdateIntervalAsync(1000);
        } else {
          console.log('Light sensor not available');
        }
      } catch (error) {
        console.error('Error starting light sensor:', error);
      }
    };

    if (isAutoBright) {
      startLightSensor(); // Start light sensor when isAutoBright is true
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isAutoBright]);

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
    <View style={[styles.container, { opacity: brightness }]}>
      <Text style={styles.text}>Running Screen</Text>
    </View>
  );
};

export default RunningScreen;