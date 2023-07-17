import { Button, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import util from "util";

import StepWizard, {
  StepWizardProps,
  StepWizardChildProps,
} from "react-step-wizard";
import { WizardNav } from ".";
import { Formik } from "formik";
import { WizValues } from "./Step/wiztypes";
import { StyledWizard } from "./Step";

export default function ContactWizard({ children, ...props }: StepWizardProps) {
  return (
      <StyledWizard nav={<WizardNav />} {...props}>
        {children}
      </StyledWizard>
  );
}
