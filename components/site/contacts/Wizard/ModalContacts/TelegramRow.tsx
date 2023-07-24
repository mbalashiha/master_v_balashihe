import { LinkContactPhone, WhatsappLink } from "@components/site/contacts";
import { EmailLink, EnhImage, PhoneLink } from "@components/ui";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import WhatsappIcon from "@root/public/images/whatsapp.svg";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import {
  IconEmailCircle,
  PhoneCallIcon,
  TelegramIcon,
} from "@components/icons";
import { Link as MuiLink } from "@mui/material";
import { email, phoneNumber, locationPlace } from "@/const/contacts";
import {
  NEXT_PUBLIC_WHATSAPP_LINK,
  NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_TELEGRAM_LINK,
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
import ContactInfoRow from "./ContactInfoRow";

export default function TelegramRow() {
  return (
    <MuiLink
      href={NEXT_PUBLIC_TELEGRAM_LINK}
      target="_blank"
      rel="noreferrer"
      underline="hover"
    >
      <ContactInfoRow
        sx={{ "& svg": { transform: { xs: "", md: "scale(1.15)" } } }}
        svgIcon={<TelegramIcon />}
        infoText={`Telegram`}
      />
    </MuiLink>
  );
}
