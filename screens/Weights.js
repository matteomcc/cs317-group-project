import * as React from 'react';
import {Text, View, Button, Picker, TextInput} from 'react-native';
import { useState } from 'react';

function WeightsScreen() {
    const [exercise, setExercise] = useState('0');
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
        const newArray = [...myArray];
        newArray[day][target][1] = weight;
        setMyArray(newArray);
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-evenly' }}>
                <Button title="<" onPress={lClickMe} />
                <Text style={{ marginTop: 5 }}>{myArray[day][0]}</Text>
                <Button title=">" onPress={rClickMe} />
            </View>
            <View style={{ marginHorizontal: '30%' }}>
                <Picker
                    selectedValue={exercise}
                    onValueChange={(itemValue, itemIndex) => setExercise(itemValue)}>
                    <Picker.Item label="Select an exercise" value="0" />
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
                            style={{width:50}}
                        />
                        <Text>{myArray[day][item][1] + "kg " +  myArray[day][item][0]}</Text>
                        <Button onPress={() => remExer(item)} title="-" />
                    </View>
                ))}
            </View>
        </View>
    );
}

export default WeightsScreen;