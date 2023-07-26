import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Box, styled } from "@mui/material";
import util from "util";
import { Form, Formik, FormikProps } from "formik";
import { WizValues } from "./wiztypes";
import useSendEmail from "@framework/site/contact/use-send-email";
interface WizardContextType {
  isLastStep: boolean;
  emailSuccess: boolean;
  setIsLastStep: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: number;
  totalSteps: number;
  progressPercents: number;
  setProgress: ({
    currentStep,
    totalSteps,
  }: {
    currentStep: number;
    totalSteps: number;
  }) => void;
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
  const [emailSuccess, setEmailSuccess] = useState<boolean>(false);
  const [{ currentStep, totalSteps, progressPercents }, __setProgress] =
    useState<{
      currentStep: number;
      totalSteps: number;
      progressPercents: number;
    }>({} as any);
  const setProgress = useCallback(
    ({
      currentStep,
      totalSteps,
    }: {
      currentStep: number;
      totalSteps: number;
    }) => {
      totalSteps = totalSteps + 1;
      __setProgress({
        currentStep,
        totalSteps: totalSteps + 1,
        progressPercents: (currentStep / totalSteps) * 100,
      });
    },
    []
  );
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
          errors["Телефон"] = "Введите все цифры Вашего телефона";
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
          setEmailSuccess(true);
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
            emailSuccess,
            setEmailSuccess,
            currentStep,
            totalSteps,
            progressPercents,
            setProgress,
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
