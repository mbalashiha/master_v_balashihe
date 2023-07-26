import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import { ContactWizard } from "../contacts";
import Slide from "@mui/material/Slide";
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
import SidebarPhone from "./Wizard/SidebarPhoneNumber";
import LastStep from "./Wizard/LastStep";
import { useWizard, WizardProvider } from "./Wizard/Providers/WizardProvider";
import ModalContacts, { xsSpacing } from "./Wizard/ModalContacts/ModalContacts";
import { ApiProvider } from "@framework/index";
import PhoneRow from "./Wizard/ModalContacts/PhoneRow";
import WhatsappRow from "./Wizard/ModalContacts/WhatsappRow";
import EmailRow from "./Wizard/ModalContacts/EmailRow";
import TelegramRow from "./Wizard/ModalContacts/TelegramRow";
import LastStepSended from "./Wizard/LastStepSended";
import { WizardCircularProgress } from "./Wizard/WizardCircularProgress";

type Props = Omit<BaseDialogProps, "content">;
type GridContainerProps = React.ComponentProps<typeof Grid>;

const GridContainer = ({ children, sx, ...rest }: GridContainerProps) => {
  return (
    <Grid
      container
      sx={{
        "& > *": { p: { xs: "7px", lg: "20px" } },
        width: "100%",
        height: "100%",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Grid>
  );
};

const ContactsContent = () => {
  const { isLastStep, setIsLastStep, emailSuccess } = useWizard();
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "920px", lg: "1090px" },
        height: { md: "812px" },
        minHeight: { xs: "80vh", md: "auto" },
        minWidth: { xs: "99.5vw", md: "auto" },
      }}
    >
      {!isLastStep ? (
        <GridContainer>
          <Grid item xs={12} md={9}>
            <ModalContacts />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                "&&&&&": { color: (theme) => theme.palette.primary.main },
              }}
            >
              Ответьте на пару вопросов и получите скидку 25%
            </Typography>
            <ContactWizard>
              <Step1 stepName="Какое у вас устройство?" />
              <Step1_2 stepName="Что сейчас с вашей техникой?" />
              <Step2_1_3 stepName="Что хотите сделать с вашим Mac?" />
              <Step1_4_2 stepName="Что за устройство? С чем нужна помощь?" />
              <Step1_3 stepName="Ремонтировали ли ранее устройство?" />
              <Step4 stepName="Как срочно нужен мастер?" />
            </ContactWizard>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              p: "10px",
              background: (theme) => theme.palette.background.paper,
              "& img": {
                borderRadius: "100%",
              },
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Typography
              sx={{
                "&&&&": {
                  fontSize: "17px",
                  lineHeight: "24px",
                  fontWeight: 800,
                  background: "#FFE684",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: { xs: 0, md: "35px" },
                  textAlign: "center",
                },
              }}
            >
              Ваша скидка 25%
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <Image
                src={"/images/tiny_computer_master_balashikha.webp"}
                alt=""
                width={60}
                height={60}
                quality={100}
              ></Image>
              <Box>
                <Typography component="div">Дмитрий</Typography>
                <Typography
                  component="div"
                  sx={{ fontSize: "14px", lineHeight: "16px" }}
                >
                  IT специалист
                </Typography>
                <SidebarPhone />
              </Box>
            </Stack>
            <Divider light sx={{ transform: "scaleY(2)", my: "10px" }} />
            <WizardCircularProgress />
          </Grid>
        </GridContainer>
      ) : (
        <>
          {emailSuccess ? (
            <GridContainer className={cn(a.animated, a.bounceInRight)}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <LastStepSended />
              </Grid>
            </GridContainer>
          ) : (
            <GridContainer className={cn(a.animated, a.bounceInRight)}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ alignSelf: "flex-start" }}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: xsSpacing, md: 2 }}
                    sx={{
                      letterSpacing: "0.001rem",
                    }}
                  >
                    <EmailRow />
                    <TelegramRow />
                    <WhatsappRow />
                  </Stack>
                  <Divider
                    sx={{
                      mt: { xs: "10px", md: "18px" },
                      mb: { xs: "4px", md: "10px" },
                    }}
                  />
                </Box>
                <LastStep stepName="Оставьте заявку на ремонт со скидкой" />
              </Grid>
            </GridContainer>
          )}
        </>
      )}
    </Box>
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
          <WizardProvider>
            <ContactsContent />
          </WizardProvider>
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
