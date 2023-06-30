import { styled, Link } from "@mui/material";
import { useMemo } from "react";

interface Props extends Omit<React.ComponentProps<typeof Link>, "children"> {
  value?: string;
}
const PhoneLink = ({ value, underline, ...rest }: Props) => {
  const { phoneText, phoneNumber } = useMemo(() => {
    const phoneText =
      value || process.env["NEXT_PUBLIC_CONTACT_PHONE_NUMBER_CONTRY"];
    if (!phoneText) {
      throw new Error("PhoneLink: No phone number!");
    }
    const phoneNumber = phoneText
      .replace(/[^\+\d]/gim, "")
      .replace(/^[8]/, "+7");
    if (!phoneNumber) {
      throw new Error("PhoneLink: No phone number!");
    }
    return { phoneText, phoneNumber };
  }, [value]);
  return (
    <>
      <Link
        href={`tel:${phoneNumber}`}
        underline={underline || "none"}
        {...rest}
      >
        {phoneText}
      </Link>
    </>
  );
};

export default PhoneLink;
