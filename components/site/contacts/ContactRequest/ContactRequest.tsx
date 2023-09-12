import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import FormikForRequest from "./FormikForRequest";
import ContactForm from "./ContactForm";
import { MyStepWizard } from "../Wizard/Providers";
import RequestSended from "./RequestSended";

export default function ContactRequest() {
  return (
    <MyStepWizard
      form={<FormikForRequest />}
      StepContainerProps={{ sx: { overflowX: "visible" } }}
    >
      <ContactForm showOnlyStep />
      <RequestSended
        showOnlyStep
        stepName="Сейчас перезвоним и предложим выезд мастера"
      />
    </MyStepWizard>
  );
}
