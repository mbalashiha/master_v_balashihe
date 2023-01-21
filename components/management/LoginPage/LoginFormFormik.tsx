import React from "react";
import { MainActionButton } from "@components/ui";
import { Box, Card, Stack, TextField } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import Cookies from "js-cookie";
// import queryString from "query-string";
import { AFTER_LOGIN_BACKTO_URI } from "@framework/const";
import Typography from "@mui/material/Typography";
// import useSignIn from "@framework/commerce/management/use-sign-in";
import { useRouter } from "next/router";
import * as Yup from "yup";
import useErrorsProvider from "@components/ui/contexts/use-errors-context";
import { default as LoginForm } from "./LoginForm";
import { simpleEncrypt } from "@components/encryption/message-hmac-private-key";
// import useTokenInfo from "@framework/commerce/management/use-token-info";

import {
  useFormikContext,
  Form,
  Formik,
  useFormik,
  useField,
  FormikProps,
} from "formik";
const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Введите значение от 2 символов")
    .max(64, "Слишком длинное значение (больше 64 симовлов для логина)")
    .required("Введите логин (Ваше имя)"),
  password: Yup.string()
    .min(6, "Слишком короткий пароль (не менее 6 символов)")
    .max(128, "Слишком длинный пароль (более 128 символов)")
    .required("Укажите пароль"),
});
const LoginFormFormik = () => {
  // const trySignIn = useSignIn();
  const router = useRouter();
  const { errors, addError, resetErrors, removeErrorAlert } =
    useErrorsProvider();
  // const { data: tokenInfo, isValidating } = useTokenInfo();
  // React.useEffect(() => {
  //   if (!isValidating && tokenInfo && tokenInfo.id) {
  //     let redirectUrl = Cookies.get(AFTER_LOGIN_BACKTO_URI) || "/management";
  //     redirectUrl = Array.isArray(redirectUrl)
  //       ? redirectUrl.join("/")
  //       : redirectUrl;
  //     router.replace(redirectUrl, redirectUrl);
  //   }
  // }, [isValidating, tokenInfo, router]);
  const formikRef =
    React.useRef<FormikProps<{ login: string; password: string }>>();
  return (
    <Formik
      innerRef={formikRef as any}
      initialValues={{ login: "", password: "" }}
      onSubmit={async (values) => {
        console.log("f onsubmit:", values);
        try {
          // const { success, error } = await trySignIn(simpleEncrypt(values));
          // if (!success) {
          //   addError(
          //     error === "Authentification failed"
          //       ? "Вы ввели неверные логин и/или пароль"
          //       : error
          //       ? error
          //       : !success
          //       ? "Аутентификация не удалась"
          //       : "Нет сообщения об ошибке (("
          //   );
          //   formikRef.current?.setFieldValue("password", "");
          // } else {
          //   let redirectUrl =
          //     Cookies.get(AFTER_LOGIN_BACKTO_URI) || "/management";
          //   redirectUrl = Array.isArray(redirectUrl)
          //     ? redirectUrl.join("/")
          //     : redirectUrl;
          //   router.replace(redirectUrl, redirectUrl);
          // }
        } catch (e: any) {
          console.error(e.stack || e.message || e);
        }
      }}
      validationSchema={SignupSchema}
      validateOnMount={false}
      validateOnChange={true}
      validateOnBlur={true}
    >
      <Form>
        <LoginForm></LoginForm>
      </Form>
    </Formik>
  );
};
export default LoginFormFormik;
