import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';

//initialise variables
const RunningScreen = () => {
  const { isDark } = useDarkMode();
  const { isLargeText } = useLargeText();
  const [showStats, setStats] = useState(false);
  const [startStop, setStartStop] = useState("Start Run");
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [LATITUDE, setLAT] = useState(39.0973);
  const [LONGITUDE, setLONG] = useState(-82.9860);
  const [startLAT, setSLAT] = useState(null);
  const [startLONG, setSLONG] = useState(null);
  const [locationInterval, setLocationInterval] = useState(null);

  //styles
  //dark mode style taken from https://developers.google.com/maps/documentation/javascript/examples/style-selector
  const mapStyle = isDark ? [
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
  ] : [];

  const styles = StyleSheet.create({
    mapContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderColor: isDark ? '#fff' : '#000', 
      borderWidth: 1,
      height: Dimensions.get('window').height * 0.6,
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
      bottom: Dimensions.get('window').height * 0.295,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    helpButtonContainer: {
      position: 'absolute',
      bottom: Dimensions.get('window').height * 0.09,
      left: 0,
      right: 0,
      margin: 10,
      alignItems: 'flex-end',
    },
    button: {
      borderColor: isDark ? '#fff' : '#000',
      borderWidth: 1,
      backgroundColor: '#ADD8E6',
      width: Dimensions.get('window').width * 0.5,
      padding: 10,
      borderRadius: 20,
    },
    helpButton: {
      borderColor: isDark ? '#fff' : '#000',
      borderWidth: 1,
      backgroundColor: '#ADD8E6',
      width: Dimensions.get('window').width * 0.1,
      padding: 10,
      borderRadius: 20,
    },
    buttonText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 18,
    },
    statsContainer: {
      position: 'absolute',
      width: Dimensions.get('window').width * 0.6,
      bottom: Dimensions.get('window').height * 0.1,
      left: '50%', 
      marginLeft: -Dimensions.get('window').width * 0.3,
      alignItems: 'center',
      backgroundColor: '#ADD8E6',
      borderColor: isDark ? '#fff' : '#000',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 15,
    
    },
    statsText: {
      color: 'black',
      fontSize: isLargeText ? 24 : 18,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: isDark ? '#191919' : '#fff',
    },
    text: {
      color: isDark ? '#fff' : '#000',
      fontSize: isLargeText ? 24 : 18,
      marginBottom: 5,
      marginHorizontal: 5,
      textAlign: 'left'
    },
    heading: {
      color: isDark ? '#fff' : '#000',
      fontSize: isLargeText ? 40 : 24,
      marginBottom: 10,
      marginHorizontal: 10,
      textAlign: 'center'
    }
  });
  

  //code ran when the start button is pressed, which starts or stops the times depending on the current state
  const handleButtonPress = async () => {
    if (startStop === "Start Run") {
      //request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      //get location
      let location = await Location.getCurrentPositionAsync({});
      //set latitude and longitude to current location
      setLAT(location.coords.latitude);
      setLONG(location.coords.longitude);
      //set starting latitude and longitude to current location
      setSLAT(location.coords.latitude);
      setSLONG(location.coords.longitude);
      setStartStop("Stop Run");
      //displays time
      setStats(true);
      startTimer();
    } else {
      setStartStop("Start Run");
      setStats(false);
      stopTimer();
      //get current location and use it and the starting location to calculate the distance between the two points, side note: would have liked a far more detailed distance tracker but unfortunately due to the asynchronous nature of react variables it simply would not work
      let location = await Location.getCurrentPositionAsync({});
      let distance = calculateDistance(startLAT, startLONG, location.coords.latitude, location.coords.longitude);
      //sends an alert to the user upon completion of the run
      Alert.alert(
        'Run Completed',
        `Time: ${Math.floor(elapsedTime / 60).toFixed(0)} mins ${Math.floor(elapsedTime % 60).toFixed(0)} secs\nDistance between your start point and end point: ${(distance/1000).toFixed(2)} km`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  };


  //code ran when help button is clicked
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

  //starts a timer which increments every second
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

  //display the map, buttons and stats which will appear on screen
  return (
    <View style={styles.container}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          //region the map will appear in, latitude and longitude are constantly updating when in a run, latitude delta and longitude delta are a constant 0.0001
          region={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001,
          }}
          customMapStyle={mapStyle}>
          <Marker
          //generates marker that represents the user
            draggable
            coordinate={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
            }}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
          />
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          //start run button
          onPress={handleButtonPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{startStop}</Text>
        </TouchableOpacity>
      </View>
      {showStats && (
        //time, only displays when in run
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Time: {Math.floor(elapsedTime / 60).toFixed(0)} mins {Math.floor(elapsedTime % 60).toFixed(0)} secs</Text>
        </View>
      )}
      <View style={styles.helpButtonContainer}>
        <TouchableOpacity
          //help button
          onPress={help}
          style={styles.helpButton}
        >
          <Text style={styles.buttonText}>?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </View>
  );
};

export default RunningScreen;