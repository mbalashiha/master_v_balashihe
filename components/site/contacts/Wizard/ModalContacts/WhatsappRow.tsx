import { LinkContactPhone, WhatsappLink } from "@components/site/contacts";
import WhatsappIcon from "@root/public/images/whatsapp.svg";
import { Link as MuiLink } from "@mui/material";
import ContactInfoRow from "./ContactInfoRow";

export default function WhatsappRow() {
  return (
    <WhatsappLink underline="hover">
      <ContactInfoRow
        sx={{
          "& svg": { transform: "scale(1.1)" },
          "& .contactInfoText": {},
        }}
        svgIcon={<WhatsappIcon />}
        infoText={`WhatsApp`}
      />
    </WhatsappLink>
  );
}
