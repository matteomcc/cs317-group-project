import * as React from 'react';
import { View, Text } from "react-native";

function clickMe(){
    alert("Exercise Added...");
}

function WeightsScreen(){
    return(
        <table>
            <tbody>
            <tr>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
            </tr>
            <tr>
                <th>-----------</th>
                <th>-----------</th>
                <th>-----------</th>
                <th>-----------</th>
                <th>-----------</th>
                <th>-----------</th>
                <th>-----------</th>
            </tr>
            <tr>
            <th>
                    <label>
                        Add an exercise:
                    </label>
                    <button onClick={clickMe}>+</button>
                </th>
                <th>
                    <label>
                        Add an exercise:
                    </label>
                    <button onClick={clickMe}>+</button>
                </th>
                <th>
                    <label>
                        Add an exercise:
                    </label>
                    <button onClick={clickMe}>+</button>
                </th>
                <th>
                    <label>
                        Add an exercise:
                    </label>
                    <button onClick={clickMe}>+</button>
                </th>
                <th>
                    <label>
                        Add an exercise:
                    </label>
                    <button onClick={clickMe}>+</button>
                </th>
                <th>
                    <label>
                        Add an exercise:
                    </label>
                    <button onClick={clickMe}>+</button>
                </th>
                <th>
                    <label>
                        Add an exercise:
                    </label>
                    <button onClick={clickMe}>+</button>
                </th>
            </tr>
            </tbody>
        </table>
    )
}

export default WeightsScreen;