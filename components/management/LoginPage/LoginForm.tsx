import { MainActionButton, TextField } from "@components/ui";
import { Box, Card, Stack } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import ClosableAlert from "@components/ui/ClosableAlert";
import { AlertTitle } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  useFormikContext,
  Form,
  Formik,
  useFormik,
  useField,
  FormikProps,
} from "formik";

const LoginForm = () => {
  const [loginField, { error: loginFieldError }] = useField("login");
  const [passwordField, { error: passwordFieldError }] = useField("password");
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        "& > *": { width: "100%" },
      }}
      direction={"column"}
      spacing={4}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography
        variant="h3"
        mt="0"
        pt="0"
        textTransform={"uppercase"}
        align="center"
        fontWeight={800}
        fontSize={"3rem"}
        sx={{
          color: "#3D3357",
        }}
      >
        Войти&nbsp;в&nbsp;
        <Box component="span" fontWeight="300">
          CMS
        </Box>
      </Typography>
      <Box height="4.3rem"></Box>
      <TextField
        label="Логин"
        {...loginField}
        error={!!loginFieldError}
        helperText={loginFieldError}
        required
      ></TextField>
      <TextField
        label="Пароль"
        type="password"
        {...passwordField}
        error={!!passwordFieldError}
        helperText={passwordFieldError}
        required
      ></TextField>
      <MainActionButton type="submit" loading={isSubmitting}>
        Авторизация
      </MainActionButton>
    </Stack>
  );
};

export default LoginForm;
