import { FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  AddButton,
  Grid,
  Box,
  Container,
} from "@components/ui";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material";
import { useMemo } from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Container
        sx={{
          position: "relative",
          minHeight: "100vh",
          paddingBottom: "20rem",
        }}
      >
        <Box
          component="main"
          sx={{ padding: { xs: "3.2rem 0.4rem", xl: "3.2rem 1rem" } }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
};
export default Layout;
