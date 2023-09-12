import { useField, useFormikContext } from "formik";
import * as React from "react";
import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import LinkContactPhone from "../LinkContactPhone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { IMaskInput } from "react-imask";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import {
  InputLabel,
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
  Alert,
} from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import StyledLastStepStack from "../Wizard/StyledLastStepStack";
import WhatsappRow from "../Wizard/ModalContacts/WhatsappRow";
import EmailRow from "../Wizard/ModalContacts/EmailRow";
import TelegramRow from "../Wizard/ModalContacts/TelegramRow";
import PhoneRow from "../Wizard/ModalContacts/PhoneRow";
import { ContactRequestValues } from "./FormikForRequest";
import { StepWizardChildProps } from "../Wizard/Providers/MyStepWizard";

const ColContainer = ({ sx, ...rest }: React.ComponentProps<typeof Stack>) => (
  <Stack
    spacing={3}
    sx={{
      ...sx,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      "& div, & p, & h3, & label, & h1, & h5": {
        fontFamily: `var(--landing-font-family)`,
        color: "black",
        fontWeight: 400,
        textAlign: "center",
      },
      "& p": {
        fontSize: "14px",
        lineHeight: "22px",
      },
    }}
    {...rest}
  />
);

const RequestSended: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
}: StepWizardChildProps) => {
  stepName = stepName || "Сейчас перезвоним и предложим выезд мастера";
  const formik = useFormikContext<ContactRequestValues>();
  /* const submitDisabled =
    !(formik.isValid && formik.dirty) || formik.isSubmitting; */
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 1,
      }}
      spacing={5}
    >
      <ColContainer>
        <Typography variant="h1">
          {`Спасибо. Скидка `}
          <br />
          {`${formik.values.promo} сохранена.`}
        </Typography>
      </ColContainer>
      <ColContainer>
        <Typography variant="h5">
          Сейчас перезвоним и предложим выезд мастера для ремонта. Ваша скидка
          действует при заказе работ от трех тысяч, и позволяет сэкономить 25%
          стоимости. <br />
          Ожидайте звонка ;-)
        </Typography>
      </ColContainer>
      <ColContainer>
        <LinkContactPhone>
          <Stack direction="row" justifyContent={"center"} spacing={1}>
            <IconPhoneCircle
              sx={{ width: "52px", height: "52px" }}
              fill="#2e2d58"
            />
            <Typography variant="h1">
              {NEXT_PUBLIC_CONTACT_PHONE_TEXT}
            </Typography>
          </Stack>
        </LinkContactPhone>
      </ColContainer>
    </Stack>
  );
}) as any;
export default RequestSended;
