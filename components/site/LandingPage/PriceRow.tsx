import { Box } from "@mui/material";
import Link from "next/link";
type NextLinkProps = React.ComponentProps<typeof Link>;
interface Props {
  title: React.ReactNode;
  amount?: string | number;
  href?: NextLinkProps["href"];
}

const MyLink = ({
  href,
  children,
}: {
  href?: NextLinkProps["href"];
  children: React.ReactNode | React.ReactNode[];
}) => {
  if (href) {
    return (
      <Link href={href} as={href}>
        {children}
      </Link>
    );
  } else {
    return <>{children}</>;
  }
};

export const PriceRow = ({ href, title, amount }: Props) => {
  return (
    <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
      <Box sx={{ display: "none" }}>
        <link itemProp="availability" href="https://schema.org/InStock" />
        <meta itemProp="price" content={(amount || 0).toString()} />
        <meta itemProp="priceCurrency" content="RUB" />
      </Box>
      <strong itemProp="name">
        <MyLink href={href}>{title}</MyLink>
      </strong>
      {amount && <span>от {amount} &#x20bd;</span>}
    </div>
  );
};
export default PriceRow;
