import { useField } from "formik";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { StepWizardChildProps } from "@components/site/contacts/Wizard/Providers/MyStepWizard";
import WizFormControl from "@components/site/contacts/Wizard/WizFormControl";
import RadioString from "@components/site/contacts/Wizard/RadioString";

const Step1: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Что сейчас с вашей техникой?";
  const [field, meta] = useField(stepName);
  return (
    <WizFormControl>
      <FormLabel id="step1_2">{stepName}</FormLabel>
      <RadioGroup
        aria-labelledby=""
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
        <RadioString value="Не включается или не запускается" />
        <RadioString value="Проблемы при работе, глюки и прочее" />
        <RadioString value="Всё хорошо, но надо что-то установить или настроить" />
        <RadioString value="Разбили экран / уронили / залили водой..." />
        <RadioString value="Что-то другое" />
      </RadioGroup>
    </WizFormControl>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default Step1;
