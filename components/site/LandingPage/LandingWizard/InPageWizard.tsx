import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import Step1 from "./Step1";
import Step1_2 from "./Step2_1-2";
import Step1_3 from "./Step3";
import Step1_4_2 from "./Step2_4";
import Step4 from "./Step4";
import Step2_1_3 from "./Step2_3";
import LastStep from "./LastStep";
import LastStepSended from "./LastStepSended";
import Wizard from "./Wizard";
import { FormikForWizard } from "@components/site/contacts/Wizard/Providers";

const InPageWizard = () => {
  return (
    <Wizard
      form={<FormikForWizard />}
      sx={{
        width: { xs: "100%", md: "920px", lg: "1090px" },
        minHeight: { xs: "82vh", md: "inherit" },
        height: { md: "812px" },
        minWidth: { xs: "99.5vw", md: "inherit" },
      }}
      title={"Ответьте на пару вопросов и получите скидку 25%"}
      StepContainerProps={{}}
    >
      <Step1 stepName="Какое у вас устройство?" />
      <Step1_2 stepName="Что сейчас с вашей техникой?" />
      <Step2_1_3 stepName="Что хотите сделать с вашим Mac?" />
      <Step1_4_2 stepName="Что за устройство? С чем нужна помощь?" />
      <Step1_3 stepName="Ремонтировали ли ранее устройство?" />
      <Step4 stepName="Как срочно нужен мастер?" />
      <LastStep noTitle stepName="Оставьте заявку на ремонт со скидкой" />
      <LastStepSended
        noTitle
        noNavigation
        stepName="Сейчас перезвоним и предложим выезд мастера"
      />
    </Wizard>
  );
};
export default InPageWizard;
