import { useField, useFormikContext } from "formik";
import * as React from "react";
import {
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
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
  Alert,
  FormHelperText,
} from "@mui/material";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import StyledLastStepStack from "./StyledLastStepStack";
import { StepWizardChildProps } from "@components/site/contacts/Wizard/Providers/MyStepWizard";
import { WizValues } from "@components/site/contacts/Wizard/Providers";

const ColBox = ({ sx, ...rest }: React.ComponentProps<typeof Stack>) => (
  <Stack
    sx={{
      ...sx,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
    {...rest}
  />
);
const LastStepSended: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
}: StepWizardChildProps) => {
  stepName = stepName || "Сейчас перезвоним и предложим выезд мастера";
  const formik = useFormikContext<WizValues>();
  return (
    <StyledLastStepStack
      sx={{
        textAlign: "center",
        py: { xs: "150px", sm: "200px" },
        px: { sm: "20px", md: "50px", lg: "120px" },
      }}
    >
      <ColBox>
        <Typography variant="h1">{`Спасибо. Скидка `}</Typography>
        <Typography variant="h1">
          {`${formik.values.promo} сохранена.`}
        </Typography>
      </ColBox>
      <ColBox>
        <Typography variant="h5">
          Сейчас перезвоним и предложим выезд мастера для ремонта. Ваша скидка
          действует при заказе работ от трех тысяч, и позволяет сэкономить 25%
          стоимости. <br />
          Ожидайте звонка ;-)
        </Typography>
      </ColBox>
    </StyledLastStepStack>
  );
}) as any;
export default LastStepSended;
