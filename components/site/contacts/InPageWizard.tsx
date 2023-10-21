import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import { ContactWizard } from "../contacts";
import Step1 from "@components/site/LandingPage/LandingWizard/Step1";
import Step1_2 from "./Wizard/Step2_1-2";
import Step1_3 from "./Wizard/Step3";
import Step1_4_2 from "./Wizard/Step2_4";
import Step4 from "./Wizard/Step4";
import Step2_1_3 from "./Wizard/Step2_3";
import LastStep from "./Wizard/LastStep";
import { FormikForWizard } from "./Wizard/Providers/FormikForWizard";
import LastStepSended from "./Wizard/LastStepSended";
import WizardSidebar from "./Wizard/WizardSidebar";

const InPageWizard = () => {
  return (
    <ContactWizard
      form={<FormikForWizard />}
      sx={{
        width: { xs: "100%", md: "920px", lg: "1090px" },
        minHeight: { xs: "82vh", md: "inherit" },
        height: { md: "812px" },
        minWidth: { xs: "99.5vw", md: "inherit" },
      }}
      title={"Ответьте на пару вопросов и получите скидку 25%"}
      StepContainerProps={{ sx: { p: "15px 10px 5px 25px" } }}
    >
      <Step1 stepName="Какое у вас устройство?" />
      <Step1_2 stepName="Что сейчас с вашей техникой?" />
      <Step2_1_3 stepName="Что хотите сделать с вашим Mac?" />
      <Step1_4_2 stepName="Что за устройство? С чем нужна помощь?" />
      <Step1_3 stepName="Ремонтировали ли ранее устройство?" />
      <Step4 stepName="Как срочно нужен мастер?" />
      <LastStep showOnlyStep stepName="Оставьте заявку на ремонт со скидкой" />
      <LastStepSended
        showOnlyStep
        stepName="Сейчас перезвоним и предложим выезд мастера"
      />
    </ContactWizard>
  );
};
export default InPageWizard;
