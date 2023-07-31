'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import Loader from "components/Loader";
import { STORAGE_KEYS } from "constants/storage";

export interface ContextValues {
  isLoaded: boolean;
  setIsLoaded: (flag: boolean) => void;
  isEntitled: boolean;
  setIsEntitled: (flag: boolean) => void;
}

const initialState: ContextValues = {
  isLoaded: false,
  setIsLoaded: () => undefined,
  isEntitled: false,
  setIsEntitled: () => undefined,
};

const AppContext = createContext<ContextValues>(initialState);
export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(initialState.isLoaded);
  const [isEntitled, setIsEntitled] = useState(initialState.isEntitled);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEYS.TOKEN)) setIsEntitled(true);
    setIsLoaded(true);
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      setIsLoaded,
      isEntitled,
      setIsEntitled
    }),
    [isLoaded, isEntitled]
  );

  return isLoaded ? (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  ) : (
    <Loader isCentered />
  );
}
