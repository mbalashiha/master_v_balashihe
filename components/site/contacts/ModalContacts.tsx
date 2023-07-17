import { WhatsappLink } from "@components/site/contacts";
import { EmailLink, EnhImage, PhoneLink } from "@components/ui";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import {
  IconEmailCircle,
  PhoneCallIcon,
  TelegramIcon,
} from "@components/icons";
import ContactInfoRow from "./ContactInfoRow";
import { Link as MuiLink } from "@mui/material";
import { email, phoneNumber, locationPlace } from "@/const/contacts";
import { ContactPhone, ContactWizard } from "../contacts";
import {
  NEXT_PUBLIC_WHATSAPP_LINK,
  NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_TELEGRAM_LINK,
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";

export default function ModalContacts() {
  const xsSpacing = "3px";
  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: xsSpacing, md: 2 }}
        sx={{
          letterSpacing: "0.001rem",
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
      <Divider
        sx={{
          transform: "scaleY(2)",
          mt: { xs: "10px", md: "18px" },
          mb: { xs: "4px", md: "10px" },
        }}
      />
    </Box>
  );
}
