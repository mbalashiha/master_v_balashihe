import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Link from "next/link";
import React from "react";

type LinkProps = React.ComponentProps<typeof Link>;

type Props = React.ComponentProps<typeof Button> & {
  href: LinkProps["href"];
};

export default React.forwardRef(function LinkButton(
  { href, sx, children, ref: __r, ...rest }: Props,
  ref: any
) {
  return (
    <Link href={href}>
      <Button
        ref={ref}
        sx={{
          background: "none",
          p: 0,
          border: "none",
          fontWeight: 400,
          fontSize: "10pt",
          "&:hover": {
            background: "none",
            boxShadow: "none",
            color: "primary.main",
          },
          "& .MuiButton-startIcon": {
            margin: 0,
            marginLeft: 0,
            marginRight: "4px",
            transform: "scale(0.75)",
          },
          "& .MuiButton-endIcon": {
            margin: 0,
            transform: "scale(0.75)",
          },
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Button>
    </Link>
  );
});
