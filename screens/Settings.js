import React from 'react';
import { View, Text } from 'react-native';
import { Toggle1, Toggle2 } from './components/Toggle';
import { useDarkMode } from './DarkModeContext';
//import { useAutoBright } from './AutoBrightContext'
import "./screens"

const SettingsScreen = () => {
  const { isDark, setIsDark } = useDarkMode();

  const{ isAutoBright, setAutoBright } = useAutoBright();

  return (
    <View>
      <div className='screen' data-theme={isDark ? 'dark' : 'light'}>
        <Text>
          <h1 className='title'>Update your setting here!</h1>
        </Text>
        <Toggle1 isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Toggle2 isChecked2={isAutoBright} handleChange2={() => setAutoBright(!isAutoBright)} />
      </div>
    </View>
  );
};

export default SettingsScreen;