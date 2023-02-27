import { FC } from "react";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Footer from "@components/site/Footer";
import { Navbar, NavBreadcrumbs } from "@components/site/Navigation";
import { Container, styled } from "@mui/material";
import { Box } from "@mui/material";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as getMuiTheme } from "@components/management/Layout/theme";
import { MuiSnackbarProvider, useThemePalette } from "@components/ui";
import { ThemeProvider } from "@mui/material";
import { ManagementApiProvider } from "@framework/management";
import { SnackbarProvider } from "notistack";
import { LoginProvider } from "@components/management/LoginLayout";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const LoginLayout: FC<Props> = ({ children }: Props) => {
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  return (
    <>
    <Head>
      <title>Вход в панель управления CMS</title>
    </Head>
      <ManagementApiProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MuiSnackbarProvider
            autoHideDuration={48 * 1000}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            maxSnack={1}
          >
            <LoginProvider>{children}</LoginProvider>
          </MuiSnackbarProvider>
        </ThemeProvider>
      </ManagementApiProvider>
    </>
  );
};
export default LoginLayout;
