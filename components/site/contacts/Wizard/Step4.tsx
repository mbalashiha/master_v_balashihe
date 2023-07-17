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
import { useWizard } from "./Step/WizardProvider";

const Step1: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  const { isLastStep, setIsLastStep } = useWizard();
  stepName = stepName || "Как срочно нужен мастер?";
  const [field, meta] = useField(stepName);
  return (
    <WizFormControl>
      <FormLabel id="step4">{stepName}</FormLabel>
      <RadioGroup
        aria-labelledby=""
        sx={{ gap: "12px" }}
        {...field}
        onChange={(event) => {
          field.onChange(event);
          if (event.target.value) {
            setIsLastStep(true);
            // props.goToNamedStep("Оставьте заявку на ремонт со скидкой");
          }
        }}
        onClick={(event) => {
          if (field.value) {
            setIsLastStep(true);
            // props.goToNamedStep("Оставьте заявку на ремонт со скидкой");
          }
        }}
      >
        <RadioString value="В ближайшие 1-2 часа" />
        <RadioString value="Можно вечером" />
        <RadioString value="Не важно, можно не сегодня" />
      </RadioGroup>
    </WizFormControl>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default Step1;
