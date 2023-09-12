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
import { StepWizardChildProps } from "../Wizard/Providers/MyStepWizard";
import useSendRequest from "@framework/site/contact/use-send-request";
import { daysIntoYear } from "@lib";

type Props = StepWizardChildProps & {
  children: React.ReactNode | React.ReactNode[];
};
export interface ContactRequestValues {
  "Имя клиента": string;
  Телефон: string;
  Комментарий: string;
  privacyChecked?: boolean;
  telephoneDigits: string;
  submitError?: string;
  promo: string;
}
export const FormikForRequest: React.FC<Partial<Props>> = (({
  children,
  nextStep,
  currentStep,
}: Props) => {
  const initialValues: ContactRequestValues = {
    privacyChecked: true,
    "Имя клиента": "",
    Телефон: "",
    Комментарий: "",
    telephoneDigits: "",
    promo: "Балашиха" + daysIntoYear(),
  };
  const sendEmailRequest = useSendRequest();
  const formikRef = useRef<FormikProps<ContactRequestValues>>(null);
  return (
    <Formik
      initialValues={initialValues}
      innerRef={formikRef}
      validate={(values) => {
        const errors: any = {};
        if (!(values["Имя клиента"] || "").trim()) {
          errors["Имя клиента"] = "Введите Ваше имя";
        }
        if (!values.privacyChecked) {
          errors.privacyChecked = "Примите политику конфиденциальности";
        }
        if (!values.telephoneDigits || values.telephoneDigits.length < 11) {
          errors["Телефон"] = "Введите все цифры Вашего телефона";
        }
        if (!(values["Комментарий"] || "").trim()) {
          errors["Комментарий"] = "Введите комментарий";
        }
        return errors;
      }}
      onSubmit={async (values, ctx) => {
        const submitResult = await sendEmailRequest(values);
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
          nextStep();
          if (values.submitError) {
            ctx.setFieldValue("submitError", null);
          }
        }
      }}
    >
      <Form>{children}</Form>
    </Formik>
  );
}) as React.FC<Partial<Props>>;
export default FormikForRequest;
