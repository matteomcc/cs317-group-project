import * as React from 'react';
import {Text, View, Button,  TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from './DarkModeContext';
import { useLargeText } from './LargeTextContext';

const WeightsScreen = () => {
    const { isDark } = useDarkMode();
    const { isLargeText } = useLargeText();
    const [exercise, setExercise] = useState('1');
    const [num, setNum] = useState(0);
    const [day, setDay] = useState(0);
    const [myArray, setMyArray] = useState([
        ['SUN', ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]],
        ['MON', ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]],
        ['TUE', ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]],
        ['WED', ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]],
        ['THU', ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]],
        ['FRI', ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]],
        ['SAT', ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]]
    ]);

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

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('myArray');
            if (value !== null) {
                setMyArray(JSON.parse(value));
            }
        } catch (e) {
            console.log(e);
        }
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('myArray', jsonValue);
        } catch (e) {
            console.log(e);
        }
    }

    function addExer() {
        let changed = false;
        const newArray = [...myArray];
        switch (exercise) {
            case '1':
                for (let i = 1; i < 6; i++) {
                    if (myArray[day][i][0] === '') {
                        newArray[day][i][0] = 'Bench Press';
                        changed = true;
                        break;
                    }
                }
                break;
            case '2':
                for (let i = 1; i < 6; i++) {
                    if (myArray[day][i][0] === '') {
                        newArray[day][i][0] = 'Deadlift';
                        changed = true;
                        break;
                    }
                }
                break;
            case '3':
                for (let i = 1; i < 6; i++) {
                    if (myArray[day][i][0] === '') {
                        newArray[day][i][0] = 'Squat';
                        changed = true;
                        break;
                    }
                }
                break;
            default:
                alert('You must select an exercise first!');
                break;
        }
        if (!changed) {
            alert('Too many exercises today!');
        }else{
            setMyArray(newArray);
        }
    }

    const remExer = target => {
        const newArray = [...myArray];
        newArray[day][target] = ['',0];
        setMyArray(newArray);
    };

    const rClickMe = () => {
        if (day === 6) {
            setDay(0);
        } else {
            setDay(day + 1);
        }
    };

    const lClickMe = () => {
        if (day === 0) {
            setDay(6);
        } else {
            setDay(day - 1);
        }
    };

    const editWeight = (target, weight) => {
        if(!isNaN(weight)){
        const newArray = [...myArray];
        newArray[day][target][1] = weight;
        setMyArray(newArray);
        storeData(newArray);
        }else{
                const newArray = [...myArray];
                newArray[day][target][1] = '0';
                setMyArray(newArray);
                storeData(newArray);
            }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-evenly' }}>
                <Button title="<" onPress={lClickMe} />
                <Text style={{ marginTop: 5,  
                                color: isDark ? '#fff' : '#000',
                                fontSize: isLargeText ? 24 : 18,
                                marginBottom: 5,
                                marginHorizontal: 5,
                                textAlign:'left'
                }}>{myArray[day][0]}</Text>
                <Button title=">" onPress={rClickMe} />
            </View>
            <View style={{ marginHorizontal: '30%' }}>

                <Picker
                    style = {styles.text}
                    selectedValue={exercise}
                    onValueChange={(itemValue, itemIndex) => setExercise(itemValue)}>

                    <Picker.Item label="Bench Press" value="1" />
                    <Picker.Item label="Deadlift" value="2" />
                    <Picker.Item label="Squat" value="3" />
                </Picker>
                <Button onPress={addExer} title="+" />

                {[1, 2, 3, 4, 5].map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            value={myArray[day][item][1].toString()}
                            onChangeText={(text) => editWeight(item, parseInt(text))}
                            style={{width:50,  
                                color: isDark ? '#fff' : '#000',
                                fontSize: isLargeText ? 24 : 18,
                                marginBottom: 5,
                                marginHorizontal: 5,
                                textAlign:'left'}}
                            keyboardType={'numeric'}
                        />
                        <Text style = {styles.text}>{myArray[day][item][1] + "kg " +  myArray[day][item][0]}</Text>
                        <Button onPress={() => remExer(item)} title="-" />
                    </View>
                ))}
                <Text style = {styles.text}>*You must enter a weight value to save your exercises*</Text>
            </View>
        </View>
    );
};

export default WeightsScreen;
