import PhoneLink from "../PhoneLink";
import {
  NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
export default function Contacts() {
  return (
    <PhoneLink
      phoneNumber={NEXT_PUBLIC_CONTACT_PHONE}
      phoneText={NEXT_PUBLIC_CONTACT_PHONE_TEXT}
    />
  );
}
