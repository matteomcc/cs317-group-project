import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, Alert, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const LATITUDE_DELTA = 0.0001;
const LONGITUDE_DELTA = 0.0001;

function RunningScreen() {
  const [showStats, setStats] = useState(false);
  const [startStop, setStartStop] = useState("Start Run");
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDis] = useState(0);
  const [LATITUDE, setLAT] = useState(39.0973);
  const [LONGITUDE, setLONG] = useState(-82.9860);
  const [startLAT, setSLAT] = useState(null);
  const [startLONG, setSLONG] = useState(null);
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
      setSLAT(location.coords.latitude);
      setSLONG(location.coords.longitude);
      setStartStop("Stop Run");
      setStats(true);
      startTimer();
    } else {
      setStartStop("Start Run");
      setStats(false);
      stopTimer();
      let location = await Location.getCurrentPositionAsync({});
      let distance = calculateDistance(startLAT, startLONG, location.coords.latitude, location.coords.longitude);
      Alert.alert(
        'Run Completed',
        `Time: ${Math.floor(elapsedTime / 60).toFixed(0)} mins ${Math.floor(elapsedTime % 60).toFixed(0)} secs\nDistance between your start point and end point: ${distance.toFixed(2)} km`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  };

  const help = () => {
    Alert.alert(
      'Help',
      `Press the 'Start Run' button to start tracking your exercise, your location and time will be tracked until the button is pressed again where you will then recieve data about your workout, enjoy!`,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  }

  const startTimer = () => {
    const interval = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);
    setTimer(interval);
    const locInterval = setInterval(fetchLocation, 1000);
    setLocationInterval(locInterval);
  };

  const stopTimer = () => {
    setElapsedTime(0);
    clearInterval(timer);
    clearInterval(locationInterval);
  };

  const fetchLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLAT(location.coords.latitude);
    setLONG(location.coords.longitude);
  };

  //code in calculateDistance sourced from https://www.movable-type.co.uk/scripts/latlong.html
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = (R * c)/1000; // in metres
  return d;
}


  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          region={{
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
        </View>
      )}
      <View style={styles.helpButtonContainer}>
        <TouchableOpacity
          onPress={help}
          style={styles.helpButton}
        >
          <Text style={styles.buttonText}>?</Text>
        </TouchableOpacity>
      </View>
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
  helpButtonContainer: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.05,
    left: 0,
    right: 0,
    margin: 10,
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#1ba5c4',
    width: Dimensions.get('window').width * 0.5,
    padding: 10,
    borderRadius: 20,
  },
  helpButton: {
    backgroundColor: '#1ba5c4',
    width: Dimensions.get('window').width * 0.1,
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

