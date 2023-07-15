import { Button, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import util from "util";

import StepWizard, {
  StepWizardProps,
  StepWizardChildProps,
} from "react-step-wizard";
import { Formik } from "formik";
import { useWizard, WizardProvider } from "./WizardProvider";

const MuiStyledWizard = styled(StepWizard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  width: "100%",
}));

const InnerWizard = ({ children, onStepChange, ...props }: StepWizardProps) => {
  return <MuiStyledWizard {...props}>{children}</MuiStyledWizard>;
};
export default function StyledWizard(props: StepWizardProps) {
  return <InnerWizard {...props} />;
}
