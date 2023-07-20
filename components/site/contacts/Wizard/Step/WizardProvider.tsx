import React, { useContext, useState } from "react";
import { Button, Box, styled } from "@mui/material";
import util from "util";
import { Form, Formik } from "formik";
import { WizValues } from "./wiztypes";
import useSendEmail from "@framework/site/contact/use-send-email";
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
  const sendEmail = useSendEmail();
  return (
    <Formik
      initialValues={initialValues as WizValues}
      onSubmit={(values, ctx) => {
        return sendEmail(values);
      }}
    >
      <Form>
        <WizardContext.Provider value={{ isLastStep, setIsLastStep }}>
          {children}
        </WizardContext.Provider>
      </Form>
    </Formik>
  );
};
export const useWizard = () => {
  return useContext(WizardContext) as WizardContextType;
};
