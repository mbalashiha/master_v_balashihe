import React, { useContext, useState } from "react";
import { Button, Box, styled } from "@mui/material";
import util from "util";
import { Formik } from "formik";
import { WizValues } from "./wiztypes";
interface WizardContextType {
  isLastStep: boolean;
  setIsLastStep: React.Dispatch<React.SetStateAction<boolean>>;
}
const WizardContext = React.createContext<Partial<WizardContextType>>({});
interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export const WizardProvider = ({ children }: Props) => {
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const initialValues: Partial<WizValues> = {};
  return (
    <Formik initialValues={initialValues} onSubmit={(values, ctx) => {}}>
      <WizardContext.Provider value={{ isLastStep, setIsLastStep }}>
        {children}
      </WizardContext.Provider>
    </Formik>
  );
};
export const useWizard = () => {
  return useContext(WizardContext) as WizardContextType;
};
