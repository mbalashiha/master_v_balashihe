import * as React from "react";
import { FC, useMemo, useRef } from "react";
import { IconEmailCircle } from "@components/icons";
import Image from "next/image";
import ContactInfoRow from "./ContactInfoRow";
import { Grid, Box, Stack } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { EmailLink, EnhImage, PhoneLink } from "@components/ui";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import { email, phoneNumber, locationPlace } from "@/const/contacts";
import { ContactPhone } from "../contacts";
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
type Props = Omit<BaseDialogProps, "content">;

const ContactsContent = () => {
  return (
    <Stack
      direction={"column"}
      spacing={{ xs: 2, xl: 3 }}
      sx={{
        color: "#2E2D58",
        letterSpacing: "0.001rem",
        "& a": {
          color: "#2e2d58",
        },
        "& svg": {
          fill: "#2e2d58",
          width: "70x",
          height: "70px",
        },
      }}
    >
      <ContactInfoRow
        svgIcon={<IconPhoneCircle fill="#2e2d58" />}
        label={"Телефон:"}
        infoText={<ContactPhone />}
        sx={{
          "& a": {
            fontSize: "40px",
            lineHeight: "40px",
          },
        }}
      />
      <ContactInfoRow
        svgIcon={<IconEmailCircle fill="#2e2d58" />}
        label={"Почта:"}
        infoText={<EmailLink email={email} />}
        sx={{
          "& a": {
            wordBreak: "break-word",
            fontSize: { xs: "27px", sm: "30px", md: "36px" },
            lineHeight: "38px",
          },
        }}
      />
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent={"flex-start"}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "18px", md: "10px" },
        }}
      >
        <MuiLink
          href={NEXT_PUBLIC_TELEGRAM_LINK}
          target="_blank"
          rel="noreferrer"
          sx={{
            fontSize: "36px",
            lineHeight: "38px",
            fontWeight: 700,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            "&, & > *": {
              color: "#2e2d58",
            },
          }}
          underline="hover"
        >
          <TelegramIcon />
          <Box component={"span"}>Telegram</Box>
        </MuiLink>
        <WhatsappLink
          sx={{
            fontSize: "36px",
            lineHeight: "38px",
            fontWeight: 700,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            "&, & > *": {
              color: "#14930A",
            },
          }}
          underline="hover"
        >
          <EnhImage
            src="/images/whatsapp.webp"
            width={256}
            height={258}
            fitHeight={72}
            alt="WhatsApp"
          />
          <Box component={"span"}>WhatsApp</Box>
        </WhatsappLink>
      </Stack>
    </Stack>
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
      sx={sx}
      noContainer={noContainer}
    >
      {trigger}
    </BaseDialog>
  );
}
