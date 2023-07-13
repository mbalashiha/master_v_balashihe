import { Button, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import util from "util";

import StepWizard, {
  StepWizardProps,
  StepWizardChildProps,
} from "react-step-wizard";
import { WizardNav } from ".";
import { Formik } from "formik";
import { WizValues } from "./wiztypes";
const StyledWizard = styled(StepWizard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
}));
export default function ContactWizard({ children, ...props }: StepWizardProps) {
  const initialValues: WizValues = {
    "Какое у вас устройство?": null,
    "Что сейчас с вашей техникой?": null,
    "Ремонтировали ли ранее устройство?": null,
    "Как срочно нужен мастер?": null,
  };
  return (
    <Formik initialValues={initialValues} onSubmit={(values, ctx) => {}}>
      <StyledWizard nav={<WizardNav />} {...props}>
        {children}
      </StyledWizard>
    </Formik>
  );
}
