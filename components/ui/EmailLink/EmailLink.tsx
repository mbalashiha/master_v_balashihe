import { styled, Link as MuiLink} from "@mui/material";
import React from "react";

interface Props extends Omit<React.ComponentProps<typeof MuiLink>, "children"> {
  email: string;
  children?: React.ReactNode | React.ReactNode[];
}
const EmailLink = ({ email, underline, children, ...rest }: Props) => {
  if (!email) {
    throw new Error("EmailLink: No email!");
  }
  return (
    <>
      <MuiLink href={`mailto:${email}`} underline={underline || "hover"} {...rest}>
        {children || email}
      </MuiLink>
    </>
  );
};

export default EmailLink;
