import { useField } from "formik";
import * as React from "react";
import { StepWizardChildProps } from "@components/site/contacts/Wizard/Providers/MyStepWizard";
import WizFormControl from "@components/site/contacts/Wizard/WizFormControl";
import { WizValues } from "@components/site/contacts/Wizard/Providers";
import { FormLabel, Grid } from "@mui/material";
import ImagePaper from "./ImagePaper";

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
  const [clicked, setClicked] = React.useState(false);
  stepName = stepName || "Какое у вас устройство?";
  const [field, meta] =
    useField<WizValues["Какое у вас устройство?"]>(stepName);
  const { name, value } = field;
  const onChange: typeof field.onChange = (event: {
    target: { value: string | null };
  }) => {
    const nextStepName = getNextStep(event.target.value as any);
    if (nextStepName && !clicked) {
      setClicked(true);
      field.onChange(event);
      setTimeout(() => props.goToNamedStep(nextStepName), 300);
    }
  };
  return (
    <WizFormControl>
      <FormLabel id="step1">{stepName}</FormLabel>
      <Grid container spacing={3} sx={{ width: "100%", pl: 2.5, pt: 1 }}>
        <Grid item xs={12} sm={6} md={3}>
          <ImagePaper
            onChange={onChange}
            name={name}
            value={value}
            title="Настольный ПК"
            src={`/images/wizard/computer-desktop.webp`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ImagePaper
            onChange={onChange}
            name={name}
            value={value}
            title="Ноутбук"
            src={`/images/wizard/laptop.webp`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ImagePaper
            onChange={onChange}
            name={name}
            value={value}
            title="Apple Mac"
            src={`/images/wizard/imac.png`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ImagePaper
            onChange={onChange}
            name={name}
            value={value}
            title="Другая техника"
            src={`/images/wizard/question-mark.webp`}
          />
        </Grid>
      </Grid>
    </WizFormControl>
  );
}) as React.FC<Partial<StepWizardChildProps>>;
export default Step1;
