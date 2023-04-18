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
    <p>
      <strong>
        <MyLink href={href}>{title}</MyLink>
      </strong>
      {amount && <span>от {amount} &#x20bd;</span>}
    </p>
  );
};
export default PriceRow;
