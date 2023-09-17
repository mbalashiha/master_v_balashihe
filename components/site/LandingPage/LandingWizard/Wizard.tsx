import { MyStepWizard } from "@components/site/contacts/Wizard/Providers";
import { StepWizardProps } from "@components/site/contacts/Wizard/Providers/MyStepWizard";
import { Button, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import util from "util";

export default function Wizard({ children, ...props }: StepWizardProps) {
  return (
    <MyStepWizard {...props}>
      {children}
    </MyStepWizard>
  );
}
