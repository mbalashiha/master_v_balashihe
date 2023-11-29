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
      spacing="8px"
      sx={{
        listStyleType: "none",
        m: 0,
        p: 0,
        "& li::before": {
          fontFamily: "Material Icons Round",
          fontStyle: "normal",
          content: `"\\e5c8"`,
          paddingLeft: 0,
          paddingRight: "4px",
          paddingTop: 0,
          fontSize: "20px",
          lineHeight: "20px",
          color: "grey",
        },
        "& li": {
          display: "flex",
          flexDirection: "row",
          p: "12px",
          background: "rgb(255, 244, 235)",
          borderRadius: "18px",
          color: "grey",
          fontWeight: 400,
        },
        "& a": {
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "22px",
          display: "block",
          height: "44px",
          overflow: "hidden",
          "&:hover": {
            color: "#1f0b00",
          },
        },
        ...sx,
      }}
      {...(rest as any)}
    >
      {children}
    </Stack>
  );
}
