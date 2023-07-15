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

const Step1: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Ремонтировали ли ранее устройство?";
  const [field, meta] = useField(stepName);
  return (
    <WizFormControl>
      <FormLabel id="step1_3">{stepName}</FormLabel>
      <RadioGroup
        aria-labelledby=""
        sx={{ gap: "12px" }}
        {...field}
        onChange={(event) => {
          field.onChange(event);
          if (event.target.value) {
            props.goToNamedStep("Как срочно нужен мастер?");
          }
        }}
        onClick={(event) => {
          if (field.value) {
            props.goToNamedStep("Как срочно нужен мастер?");
          }
        }}
      >
        <RadioString value="Да, уже ремонтировали" />
        <RadioString value="Нет, это впервые" />
      </RadioGroup>
    </WizFormControl>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default Step1;
