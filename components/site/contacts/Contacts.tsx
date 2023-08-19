import PhoneLink from "../PhoneLink";
import {
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
export default function Contacts() {
  return (
    <PhoneLink
      phoneText={NEXT_PUBLIC_CONTACT_PHONE_TEXT}
    />
  );
}
