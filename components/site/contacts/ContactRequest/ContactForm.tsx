import { useField, useFormikContext } from "formik";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { IMaskInput } from "react-imask";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import {
  Stack,
  Box,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Checkbox,
  Link as MuiLink,
  AlertTitle,
  FormHelperText,
  Divider,
  InputLabel,
  Container,
  Alert,
  InputBaseComponentProps,
} from "@mui/material";
import { ContactRequestValues } from "./FormikForRequest";
import { StepWizardChildProps } from "../Wizard/Providers/MyStepWizard";
import ColBox from "./ColBox";
import { useImperativeHandle, useRef } from "react";
const MaskContext = React.createContext({ mask: "", hasEmailValue: false });
const MaskProvider = ({
  mask,
  hasEmailValue,
  children,
}: {
  mask: string;
  hasEmailValue: boolean;
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <MaskContext.Provider value={{ mask, hasEmailValue }}>
      {children}
    </MaskContext.Provider>
  );
};
const useMask = () => {
  return React.useContext(MaskContext);
};
type PhoneMaskProps = InputBaseComponentProps & {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};
const PhoneMaskCustom = React.forwardRef<
  HTMLInputElement | null,
  PhoneMaskProps
>(function PhoneMaskCustom({ onChange, ...other }, ref) {
  const { mask, hasEmailValue } = useMask();
  const pattern = React.useMemo(
    () =>
      mask
        .replaceAll(/[\{\}]/gim, "")
        .replaceAll(/[\+\(\)]/gim, "\\$&")
        .replaceAll("0", "\\d"),
    [mask]
  );
  const [telephoneDigitsField, telephoneDigitsMeta] =
    useField("telephoneDigits");
  const inputRef = useRef<HTMLInputElement>(null);
  const hasTelInputRef = Boolean(inputRef.current);
  React.useEffect(() => {
    if (hasTelInputRef) {
      const telInput =
        inputRef.current?.querySelector("input") || inputRef.current;
      if (telInput) {
        if (hasEmailValue) {
          telInput.removeAttribute("pattern");
        } else {
          telInput.pattern = pattern;
        }
      }
    }
  }, [hasTelInputRef, hasEmailValue, pattern]);
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => {
      return hasTelInputRef
        ? inputRef.current?.querySelector("input") || inputRef.current
        : null;
    },
    [hasTelInputRef]
  );
  return (
    <IMaskInput
      {...other}
      mask={mask}
      lazy={false}
      inputRef={inputRef}
      onAccept={(value) => {
        onChange({ target: { name: other.name, value } });
        telephoneDigitsField.onChange({
          target: {
            name: telephoneDigitsField.name,
            value: value.replace(/[^\d]/gim, ""),
          },
        });
      }}
      overwrite
    />
  );
});
const PhoneTextField = ({
  hasEmailValue,
  ...props
}: React.ComponentProps<typeof TextField> & { hasEmailValue: boolean }) => {
  return (
    <MaskProvider hasEmailValue={hasEmailValue} mask="+{7} (000) 000-00-00">
      <TextField
        {...props}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocalPhoneRoundedIcon />
            </InputAdornment>
          ),
          inputComponent: PhoneMaskCustom,
        }}
      />
    </MaskProvider>
  );
};
const ContactForm: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  const formik = useFormikContext<ContactRequestValues>();
  /* const submitDisabled =
    !(formik.isValid && formik.dirty) || formik.isSubmitting; */
  const submitDisabled = formik.isSubmitting;
  const [clientNameField, clientNameMeta] = useField("Имя клиента");
  const [emailField, emailMeta] = useField("Email клиента");
  const [phoneField, phoneMeta] = useField("Телефон");
  const [commentField, commentMeta] = useField("Комментарий");
  const [privacyChecked, privacyCheckedMeta] = useField("privacyChecked");
  return (
    <ColBox>
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          sx={{ fontSize: "36px", lineHeight: "44px", textAlign: "center" }}
        >
          Запись к мастеру на консультацию
        </Typography>
        <Typography sx={{ textAlign: "center", "&&&": { marginTop: "6px" } }}>
          После оформления заявки я перезвоню вам в течение 30 минут в рабочее
          время
        </Typography>
      </Container>
      {formik.values.submitError && (
        <Alert
          sx={{ width: "100%" }}
          severity={!submitDisabled ? "error" : "warning"}
        >
          <div>Произошла ошибка отправки сообщения:</div>
          <strong>{formik.values.submitError}</strong>
        </Alert>
      )}
      <TextField
        {...clientNameField}
        sx={{ "&&&": { marginTop: "6px" } }}
        error={Boolean(clientNameMeta.error)}
        helperText={clientNameMeta.error}
        placeholder="Ваше имя"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon />
            </InputAdornment>
          ),
        }}
      />
      <PhoneTextField
        {...phoneField}
        error={Boolean(phoneMeta.error)}
        helperText={phoneMeta.error}
        hasEmailValue={Boolean(emailField.value)}
      />
      <TextField
        {...emailField}
        error={Boolean(emailMeta.error)}
        helperText={emailMeta.error}
        placeholder={
          Boolean(emailMeta.error) ? "Email" : "Email (можно не указывать)"
        }
        sx={{
          "&&& .FormHelperText-root": {
            height: "auto",
            minHeight: "10px",
          },
        }}
        InputProps={{
          type: "email",
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          width: "100%",
          "&&&": { marginTop: "4px" },
          "& > div": { width: "100%" },
          "&&& .FormHelperText-root": {
            height: "auto",
            minHeight: "10px",
          },
        }}
      >
        <InputLabel
          htmlFor="contact-request-comment-field"
          sx={{
            fontSize: "18px",
            mb: "3px",
            pl: "20px",
          }}
        >
          Ваше сообщение
          <Box
            component="span"
            sx={{ opacity: Boolean(commentMeta.error) ? 1 : 0 }}
          >
            *
          </Box>
        </InputLabel>
        <TextField
          {...commentField}
          multiline
          minRows={3}
          maxRows={10}
          error={Boolean(commentMeta.error)}
          helperText={commentMeta.error}
          placeholder="Опишите Вашу проблему"
          InputProps={{ id: "contact-request-comment-field", required: true }}
        />
      </Box>
      <FormControl sx={{ "&&&": { marginTop: 0 } }}>
        {privacyCheckedMeta.error && (
          <FormHelperText
            sx={{ ml: "0px", mt: "0px", fontWeight: 500 }}
            error={Boolean(privacyCheckedMeta.error)}
          >
            {privacyCheckedMeta.error}
          </FormHelperText>
        )}
        <FormControlLabel
          sx={{
            alignItems: "flex-start",
            "& .FormControlLabel-asterisk": {
              display: "none",
            },
          }}
          control={
            <Checkbox
              {...privacyChecked}
              checked={Boolean(privacyChecked.value)}
              size="small"
              required
              onChange={(event, checked) => {
                Object.assign(event.target, { value: checked });
                privacyChecked.onChange(event);
              }}
            />
          }
          label={
            <>
              <Box
                sx={{
                  pt: "8px",
                  fontSize: "13px",
                  lineHeight: "16px",
                  fontWeight: 700,
                }}
              >
                Согласен на обработку персональных данных и принимаю{" "}
                <MuiLink
                  target={"_blank"}
                  href="https://ru.envybox.io/agreement/quiz/52973/35829/"
                >
                  {" "}
                  условия соглашения{" "}
                </MuiLink>
              </Box>
            </>
          }
        />
      </FormControl>
      <Button
        type="submit"
        disabled={submitDisabled}
        sx={{
          width: "100%",
          "&&&": { marginTop: "12px" },
          py: "14px",
          px: { xs: "6px", md: "40px" },
          background: (theme) =>
            !(formik.isValid && formik.dirty)
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          border: "none",
          borderRadius: "9px",
          fontSize: "16px",
          lineHeight: "25px",
          "&, && > *": {
            color: "white",
          },
          "&:hover": {
            background: (theme) =>
              !(formik.isValid && formik.dirty)
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
            "&, && > *": {
              color: "black",
            },
          },
        }}
      >
        Оставить заявку
      </Button>
    </ColBox>
  );
}) as any;
export default ContactForm;
