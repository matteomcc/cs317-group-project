import React, { createContext, useState, useContext } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);