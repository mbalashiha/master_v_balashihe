import { Layout } from "@components/site";
import { Container, Grid, Card, Paper, Stack, styled } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
type NextLinkProps = React.ComponentProps<typeof Link>;
interface Props {
  title: React.ReactNode;
  amount: string | number;
  href?: NextLinkProps["href"];
}
const StyledLink = styled(Link)(({ theme }) => ({
  "&, & *": {
    color: theme.palette.text.primary,
    textDecoration: "underline",
  },
  "&:hover": {
    "&, & *": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
}));
const UpperLink = ({ href, children }: any) => {
  if (href) {
    return (
      <b>
        <StyledLink href={href}>{children}</StyledLink>
      </b>
    );
  } else {
    return <>{children}</>;
  }
};

export const PriceRow = ({ href, title, amount }: Props) => {
  return (
    <Stack
      component={"li"}
      direction="row"
      spacing={2}
      width="100%"
      sx={{
        "& .MuiTypography-root": {
          fontSize: { xs: "18px", sm: "12px", md: "16px" },
          lineHeight: { xs: "24px", sm: "16px", md: "20px" },
          fontWeight: 600,
        },
      }}
    >
      <Typography component="span" sx={{ flexGrow: 1 }}>
        <UpperLink href={href}>{title}</UpperLink>
      </Typography>
      <Typography
        component="span"
        sx={{ minWidth: { xs: "90px", sm: "80px" } }}
      >
        от {amount} &#x20bd;
      </Typography>
    </Stack>
  );
};
export default PriceRow;
