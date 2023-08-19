import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
import { styled, Link as MuiLink, SxProps } from "@mui/material";
import React, { useMemo } from "react";

export interface PhoneLinkProps
  extends Omit<Omit<React.ComponentProps<typeof MuiLink>, "children">, "href"> {
  phoneText?: React.ReactNode | React.ReactNode[];
  phoneNumber?: string;
  children?: React.ReactNode | React.ReactNode[];
  sx?: SxProps;
}
const PhoneLink = ({
  children,
  phoneNumber: inPhoneNumber,
  phoneText: inPhoneText,
  underline,
  sx,
  ...rest
}: PhoneLinkProps) => {
  const hasPhoneText: boolean = Boolean(children && inPhoneText);
  const phoneNumber: string = useMemo(() => {
    if (inPhoneNumber) {
      return inPhoneNumber;
    } else {
      let returning: string =
        hasPhoneText && typeof inPhoneText === "string"
          ? inPhoneText
          : NEXT_PUBLIC_CONTACT_PHONE_TEXT;
      returning = returning.replaceAll(/[^\d]/g, "");
      if (returning.length === 11 && returning.startsWith("8")) {
        returning = returning.replace(/^8/, "+7");
      } else {
        returning = "+" + returning;
      }
      return returning;
    }
  }, [inPhoneNumber, inPhoneText, hasPhoneText]);
  const phoneText = children || inPhoneText || NEXT_PUBLIC_CONTACT_PHONE_TEXT;
  return (
    <MuiLink
      {...rest}
      href={`tel:${phoneNumber}`}
      underline={underline || "hover"}
      sx={{ ...sx }}
    >
      {phoneText}
    </MuiLink>
  );
};

export default PhoneLink;
