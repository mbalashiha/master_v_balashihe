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
import ContactInfoRow from "./ContactInfoRow";

export default function EmailRow() {
  return (
    <EmailLink email={email}>
      <ContactInfoRow
        svgIcon={<IconEmailCircle fill="#2e2d58" />}
        label={"Почта"}
        infoText={email}
        sx={{
          "& .contactInfoText": {
          },
        }}
      />
    </EmailLink>
  );
}
