import * as React from "react";
import { FC, useMemo, useRef } from "react";
import { IconEmailCircle } from "@components/icons";
import Image from "next/image";
import ContactInfoRow from "./ContactInfoRow";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { EmailLink, EnhImage, PhoneLink } from "@components/ui";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import { email, phoneNumber, locationPlace } from "@/const/contacts";
import { ContactPhone, ContactWizard } from "../contacts";
import { grey } from "@mui/material/colors";
import { PhoneCallIcon, TelegramIcon } from "@components/icons";
import cn from "classnames";
import a from "@components/ui/Transitions/animation.module.scss";
import {
  NEXT_PUBLIC_WHATSAPP_LINK,
  NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_TELEGRAM_LINK,
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
import { WhatsappLink } from "@components/site/contacts";
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
import { useWizard, WizardProvider } from "./Wizard/Step/WizardProvider";
import ModalContacts from "./ModalContacts";

type Props = Omit<BaseDialogProps, "content">;
type GridContainerProps = React.ComponentProps<typeof Grid>;

const GridContainer = ({ children, sx, ...rest }: GridContainerProps) => {
  return (
    <Grid
      container
      sx={{
        "& > *": { p: "20px" },
        width: { xs: "100%", md: "880px", lg: "1000px" },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Grid>
  );
};

const ContactsContent = () => {
  const { isLastStep, setIsLastStep } = useWizard();
  return (
    <>
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
              Ответьте на 4 вопроса и получите скидку 25%
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
          </Grid>
        </GridContainer>
      ) : (
        <GridContainer className={cn(a.animated, a.fadeIn)}>
          <Grid item xs={12}>
            <ModalContacts />
            <LastStep stepName="Оставьте заявку на ремонт со скидкой" />
          </Grid>
        </GridContainer>
      )}
    </>
  );
};
export default function ContactDialog({
  children: trigger,
  sx,
  component,
  noContainer,
}: Props) {
  return (
    <BaseDialog
      content={
        <WizardProvider>
          <ContactsContent />
        </WizardProvider>
      }
      component={component}
      dialogActions={false}
      maxWidth={"xl"}
      noPadding
      sx={{
        ...sx,
        background: "#EFEFF4",
        maxHeight: "100%",
        "& .Typography-root, & .Typography-body1, & .FormControlLabel-label": {
          "&, & *": {
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
