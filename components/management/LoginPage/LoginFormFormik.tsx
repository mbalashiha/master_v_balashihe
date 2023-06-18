import React from "react";
import { MainActionButton } from "@components/ui";
import { Box, Card, Stack, TextField } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { AFTER_LOGIN_BACKTO_URI } from "@framework/const";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { default as LoginForm } from "./LoginForm";
import useSignIn from "@framework/management/auth/use-sign-in";
import useTokenInfo from "@framework/management/auth/use-token-info";
import {
  useFormikContext,
  Form,
  Formik,
  useFormik,
  useField,
  FormikProps,
} from "formik";
import Cookies from "js-cookie";
import useFromLogin from "@common/management/utils/hooks/use-from-login";
import { useSnackbar } from "notistack";
import { useLoginProvider } from "@components/management/LoginLayout/LoginProvider";
import { locale } from "@utils/locale";
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
  const trySignIn = useSignIn();
  const { doRedirectAuthorized } = useLoginProvider();
  const { data: authInfo } = useTokenInfo();
  const formikRef =
    React.useRef<FormikProps<{ login: string; password: string }>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Formik
      innerRef={formikRef as any}
      initialValues={{ login: "", password: "" }}
      onSubmit={async (values) => {
        const { success, error } = await trySignIn(values);
        try {
          if (!success) {
            const errorAlertMessage =
              error === "Authentification failed"
                ? "Вы ввели неверные логин и/или пароль"
                : error
                ? error
                : !success
                ? "Аутентификация не удалась"
                : "Нет сообщения об ошибке ((";
            enqueueSnackbar(locale(errorAlertMessage.substring(0, 512)), {
              variant: "error",
            });
            formikRef.current
              ?.getFieldHelpers("login")
              .setError(locale(errorAlertMessage.substring(0, 512)));
          } else {
            closeSnackbar();
            doRedirectAuthorized();
          }
        } catch (e: any) {
          console.error(e.stack || e.message || e);
          enqueueSnackbar(
            locale((e.stack || e.message || e).substring(0, 512)),
            {
              variant: "error",
            }
          );
        }
      }}
      // validationSchema={SignupSchema}
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
