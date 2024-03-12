import * as React from 'react';
import {Text, View, Button} from "react-native";
import {useState} from "react";

function WeightsScreen(){
    const [exercise, setExercise] = useState('0');
    const [day, setDay] = useState(0);
    const [myArray] = useState([["SUN","","","","",""],["MON","","","","",""],["TUE","","","","",""],["WED","","","","",""],["THU","","","","",""],["FRI","","","","",""],["SAT","","","","",""]]);

    function addExer(){
        let changed = false;
        switch(exercise){
            case "1":
                for(let i = 1; i<6; i++){
                    if(myArray[day][i] === ""){
                        myArray[day][i] = "Bench Press"
                        changed = true;
                        alert("Bench Press added...");
                        break;
                    }
                }
                break;
            case "2":
                for(let i = 1; i<6; i++){
                    if(myArray[day][i] === ""){
                        myArray[day][i] = "Deadlift"
                        changed = true;
                        alert("Deadlift added...");
                        break;
                    }
                }
                break;
            case "3":
                for(let i = 1; i<6; i++){
                    if(myArray[day][i] === ""){
                        myArray[day][i] = "Squat"
                        changed = true;
                        alert("Squat added...");
                        break;
                    }
                }
                break;
            default:
                alert("You must select an exercise first!");
                changed = true;
                break;
        }
        if(changed === false){
            alert("Too many exercises today!");
        }
    }

    const remExer = (target) => {
        myArray[day][target] = "";
    }

    const rClickMe = () => {
        if(day === 6){
            setDay(0)
        }else{
            setDay(day+1)
        }
    }

    const lClickMe = () => {
        if(day === 0){
            setDay(6)
        }else{
            setDay(day-1)
        }
    }

    return (
        <View>
            <View style={[{flexDirection: "row", marginLeft: 20, justifyContent: 'space-evenly'}]}>
                <Button title="<" onPress={lClickMe}/>
                <Text style={[{marginTop: 5}]}>{myArray[day][0]}</Text>
                <Button title=">" onPress={rClickMe}/>
            </View>
            <hr style={{width: "100%"}}/>
            <View style={[{marginLeft: '30%', marginRight: '30%'}]}>
                <select
                    value={exercise}
                    onChange={e => setExercise(e.target.value)}
                >
                    <option value={'0'}>Select an exercise</option>
                    <option value={'1'}>Bench Press</option>
                    <option value={'2'}>Deadlift</option>
                    <option value={'3'}>Squat</option>
                </select>
                <Button onPress={addExer} title="+" style={[{width: 25}]}></Button>
                <Text>{myArray[day][1]}</Text>
                <Button onPress={remExer(1)} title="-"/>
                <hr style={{width: "100%"}}/>
                <Text>{myArray[day][2]}</Text>
                <Button onPress={remExer(2)} title="-"/>
                <hr style={{width: "100%"}}/>
                <Text>{myArray[day][3]}</Text>
                <Button onPress={remExer(3)} title="-"/>
                <hr style={{width: "100%"}}/>
                <Text>{myArray[day][4]}</Text>
                <Button onPress={remExer(4)} title="-"/>
                <hr style={{width: "100%"}}/>
                <Text>{myArray[day][5]}</Text>
                <Button onPress={remExer(5)} title="-"/>
                <hr style={{width: "100%"}}/>
            </View>
        </View>
    )
}

export default WeightsScreen;