import React, { createContext, useState } from 'react';

// Create a shared context
export const ExplodeContext = createContext();

// Create a provider component
export const ExplodeContextProvider = ({ children }) => {
  const [exploded, setExploded] = useState(false);

  const triggerExplosion = () => {
    setExploded(true);
    alert('You lost!');
  };

  return (
    <ExplodeContext.Provider value={{ exploded, triggerExplosion }}>
      {children}
    </ExplodeContext.Provider>
  );
};
