import * as React from 'react';
import {Text, View, Image, Button, TextInput} from "react-native";
import {useState} from "react";

function clickMe(value){
    switch(value){
        case "1":
            alert("Bench Press added...");
            break;
        case "2":
            alert("Deadlift added...");
            break;
        case "3":
            alert("Squat added...");
            break;
        default:
            alert("You must select an exercise first!");
            break;
    }
}

const styles ={
    Button:{
        width: "30%"
    }
}

function WeightsScreen(){
    const [day, setDay] = useState('SUN');
    const myArray = [];
    const lClickMe =() => {
        switch (day) {
            case 'SUN':
                setDay('SAT')
                break;
            case 'MON':
                setDay('SUN')
                break;
            case 'TUE':
                setDay('MON')
                break;
            case 'WED':
                setDay('TUE')
                break;
            case 'THU':
                setDay('WED')
                break;
            case 'FRI':
                setDay('THU')
                break;
            case 'SAT':
                setDay('FRI')
                break;
        }
    }

    const rClickMe = () => {
        switch (day) {
            case 'SUN':
                setDay('MON')
                break;
            case 'MON':
                setDay('TUE')
                break;
            case 'TUE':
                setDay('WED')
                break;
            case 'WED':
                setDay('THU')
                break;
            case 'THU':
                setDay('FRI')
                break;
            case 'FRI':
                setDay('SAT')
                break;
            case 'SAT':
                setDay('SUN')
                break;
        }
    }

    return (
        <View>
            <View style={[{flexDirection: "row", marginLeft: 20, justifyContent: 'space-evenly'}]}>
                <Button title="<" onPress={lClickMe}/>
                <Text style={[{marginTop: 5}]}>{day}</Text>
                <Button title=">" onPress={rClickMe}/>
            </View>
            <hr style={{width: "100%"}}/>

        </View>
    )
}

export default WeightsScreen;