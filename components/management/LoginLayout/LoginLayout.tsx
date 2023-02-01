import { FC } from "react";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Footer from "@components/site/Footer";
import { Navbar, NavBreadcrumbs } from "@components/site/Navigation";
import { Container, styled } from "@mui/material";
import { Box } from "@mui/material";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as getMuiTheme } from "@components/management/ui/theme";
import { useThemePalette } from "@components/ui";
import { ThemeProvider } from "@mui/material";
import { ManagementApiProvider } from "@framework/management";
import { SnackbarProvider } from "notistack";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const LoginLayout: FC<Props> = ({ children }: Props) => {
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  return (
    <>
      <ManagementApiProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            autoHideDuration={8000}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            maxSnack={1}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </ManagementApiProvider>
    </>
  );
};
export default LoginLayout;
