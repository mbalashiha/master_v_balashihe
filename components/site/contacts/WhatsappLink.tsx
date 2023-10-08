import { formatWhatsappUrl } from "@components/common/format/format-whatsapp-url";
import { Link as MuiLink } from "@mui/material";
import React, { useMemo } from "react";
type Props = React.ComponentProps<typeof MuiLink>;

export const WhatsappLink = ({ children, href: _, ...rest }: Props) => {
  const url = useMemo(() => formatWhatsappUrl(), []);
  return (
    <MuiLink
      href={url}
      target="_blank"
      rel="noreferrer"
      underline="none"
      {...rest}
    >
      {children}
    </MuiLink>
  );
};
export default WhatsappLink;
