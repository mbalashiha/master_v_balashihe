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
import Step1_2 from "./Wizard/Step1_2";
import Step1_3 from "./Wizard/Step1_3";
import Step4 from "./Wizard/Step4";

type Props = Omit<BaseDialogProps, "content">;

const ContactsContent = () => {
  const xsSpacing = "3px";
  return (
    <>
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
            <ContactInfoRow svgIcon={<TelegramIcon />} infoText={`Telegram`} />
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
      <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
        Ответьте на 4 вопроса и получите скидку 25%
      </Typography>
      <ContactWizard>
        <Step1 stepName="Какое у вас устройство?" />
        <Step1_2 stepName="Что сейчас с вашей техникой?" />
        <Step1_3 stepName="Ремонтировали ли ранее устройство?" />
        <Step4 stepName="Как срочно нужен мастер?" />
      </ContactWizard>
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
      content={<ContactsContent />}
      title={"Вызвать мастера для ремонта"}
      component={component}
      dialogActions={false}
      sx={{
        ...sx,
        background: "#EFEFF4",
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
