import {
  NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
import PhoneLink from "../PhoneLink";

export default function ContactPhone() {
  return (
    <PhoneLink
      phoneNumber={NEXT_PUBLIC_CONTACT_PHONE}
      phoneText={NEXT_PUBLIC_CONTACT_PHONE_TEXT}
    />
  );
}
