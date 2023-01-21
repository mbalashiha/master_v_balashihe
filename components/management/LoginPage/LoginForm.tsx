import { MainActionButton } from "@components/ui";
import { Box, Card, Stack, TextField } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import ClosableAlert from "@components/ui/ClosableAlert";
import { AlertTitle } from "@mui/material";
import Typography from "@mui/material/Typography";
import useErrorsProvider from "@components/ui/contexts/use-errors-context";
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
  const { errors, addError, resetErrors, removeErrorAlert } =
    useErrorsProvider();
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100%",
        "& > *": { width: "100%" },
        "& .MuiOutlinedInput-notchedOutline": {
          borderWidth: "2px",
          borderColor: "#3D3357",
        },
        "& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl:not(.Mui-focused):not(.Mui-error)":
          {
            color: "#3D3357",
          },
        "&& .MuiInputBase-input.MuiOutlinedInput-input": {
          color: "black",
        },
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
      >
        Войти&nbsp;в&nbsp;
        <Box component="span" fontWeight="300">
          CMS
        </Box>
      </Typography>
      {!errors || !errors.length ? (
        <Box height="4.3rem"></Box>
      ) : (
        <Box sx={{ maxHeight: "300px", overflow: "auto" }}>
          {errors.map((error, index) => (
            <ClosableAlert
              severity="error"
              onClose={() => removeErrorAlert(index)}
              shakingEffect={error.shakingEffect}
              key={error.additionalKey || index}
            >
              {error.header && <AlertTitle>{error.header}</AlertTitle>}
              {error.message}
              {error.stack && <pre>{error.stack}</pre>}
            </ClosableAlert>
          ))}
        </Box>
      )}
      <TextField
        sx={{ height: "3.2rem" }}
        label="Логин"
        variant="outlined"
        {...loginField}
        error={!!loginFieldError}
        helperText={loginFieldError}
        required
      ></TextField>
      <TextField
        sx={{ height: "3rem" }}
        label="Пароль"
        variant="outlined"
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
