import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Box, styled } from "@mui/material";
import util from "util";
import { Form, Formik, FormikProps } from "formik";
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
function daysIntoYear(date: Date = new Date()) {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}
export const WizardProvider = ({ children }: Props) => {
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const initialValues: Partial<WizValues> = {
    privacyChecked: true,
    "Имя клиента": "",
    Телефон: "",
    promo: "Балашиха" + daysIntoYear(),
  };
  const sendEmail = useSendEmail();
  const formikRef = useRef<FormikProps<WizValues>>(null);
  useEffect(() => {
    if (isLastStep) {
      process.nextTick(() => {
        formikRef.current?.setErrors({});
      });
    }
  }, [isLastStep]);
  return (
    <Formik
      initialValues={initialValues as WizValues}
      innerRef={formikRef}
      validate={(values) => {
        const errors: any = {};
        if (!values.privacyChecked) {
          errors.privacyChecked = "Примите политику конфиденциальности";
        }
        if (!values.telephoneDigits || values.telephoneDigits.length < 11) {
          errors["Телефон"] = "Введите все цифры номера телефона";
        }
        return errors;
      }}
      onSubmit={async (values, ctx) => {
        const submitResult = await sendEmail(values);
        if (submitResult.error) {
          ctx.setFieldValue(
            "submitError",
            submitResult.error.startsWith("already has ")
              ? "Это сообщение уже было отправлено ранее"
              : submitResult.error
          );
        } else {
          if (values.submitError) {
            ctx.setFieldValue("submitError", null);
          }
        }
      }}
    >
      <Form>
        <WizardContext.Provider
          value={{
            isLastStep,
            setIsLastStep,
          }}
        >
          {children}
        </WizardContext.Provider>
      </Form>
    </Formik>
  );
};
export const useWizard = () => {
  return useContext(WizardContext) as WizardContextType;
};
