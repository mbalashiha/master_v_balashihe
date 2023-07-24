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
import { WizValues } from "./Providers/wiztypes";

const Step1: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Что за устройство? С чем нужна помощь?";
  const [field, meta] = useField(stepName);
  return (
    <WizFormControl>
      <FormLabel id="step2_4">{stepName}</FormLabel>
      <RadioGroup
        aria-labelledby="выберите"
        sx={{ gap: "12px" }}
        {...field}
        onChange={(event) => {
          field.onChange(event);
          if (event.target.value) {
            props.goToNamedStep("Ремонтировали ли ранее устройство?");
          }
        }}
        onClick={(event) => {
          if (field.value) {
            props.goToNamedStep("Ремонтировали ли ранее устройство?");
          }
        }}
      >
        <RadioString value="Принтер или МФУ" />
        <RadioString value="Игровая приставка Sony PlayStation / Microsoft Xbox" />
        <RadioString value="Всё работает, но надо что-то установить или настроить" />
        <RadioString value="Настроить Интернет или WI-FI" />
        <RadioString value="Другое" />
      </RadioGroup>
    </WizFormControl>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default Step1;
