import { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { Container, useUI, Box, Paper } from "@components/ui";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { Button, styled } from "@mui/material";

const GoToCartLink = styled((props: React.ComponentProps<typeof Button>) => {
  const { sx, className, children } = props;
  return (
    <Link href={"/market/cart"} as={"/market/cart"}>
      <Button
        sx={{ ...sx }}
        endIcon={<ShoppingCartCheckoutRoundedIcon />}
        className={cn(className)}
        color="secondary"
      >
        {children ? children : <>{"Перейти к корзине"}</>}
      </Button>
    </Link>
  );
})(({ theme }) => ({
  "&&": {
    background: theme.palette.secondary.light,
    "&:hover": {
      background: theme.palette.primary.light,
    },
    fontFamily: "var(--text-font-family)",
    fontWeight: 700,
    color: theme.palette.mode === "dark" ? "white" : "black",
    padding: "0.1rem 1.2rem",
    paddingTop: "0.3rem",
    fontSize: "0.8rem",
    lineHeight: "0.8rem",
    "& .SvgIcon-root": {
      fontSize: "1.8rem",
    },
    "& .Button-endIcon, & .Button-iconSizeMedium": {
      padding: 0,
      marginLeft: "0.2rem",
    },
  },
}));
export default GoToCartLink;
