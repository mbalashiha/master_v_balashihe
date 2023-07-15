import { Button, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import util from "util";

import StepWizard, {
  StepWizardProps,
  StepWizardChildProps,
} from "react-step-wizard";
import { WizardNav } from ".";
import { Formik } from "formik";
import { WizValues } from "./WizardProvider/wiztypes";
import { StyledWizard } from "./WizardProvider";

export default function ContactWizard({ children, ...props }: StepWizardProps) {
  const initialValues: Partial<WizValues> = {};
  return (
    <Formik initialValues={initialValues} onSubmit={(values, ctx) => {}}>
      <StyledWizard nav={<WizardNav />} {...props}>
        {children}
      </StyledWizard>
    </Formik>
  );
}
