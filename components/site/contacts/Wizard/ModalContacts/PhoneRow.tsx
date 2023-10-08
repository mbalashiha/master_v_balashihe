import { LinkContactPhone } from "@components/site/contacts";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import { Link as MuiLink } from "@mui/material";
import {
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
import ContactInfoRow from "./ContactInfoRow";

export default function PhoneRow() {
  return (
    <LinkContactPhone>
      <ContactInfoRow
        svgIcon={<IconPhoneCircle fill="#2e2d58" />}
        label={"Мой телефон"}
        infoText={NEXT_PUBLIC_CONTACT_PHONE_TEXT}
        sx={{
          "& .contactInfoText": {
          },
        }}
      />
    </LinkContactPhone>
  );
}
