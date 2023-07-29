import { Button, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import util from "util";

import { WizardNav } from ".";
import { Formik } from "formik";
import { WizValues } from "./Providers/wiztypes";
import { MyStepWizard } from "./Providers";
import { StepWizardProps } from "./Providers/MyStepWizard";

export default function ContactWizard({ children, ...props }: StepWizardProps) {
  return (
    <MyStepWizard nav={<WizardNav />} {...props}>
      {children}
    </MyStepWizard>
  );
}
