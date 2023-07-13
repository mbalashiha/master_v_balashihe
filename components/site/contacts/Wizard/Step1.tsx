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
import RadioLabel from "./RadioLabel";
import { StepWizardChildProps } from "react-step-wizard";

const Step1: React.FC<Partial<StepWizardChildProps>> = (({
  stepName,
  ...props
}: StepWizardChildProps) => {
  stepName = stepName || "Какое у вас устройство?";
  const [field, meta] = useField(stepName);
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
          if (event.target.value) {
            props.goToNamedStep("Что сейчас с вашей техникой?");
          }
        }}
        onClick={(event) => {
          if (field.value) {
            props.goToNamedStep("Что сейчас с вашей техникой?");
          }
        }}
      >
        <RadioLabel
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
        <RadioLabel
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
        <RadioLabel
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
        <RadioLabel
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
