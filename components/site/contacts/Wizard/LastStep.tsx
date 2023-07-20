import { useField } from "formik";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WizFormControl from "./WizFormControl";
import { StepWizardChildProps } from "react-step-wizard";
import { IMaskInput } from "react-imask";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

import RadioString from "./RadioString";
import { StyledContainer } from "./Step";
import {
  Stack,
  Box,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Checkbox,
  Link as MuiLink,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DiscountIcon from "@mui/icons-material/Discount";

interface PhoneMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const PhoneMaskCustom = React.forwardRef<HTMLInputElement, PhoneMaskProps>(
  function PhoneMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+{7} (000) 000-00-00"
        lazy={false}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  }
);
const ColBox = ({ sx, ...rest }: React.ComponentProps<typeof Stack>) => (
  <Stack
    sx={{
      ...sx,
      "&, & .InputBase-root": {
        minWidth: "283px",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
    {...rest}
  />
);
const LastStep = ({ stepName }: { stepName?: string }) => {
  stepName = stepName || "Оставьте заявку на ремонт со скидкой";
  const [clientNameField, clientNameMeta] = useField("Имя клиента");
  const [phoneField, phoneMeta] = useField("Телефон");
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "596px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      spacing={2}
    >
      <ColBox
        sx={{
          "& h3": {
            fontSize: { xs: "18px", sm: "21px" },
            lineHeight: { xs: "23px", sm: "30px" },
          },
        }}
      >
        <Typography variant="h3">
          Скидка начислена, сохраните промокод :)
        </Typography>
        <Typography variant="h3">
          Оставьте здесь заявку на ремонт со скидкой
        </Typography>
      </ColBox>
      <ColBox spacing={1}>
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
          >
            Сохранить скидку!
          </Button>
          <FormControl>
            <FormControlLabel
              sx={{ alignItems: "flex-start" }}
              control={<Checkbox defaultChecked size="small" />}
              label={
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
              }
            />
          </FormControl>
        </ColBox>
      </ColBox>
    </Stack>
  );
};
export default LastStep;
