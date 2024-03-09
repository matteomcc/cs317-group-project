import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, Alert, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

//initialise variables and functions to change said variables
const RunningScreen = () => {
  const [showStats, setStats] = useState(false);
  const [startStop, setStartStop] = useState("Start Run");
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDis] = useState(0);

  //code ran when button is pressed, which starts or stops the times depending on the current state
  const handleButtonPress = () => {
    if (startStop == "Start Run") {
      setStartStop("Stop Run")
      setStats(true);
      startTimer();
    } else {
      setStartStop("Start Run")
      setStats(false);
      stopTimer();
    }
    
  };

  //starts a timer which updates the elapsedTime every second
  const startTimer = () => {
    const interval = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);
    setTimer(interval);
  };

  //resets the timer and stops it from increasing
  const stopTimer = () => {
    setElapsedTime(0);
    clearInterval(timer);
  };

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  //main code, the map, buttons and stats which will appear on screen
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapStyle}
            //initialRegion that the map will appear in, currently in San Francisco lol, this will be changed to the users current location once i have that working 
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={mapStyle}
          >
          </MapView>
        </View>    
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          //when the button is pressed it will go to the handleButtonPress function
          onPress={handleButtonPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{startStop}</Text>
        </TouchableOpacity>
      </View>
      {showStats && (
        //if showStats is true(this meaning the Start Run button has been clicked) then Time and Distance will be displayed
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
const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#f0f0f0' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#333333' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f0f0f0' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#666666' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#dcdcdc' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#333333' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#c0e7d2' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#333333' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#e5e5e5' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#333333' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#666666' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ color: '#c0c0c0' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#dcdcdc' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a2daf2' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#333333' }],
  },
];
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

