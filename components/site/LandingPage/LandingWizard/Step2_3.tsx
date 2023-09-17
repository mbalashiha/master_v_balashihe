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

const Step2_1_3: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Что хотите сделать с вашим Mac?";
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
        <RadioString value="Починить Mac, а то не работает" />
        <RadioString value="Исправить ошибки или глюки" />
        <RadioString value="Установить Windows на Mac для работы и игр" />
        <RadioString value="Ускорить работу Mac" />
        <RadioString value="Настроить или проконсультироваться" />
        <RadioString value="Другое" />
      </RadioGroup>
    </WizFormControl>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default Step2_1_3;
