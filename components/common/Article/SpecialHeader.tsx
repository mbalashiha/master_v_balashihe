import { styled } from "@mui/material";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import React from "react";

const StyledBox = styled((props: React.ComponentProps<typeof Paper>) => (
  <Paper component="header" {...props} />
))(({ theme }) => ({
  width: "100%",
  padding: "1.3rem 2rem 2rem 2rem",
  background: `linear-gradient(184deg, ${theme.palette.articleText.main}, rgb(30, 30, 54))`,
  color: `rgb(52, 71, 103)`,
  borderRadius: "0.8rem",
  boxShadow: `rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem`,
  marginBottom: "2rem",
}));

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export const SpecialHeader = ({ children }: Props) => (
  <StyledBox>
    <Typography
      component="h1"
      variant="h1"
      sx={{
        color: "white",
        fontSize: "30px",
        lineHeight: "42px",
        fontWeight: 500,
      }}
    >
      {children}
    </Typography>
  </StyledBox>
);
export default SpecialHeader;
