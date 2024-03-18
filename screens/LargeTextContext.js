import React, { createContext, useState, useContext } from 'react';

const LargeTextContext = createContext();

export const LargeTextProvider = ({ children }) => {
  const [isLargeText, setLargeText] = useState(false);

  return (
    <LargeTextContext.Provider value={{ isLargeText, setLargeText }}>
      {children}
    </LargeTextContext.Provider>
  );
};

export const useLargeText = () => useContext(LargeTextContext);