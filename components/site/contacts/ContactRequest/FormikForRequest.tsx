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
import useSendRequest from "@framework/site/contact/use-send-request";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};
export interface ContactRequestValues {
  "Имя клиента": string;
  Телефон: string;
  comment: string;
  privacyChecked?: boolean;
  telephoneDigits: string;
  submitError?: string;
}
export const FormikForRequest: React.FC<any> = ({ children }: Props) => {
  const initialValues: ContactRequestValues = {
    privacyChecked: true,
    "Имя клиента": "",
    Телефон: "",
    comment: "",
    telephoneDigits: "",
  };
  const sendEmailRequest = useSendRequest();
  const formikRef = useRef<FormikProps<ContactRequestValues>>(null);
  return (
    <Formik
      initialValues={initialValues}
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
        const submitResult = await sendEmailRequest(values);
        if (submitResult.error) {
          ctx.setFieldValue(
            "submitError",
            submitResult.error.startsWith("already has ")
              ? "Это сообщение уже было отправлено ранее"
              : submitResult.error
          );
        }
        if (!submitResult.success) {
          ctx.setFieldValue(
            "submitError",
            "Произошла ошибка обращения к серверу: статус " +
              submitResult.status.toString()
          );
        } else {
          // goToNamedStep("Сейчас перезвоним и предложим выезд мастера");
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
export default FormikForRequest;
