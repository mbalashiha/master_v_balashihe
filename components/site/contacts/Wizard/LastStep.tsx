import { useField, useFormikContext } from "formik";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WizFormControl from "./WizFormControl";
import { IMaskInput } from "react-imask";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import Alert from "@mui/material/Alert";

import RadioString from "./RadioString";
import { StyledContainer, WizValues } from "./Providers";
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
} from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import PhoneRow from "./ModalContacts/PhoneRow";
import EmailRow from "./ModalContacts/EmailRow";
import StyledLastStepStack from "./StyledLastStepStack";
import TelegramRow from "./ModalContacts/TelegramRow";
import WhatsappRow from "./ModalContacts/WhatsappRow";
import { StepWizardChildProps } from "./Providers/MyStepWizard";

interface PhoneMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const PhoneMaskCustom = React.forwardRef<HTMLInputElement, PhoneMaskProps>(
  function PhoneMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    const [telephoneDigitsField, telephoneDigitsMeta] =
      useField("telephoneDigits");
    return (
      <IMaskInput
        {...other}
        mask="+{7}(000)000-00-00"
        lazy={false}
        inputRef={ref}
        onAccept={(value) => {
          onChange({ target: { name: props.name, value } });
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
  }
);
const ColBox = ({ sx, ...rest }: React.ComponentProps<typeof Stack>) => (
  <Stack
    sx={{
      ...sx,
      "& .InputBase-root": {
        width: "283px",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
    {...rest}
  />
);
const LastStep: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
}: StepWizardChildProps) => {
  stepName = stepName || "Оставьте заявку на ремонт со скидкой";
  const formik = useFormikContext<WizValues>();
  /* const submitDisabled =
    !(formik.isValid && formik.dirty) || formik.isSubmitting; */
  const submitDisabled = formik.isSubmitting;
  const [clientNameField, clientNameMeta] = useField("Имя клиента");
  const [phoneField, phoneMeta] = useField("Телефон");
  const [privacyChecked, privacyCheckedMeta] = useField("privacyChecked");
  return (
    <StyledLastStepStack>
      <Box sx={{ alignSelf: "center" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 0.5, md: 2 }}
        >
          <Stack direction={"row"} spacing={{ xs: 0.5, md: 2 }}>
            <EmailRow />
            <TelegramRow />
          </Stack>
          <WhatsappRow />
        </Stack>
        <Divider
          sx={{
            mt: { xs: "10px", md: "18px" },
            mb: { xs: "4px", md: "10px" },
          }}
        />
      </Box>
      <ColBox
        sx={{
          pt: 3,
          "& h3": {
            textAlign: "center",
            fontSize: { xs: "25px", sm: "30px" },
            lineHeight: { xs: "29px", sm: "40px" },
          },
        }}
      >
        <Typography variant="h3">
          Скидка начислена, сохраните промокод.
          <br />
          Можете оставить здесь заявку на ремонт со скидкой.
        </Typography>
      </ColBox>
      <Box sx={{ pr: "15px" }}>
        <PhoneRow />
      </Box>
      <ColBox spacing={1}>
        {formik.values.submitError && (
          <Alert severity={!submitDisabled ? "error" : "warning"}>
            <div>Произошла ошибка отправки сообщения:</div>
            <strong>{formik.values.submitError}</strong>
          </Alert>
        )}
        <TextField
          {...clientNameField}
          error={Boolean(clientNameMeta.error)}
          helperText={clientNameMeta.error}
          placeholder="Ваше имя"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          {...phoneField}
          error={Boolean(phoneMeta.error)}
          helperText={phoneMeta.error}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneRoundedIcon />
              </InputAdornment>
            ),
            inputComponent: PhoneMaskCustom as any,
          }}
        />
        <ColBox spacing={"6px"}>
          <Button
            startIcon={<DiscountIcon />}
            sx={{ width: "100%", p: "7px" }}
            type="submit"
            disabled={submitDisabled}
          >
            Сохранить скидку!
          </Button>
          <Button
            type="submit"
            disabled={submitDisabled}
            sx={{
              width: "100%",
              fontWeight: 500,
              "&, &:hover": {
                background: "#FFE684",
              },
              borderRadius: "8px",
              padding: "6px 28px",
              textAlign: "left",
              border: "none",
              textTransform: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                lineHeight: "17px",
                "&&&&&": {
                  color: "grey",
                  fontWeight: 400,
                },
              }}
              component="div"
            >
              Ваш промокод
            </Typography>
            <Typography
              component="div"
              sx={{
                fontSize: "18px",
                lineHeight: "21px",
              }}
            >
              {formik.values.promo}
            </Typography>
          </Button>
          <FormControl>
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
                    Согласен на обработку
                    <br /> персональных данных и принимаю
                    <br />{" "}
                    <MuiLink href="https://ru.envybox.io/agreement/quiz/52973/35829/">
                      условия соглашения
                    </MuiLink>
                  </Box>
                </>
              }
            />
          </FormControl>
        </ColBox>
      </ColBox>
    </StyledLastStepStack>
  );
}) as any;
export default LastStep;
