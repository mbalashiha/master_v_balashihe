import { useField } from "formik";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WizFormControl from "./WizFormControl";
import { EnhImage } from "@components/ui";
import WizRadio from "./WizRadio";
import { StepWizardChildProps } from "react-step-wizard";
import { WizValues } from "./Providers/wiztypes";
import RadioImageLabel from "./RadioImageLabel";

const getNextStep = (
  value: WizValues["Какое у вас устройство?"]
): string | null => {
  switch (value) {
    case "Настольный ПК":
    case "Ноутбук":
      return "Что сейчас с вашей техникой?";
      break;
    case "Apple Mac":
      return "Что хотите сделать с вашим Mac?";
      break;
    case "Другая техника":
      return "Что за устройство? С чем нужна помощь?";
      break;
    default:
      return null;
      break;
  }
};
const Step1: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Какое у вас устройство?";
  const [field, meta] =
    useField<WizValues["Какое у вас устройство?"]>(stepName);
  return (
    <WizFormControl>
      <FormLabel id="step1">{stepName}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="выберите"
        sx={{ gap: "12px" }}
        {...field}
        onChange={(event) => {
          field.onChange(event);
          const nextName = getNextStep(event.target.value as any);
          if (nextName) {
            props.goToNamedStep(nextName);
          }
        }}
        onClick={(event) => {
          const nextName = getNextStep(field.value);
          if (nextName) {
            props.goToNamedStep(nextName);
          }
        }}
      >
        <RadioImageLabel
          value="Настольный ПК"
          image={
            <EnhImage
              src={`/images/wizard/computer-desktop.png`}
              alt=""
              width={835}
              height={835}
              fitWidth={150}
            />
          }
        />
        <RadioImageLabel
          value="Ноутбук"
          image={
            <EnhImage
              src={`/images/wizard/laptop.png`}
              alt=""
              width={835}
              height={835}
              fitWidth={150}
            />
          }
        />
        <RadioImageLabel
          value="Apple Mac"
          image={
            <EnhImage
              src={`/images/wizard/imac.png`}
              alt=""
              width={769}
              height={727}
              fitWidth={150}
            />
          }
        />
        <RadioImageLabel
          value="Другая техника"
          image={
            <EnhImage
              src={`/images/wizard/question-mark.png`}
              alt=""
              width={654}
              height={903}
              fitWidth={150}
              fitHeight={150}
            />
          }
        />
      </RadioGroup>
    </WizFormControl>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default Step1;
