import React from 'react';
import { View, Text } from 'react-native';
import { useDarkMode } from './DarkModeContext';
import "./screens"

const ProfileScreen = () => {
  const { isDark } = useDarkMode();

  return (
    <View>
      <div className='screen' data-theme={isDark ? 'dark' : 'light'}>
        <Text>
          <h1 className='title'>Update your profile here</h1>
        </Text>
      </div>
    </View>
  );
};

export default ProfileScreen;