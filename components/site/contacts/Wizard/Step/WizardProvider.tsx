import React, { useContext, useState } from "react";
import { WizValues } from "../WizardProvider/wiztypes";
interface WizardContextType {
  prevStep: string | null | undefined;
  setPrevStep: React.Dispatch<React.SetStateAction<string | null | undefined>>;
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
