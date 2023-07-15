import * as React from "react";
import { FC, useMemo, useRef } from "react";
import { IconEmailCircle } from "@components/icons";
import Image from "next/image";
import ContactInfoRow from "./ContactInfoRow";
import { Grid, Box, Stack, Typography } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { EmailLink, EnhImage, PhoneLink } from "@components/ui";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import { email, phoneNumber, locationPlace } from "@/const/contacts";
import { ContactPhone, ContactWizard } from "../contacts";
import { grey } from "@mui/material/colors";
import { PhoneCallIcon, TelegramIcon } from "@components/icons";
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

type Props = Omit<BaseDialogProps, "content">;

const ContactsContent = () => {
  const xsSpacing = "3px";
  return (
    <Grid container sx={{ width: { xs: "100%", md: "880px", lg: "1000px" } }}>
      <Grid item xs={12} md={9} sx={{ p: "20px", overflow: "hidden" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: xsSpacing, md: 2 }}
          sx={{
            letterSpacing: "0.001rem",
            mb: 2,
          }}
        >
          <Stack direction={"column"} spacing={{ xs: xsSpacing, md: 2 }}>
            <ContactPhone>
              <ContactInfoRow
                svgIcon={<IconPhoneCircle fill="#2e2d58" />}
                label={"Телефон:"}
                infoText={NEXT_PUBLIC_CONTACT_PHONE_TEXT}
                sx={{
                  "& a": {
                    fontSize: "30px",
                    lineHeight: "30px",
                  },
                }}
              />
            </ContactPhone>
            <EmailLink email={email}>
              <ContactInfoRow
                svgIcon={<IconEmailCircle fill="#2e2d58" />}
                label={"Почта:"}
                infoText={email}
                sx={{
                  "& span:last-of-type": {
                    wordBreak: "break-word",
                    fontSize: "22px",
                    lineHeight: "22px",
                  },
                }}
              />
            </EmailLink>
          </Stack>
          <Stack direction={"column"} spacing={{ xs: xsSpacing, md: 2 }}>
            <MuiLink
              href={NEXT_PUBLIC_TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              underline="hover"
            >
              <ContactInfoRow
                svgIcon={<TelegramIcon />}
                infoText={`Telegram`}
              />
            </MuiLink>
            <WhatsappLink underline="hover">
              <ContactInfoRow
                svgIcon={
                  <EnhImage
                    src="/images/whatsapp.webp"
                    width={256}
                    height={258}
                    fitHeight={50}
                    alt="WhatsApp"
                  />
                }
                infoText={`WhatsApp`}
              />
            </WhatsappLink>
          </Stack>
        </Stack>
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
      </Grid>
    </Grid>
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
      content={<ContactsContent />}
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
    >
      {trigger}
    </BaseDialog>
  );
}
