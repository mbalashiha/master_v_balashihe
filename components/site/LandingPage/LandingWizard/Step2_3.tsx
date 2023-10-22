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
import useStepField from "./useStepField";

const getNextStep = (value: string | null): string | null =>
  "Ремонтировали ли ранее устройство?";
const Step2_1_3: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  setNextStepName,
  nextStepName,
  goToNamedStep,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Что хотите сделать с вашим Mac?";
  const { onChange, onClick, name, value, field, meta } = useStepField({
    stepName,
    nextStepName,
    goToNamedStep,
    setNextStepName,
    getNextStep,
  });
  return (
    <WizFormControl>
      <FormLabel id="step1_2">{stepName}</FormLabel>
      <RadioGroup
        aria-labelledby=""
        sx={{ gap: "12px" }}
        {...field}
        onChange={onChange}
        name={name}
        value={value}
        onClick={onClick}
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
