import { styled, Link, SxProps } from "@mui/material";
import React from "react";

interface Props
  extends Omit<Omit<React.ComponentProps<typeof Link>, "children">, "href"> {
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
}: Props) => {
  phoneText = children || phoneText || phoneNumber;
  return (
    <>
      <Link
        {...rest}
        href={`tel:${phoneNumber}`}
        underline={underline || "none"}
        sx={{ ...sx }}
      >
        {phoneText}
      </Link>
    </>
  );
};

export default PhoneLink;
