import React, { createContext, useState, useContext } from 'react';

const AutoBrightContext = createContext();

export const AutoBrightProvider = ({ children }) => {
  const [isAutoBright, setAutoBright] = useState(false);

  return (
    <AutoBrightContext.Provider value={{ isAutoBright, setAutoBright }}>
      {children}
    </AutoBrightContext.Provider>
  );
};

export const useAutoBright = () => useContext(AutoBrightContext);