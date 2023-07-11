import {
  NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
} from "@framework/const";
import PhoneLink from "../PhoneLink";
import { PhoneLinkProps } from "../PhoneLink/PhoneLink";
type Props = Omit<PhoneLinkProps, "phoneNumber">;

export default function ContactPhone(props: Props) {
  return (
    <PhoneLink
      phoneText={NEXT_PUBLIC_CONTACT_PHONE_TEXT}
      {...props}
      phoneNumber={NEXT_PUBLIC_CONTACT_PHONE}
    />
  );
}
