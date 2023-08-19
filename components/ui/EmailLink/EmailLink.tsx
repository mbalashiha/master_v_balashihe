import { styled, Link as MuiLink } from "@mui/material";
import React from "react";

interface Props extends Omit<React.ComponentProps<typeof MuiLink>, "children"> {
  email: string;
  children?: React.ReactNode | React.ReactNode[];
}
const EmailLink = ({ email, underline, children, ...rest }: Props) => {
  if (!email) {
    throw new Error("EmailLink: No email!");
  }
  const emailLink = React.useMemo(() => {
    if (email && email.includes("@")) {
      return `mailto:${email}`;
    } else {
      return `https://${email}`;
    }
  }, [email]);
  return (
    <>
      <MuiLink href={emailLink} underline={underline || "hover"} {...rest}>
        {children || email}
      </MuiLink>
    </>
  );
};

export default EmailLink;
