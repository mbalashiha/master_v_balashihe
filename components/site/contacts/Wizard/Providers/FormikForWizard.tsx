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
import { StepWizardChildProps } from "./MyStepWizard";
import { daysIntoYear } from "@lib";
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
type Props = StepWizardChildProps & {
  children: React.ReactNode | React.ReactNode[];
};
export const FormikForWizard: React.FC<any> = ({
  children,
  goToNamedStep,
  goToStep,
  currentStep,
}: Props) => {
  const initialValues: Partial<WizValues> = {
    privacyChecked: true,
    "Имя клиента": "",
    Телефон: "",
    promo: "Балашиха" + daysIntoYear(),
  };
  const sendEmail = useSendEmail();
  const formikRef = useRef<FormikProps<WizValues>>(null);
  useEffect(() => {
    if (currentStep && Object.entries(formikRef.current?.errors || {}).length) {
      process.nextTick(() => {
        formikRef.current?.setErrors({});
      });
    }
  }, [currentStep]);
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
        } else if (!submitResult.success) {
          ctx.setFieldValue(
            "submitError",
            "Произошла ошибка обращения к серверу: статус " +
              submitResult.status.toString()
          );
        } else {
          goToNamedStep("Сейчас перезвоним и предложим выезд мастера");
          if (values.submitError) {
            ctx.setFieldValue("submitError", null);
          }
        }
      }}
    >
      <Form>{children}</Form>
    </Formik>
  );
};
export default FormikForWizard;
