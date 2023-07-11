import { styled, Link as MuiLink, SxProps } from "@mui/material";
import React from "react";

export interface PhoneLinkProps
  extends Omit<Omit<React.ComponentProps<typeof MuiLink>, "children">, "href"> {
  phoneText?: React.ReactNode | React.ReactNode[];
  phoneNumber: string;
  children?: React.ReactNode | React.ReactNode[];
  sx?: SxProps;
}
const PhoneLink = ({
  children,
  phoneNumber,
  phoneText,
  underline,
  sx,
  ...rest
}: PhoneLinkProps) => {
  phoneText = children || phoneText || phoneNumber;
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
