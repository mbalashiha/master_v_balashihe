import React, { useContext, useState } from "react";
import { WizValues } from "./wiztypes";
interface WizardContextType {
  prevStep: number | null | undefined;
  setPrevStep: React.Dispatch<React.SetStateAction<number | null | undefined>>;
}
const WizardContext = React.createContext<Partial<WizardContextType>>({
  prevStep: null,
});
interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export const WizardProvider = ({ children }: Props) => {
  const [prevStep, setPrevStep] = useState<WizardContextType["prevStep"]>(null);
  return (
    <WizardContext.Provider value={{ prevStep, setPrevStep }}>
      {children}
    </WizardContext.Provider>
  );
};
export const useWizard = () => {
  return useContext(WizardContext) as WizardContextType;
};
