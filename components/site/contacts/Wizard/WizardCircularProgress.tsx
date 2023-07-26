import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import { useWizard } from "./Providers/WizardProvider";

export function WizardCircularProgress() {
  const { currentStep, totalSteps, progressPercents } = useWizard();
  return (
    <CircularProgressWithLabel
      size={180}
      value={progressPercents}
      label={`Вопрос ${currentStep}`}
      centerInfo={`из ${totalSteps}`}
    />
  );
}
