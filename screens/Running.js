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
        <View style={styles.container}>
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
        <Text style={styles.statsText}>Time: {elapsedTime} s</Text>
        <Text style={styles.statsText}>Distance: {distance} km</Text>
      </View>
      )}
    </SafeAreaView>
  );
};
export default RunningScreen;
//styles
const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    width: Dimensions.get('window').width * 0.6,
    padding: 10,
    borderRadius: 5,
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

