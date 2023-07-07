import * as React from "react";
import { FC, useMemo, useRef } from "react";
import { IconEmailCircle } from "@components/icons";
import Image from "next/image";
import ContactInfoRow from "./ContactInfoRow";
import { Link as MuiLink } from "@mui/material";
import { EmailLink, EnhImage, PhoneLink } from "@components/ui";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import IconLocationCircle from "@components/icons/IconLocationCircle";
import MapStaticPic from "/public/images/map.png";
import { email, phoneNumber, locationPlace } from "@/const/contacts";
import { ContactPhone } from "../contacts";
import { grey } from "@mui/material/colors";
import {
  Badge,
  Divider,
  Grid,
  Box,
  List,
  Menu,
  MenuItem,
  MenuList,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import dynamic from "next/dynamic";
import PaletterModeSwitch from "@components/common/paletter/PaletteSwitch";
import { useRouter } from "next/router";
import { MainLogo } from "@components/site/MainLogo";
import { PhoneCallIcon, TelegramIcon } from "@components/icons";
import {
  NEXT_PUBLIC_WHATSAPP_LINK,
  NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_TELEGRAM_LINK,
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
import { WhatsappLink } from "@components/site/contacts";
import {
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  ExtendButtonBase,
  Typography,
  Dialog,
  SxProps,
  Stack,
} from "@mui/material";
type TriggerButton = React.ReactNode | React.ReactNode[];
interface Props {
  children: TriggerButton;
  component?: React.ComponentProps<typeof BaseDialog>["component"];
  sx?: SxProps;
  noContainer?: boolean;
}
import { BaseDialog } from "@components/ui";
const ContactsContent = () => {
  return (
    <Stack
      direction={"column"}
      spacing={1}
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
