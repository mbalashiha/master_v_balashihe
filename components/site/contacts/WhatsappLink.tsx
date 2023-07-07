import { NEXT_PUBLIC_WHATSAPP_LINK } from "@framework/const";
import { Link } from "@mui/material";
import React from "react";
type Props = React.ComponentProps<typeof Link>;

export const WhatsappLink = ({ children, href: _, ...rest }: Props) => {
  return (
    <Link
      href={NEXT_PUBLIC_WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      underline="none"
      {...rest}
    >
      {children}
    </Link>
  );
};
export default WhatsappLink;
