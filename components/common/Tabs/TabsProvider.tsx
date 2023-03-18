import React, { useCallback } from "react";
import { useState, useRef, useContext, useMemo, ReactNode } from "react";

interface ContextType {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
}
const TabsContext = React.createContext<Partial<ContextType>>({});
interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export const TabsProvider = ({ children }: Props) => {
  const [value, setTabNumber] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };
  const providedValue = { value, handleChange, setTabNumber };
  return (
    <TabsContext.Provider value={providedValue}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  return useContext(TabsContext) as ContextType;
};
