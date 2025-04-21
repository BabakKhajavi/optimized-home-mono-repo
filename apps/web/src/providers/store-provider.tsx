'use client';

import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

interface StoreContextProps {
  isSideMenuOpen: boolean;
  toggleSideMenu: () => void;
  // Add more state or methods as needed
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  return (
    <StoreContext.Provider value={{ isSideMenuOpen, toggleSideMenu }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
