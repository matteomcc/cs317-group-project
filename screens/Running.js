import React from 'react';
import { View, Text } from 'react-native';
import { useDarkMode } from './DarkModeContext';
//import { useAutoBright } from './AutoBrightContext'
import "./screens"

const RunningScreen = () => {
  const { isDark } = useDarkMode();

  /*
  const { isAutoBright } = useAutoBright();

  if (isAutoBright) {
    const sensor = new AmbientLightSensor();
    sensor.addEventListener("reading", (event) => {
      console.log("Current light level:", sensor.illuminance);
    });
    sensor.addEventListener("error", (event) => {
      console.log(event.error.name, event.error.message);
    });
    sensor.start();
  }
  */

  return (
    <View>
      <div className='screen' data-theme={isDark ? 'dark' : 'light'}>
        <Text>
          <h1 className='title'>Running Screen</h1>
        </Text>
      </div>
    </View>
  );
};

export default RunningScreen;