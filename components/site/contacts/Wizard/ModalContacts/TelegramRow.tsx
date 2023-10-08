import {
  IconEmailCircle,
  PhoneCallIcon,
  TelegramIcon,
} from "@components/icons";
import { Link as MuiLink } from "@mui/material";
import {
  NEXT_PUBLIC_TELEGRAM_LINK,
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
        sx={{
          "& .contactInfoText": {
          },
        }}
        svgIcon={<TelegramIcon />}
        infoText={`Telegram`}
      />
    </MuiLink>
  );
}
