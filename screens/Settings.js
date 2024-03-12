import React from 'react';
import { View, Text } from 'react-native';
import { Toggle } from './components/Toggle';
import { useDarkMode } from './DarkModeContext';
import "./screens"

const SettingsScreen = () => {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <View>
      <div className='screen' data-theme={isDark ? 'dark' : 'light'}>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Text>
          <h1 className='title'>Update your setting here!</h1>
        </Text>
      </div>
    </View>
  );
};

export default SettingsScreen;