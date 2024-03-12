import React from 'react';
import { View, Text } from 'react-native';
import { useDarkMode } from './DarkModeContext';
import "./screens"

const RunningScreen = () => {
  const { isDark } = useDarkMode();

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