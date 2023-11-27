import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Button,
  Container,
} from "@mui/material";
import React from "react";

interface Props extends React.ComponentProps<typeof Stack> {}

export default function NavStackContainer({ children, sx, ...rest }: Props) {
  return (
    <Stack
      component="ul"
      spacing="4px"
      sx={{
        listStyleType: "none",
        m: 0,
        p: 0,
        "& li::before": {
          fontFamily: "Material Icons Round",
          fontStyle: "normal",
          content: `"\\e5c8"`,
          paddingLeft: 0,
          paddingRight: "7px",
          paddingTop: 0,
          color: (theme) => theme.palette.articleText.main,
          fontSize: "20px",
          lineHeight: "20px",
        },
        "& li": {
          display: "flex",
          flexDirection: "row",
        },
        "& a, & div": {
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "22px",
        },
        "& a": {
          display: "block",
          color: (theme) => theme.palette.articleText.main,
          maxHeight: "44px",
          overflow: "hidden",
        },
        ...sx,
      }}
      {...(rest as any)}
    >
      {children}
    </Stack>
  );
}
