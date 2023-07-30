import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import { ContactWizard } from "../contacts";
import cn from "classnames";
import a from "@components/ui/Transitions/animation.module.scss";
import { BaseDialog } from "@components/ui";
import { BaseDialogProps } from "@components/ui/BaseDialog";
import Step1 from "./Wizard/Step1";
import Step1_2 from "./Wizard/Step2_1-2";
import Step1_3 from "./Wizard/Step3";
import Step1_4_2 from "./Wizard/Step2_4";
import Step4 from "./Wizard/Step4";
import Step2_1_3 from "./Wizard/Step2_3";
import LastStep from "./Wizard/LastStep";
import { FormikForWizard } from "./Wizard/Providers/FormikForWizard";
import { ApiProvider } from "@framework/index";
import LastStepSended from "./Wizard/LastStepSended";
import WizardSidebar from "./Wizard/WizardSidebar";

type Props = Omit<BaseDialogProps, "content">;

const ContactsContent = () => {
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
      sidebar={<WizardSidebar />}
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
export default function ContactDialog({
  children: trigger,
  sx,
  component,
  noContainer,
  hideTrigger,
}: Props) {
  return (
    <BaseDialog
      content={
        <ApiProvider>
          <ContactsContent />
        </ApiProvider>
      }
      hideTrigger
      component={component}
      dialogActions={false}
      maxWidth={"xl"}
      noPadding
      sx={{
        ...sx,
        background: "#EFEFF4",
        maxHeight: "100%",
        "& .FormControl-root, & .Typography-root, & .Typography-body1, & .FormControlLabel-label":
          {
            "&, & *:not(.Mui-error)": {
              color: `#24263F`,
              fontWeight: 500,
            },
          },
      }}
      noContainer={noContainer}
      PaperProps={{
        className: cn(a.animated, a.bounceIn),
      }}
    >
      {trigger}
    </BaseDialog>
  );
}
