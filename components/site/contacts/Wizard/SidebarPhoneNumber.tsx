import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import ContactPhone from "@components/site/contacts/LinkContactPhone";
import { Box, Stack, Typography } from "@mui/material";

export default function SidebarPhone() {
  return <ContactPhone>{NEXT_PUBLIC_CONTACT_PHONE_TEXT}</ContactPhone>;
}
