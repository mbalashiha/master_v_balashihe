import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import { StepWizardChildProps } from "./Providers/MyStepWizard";

export function WizardCircularProgress(props: StepWizardChildProps) {
  return (
    <CircularProgressWithLabel
      size={180}
      value={props.progressPercents}
      label={`Вопрос ${props.currentStep}`}
      centerInfo={`из ${props.totalSteps}`}
    />
  );
}
