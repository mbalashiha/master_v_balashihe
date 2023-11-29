import Link from "next/link";
import React from "react";
type Props = React.ComponentProps<typeof Link>;

export default function UTMLink({ href: inHref, children, ...rest }: Props) {
  const href = React.useMemo(() => {
    if (!process.env.NEXT_PUBLIC_SITE_NAME) {
      return inHref;
    } else {
      return `${inHref}${
        inHref.toString().includes("?") ? "&" : "?"
      }utm_source=${process.env.NEXT_PUBLIC_SITE_NAME}&utm_medium=organic`;
    }
  }, [inHref]);
  return (
    <Link href={href} target="_blank" {...rest}>
      {children}
    </Link>
  );
}
