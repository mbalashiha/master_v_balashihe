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
  "Оставьте заявку на ремонт со скидкой";
const Step1: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  setNextStepName,
  nextStepName,
  goToNamedStep,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Как срочно нужен мастер?";
  const { onChange, onClick, name, value, field, meta } = useStepField({
    stepName,
    nextStepName,
    goToNamedStep,
    setNextStepName,
    getNextStep,
  });
  return (
    <WizFormControl>
      <FormLabel id="step4">{stepName}</FormLabel>
      <RadioGroup
        aria-labelledby=""
        sx={{ gap: "12px" }}
        {...field}
        onChange={onChange}
        name={name}
        value={value || null}
        onClick={onClick}
      >
        <RadioString value="В ближайшие 1-2 часа" />
        <RadioString value="Можно вечером" />
        <RadioString value="Не важно, можно не сегодня" />
      </RadioGroup>
    </WizFormControl>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default Step1;
