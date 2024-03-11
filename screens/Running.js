import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, Alert, Dimensions, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

function RunningScreen() {
  const [showStats, setStats] = useState(false);
  const [startStop, setStartStop] = useState("Start Run");
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDis] = useState(0);
  const [LATITUDE, setLAT] = useState(37.78825);
  const [LONGITUDE, setLONG] = useState(-122.4324);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationInterval, setLocationInterval] = useState(null);

  const handleButtonPress = async () => {
    if (startStop === "Start Run") {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLAT(location.coords.latitude);
      setLONG(location.coords.longitude);
      setStartStop("Stop Run");
      setStats(true);
      startTimer();


    } else {
      setStartStop("Start Run");
      setStats(false);
      stopTimer();
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);
    setTimer(interval);
    const locInterval = setInterval(fetchLocation, 2000);
    setLocationInterval(locInterval);
  };

  const stopTimer = () => {
    setElapsedTime(0);
    clearInterval(timer);
    clearInterval(locationInterval);
  };

  const fetchLocation = async () => {
    console.log("balls");
    let location = await Location.getCurrentPositionAsync({});
    setLAT(location.coords.latitude);
    setLONG(location.coords.longitude);
  };


  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
            }}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleButtonPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{startStop}</Text>
        </TouchableOpacity>
      </View>
      {showStats && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Time: {Math.floor(elapsedTime / 60).toFixed(0)} mins {Math.floor(elapsedTime % 60).toFixed(0)} secs</Text>
          <Text style={styles.statsText}>Distance: {distance.toFixed(2)} km</Text>
          <Text style={styles.statsText}>Speed: {(distance / (elapsedTime / 3600)).toFixed(2)} km/hr</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RunningScreen;
//styles
const styles = StyleSheet.create({
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderColor: 'black', 
    borderWidth: 1,
    height: Dimensions.get('window').height * 0.5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.3,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1ba5c4',
    width: Dimensions.get('window').width * 0.5,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  statsContainer: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
  }
});

