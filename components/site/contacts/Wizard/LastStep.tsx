import { useField } from "formik";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WizFormControl from "./WizFormControl";
import { StepWizardChildProps } from "react-step-wizard";
import RadioString from "./RadioString";
import { StyledContainer } from "./Step";
import { Box, Typography } from "@mui/material";

const LastStep: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Оставьте заявку на ремонт со скидкой";
  const [field, meta] = useField(stepName);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "596px",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3">
        Скидка начислена, сохраните промокод :)
      </Typography>
      <Typography variant="h3">Оставьте здесь заявку на ремонт со скидкой
      </Typography>
    </Box>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default LastStep;
