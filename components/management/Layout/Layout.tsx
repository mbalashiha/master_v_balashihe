import { FC } from "react";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Footer from "@components/site/Footer";
import { Navbar, NavBreadcrumbs } from "@components/site/Navigation";
import { Container, styled } from "@mui/material";
import { MuiSnackbarProvider } from "@components/ui";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/material";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as getMuiTheme } from "@components/management/Layout/theme";
import { useThemePalette } from "@components/ui";
import { ThemeProvider } from "@mui/material";
import { ManagementApiProvider } from "@framework/management";
import { ManagementLayoutProvider } from "@framework/management/utils/providers";
import ManagementAppBar from "./ManagementAppBar";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const ManagementLayout: FC<Props> = ({ children }: Props) => {
  // const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
  //   children as any
  // )?.props?.breadcrumbs;
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  return (
    <>
      <Head>
        <title>Панель управления сайтом CMS</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiSnackbarProvider
          autoHideDuration={2 * 60 * 1000}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <ManagementApiProvider>
            <ManagementLayoutProvider>
              <ManagementAppBar />
              <Container
                sx={{
                  position: "relative",
                  minHeight: "100vh",
                }}
                maxWidth="lg"
              >
                {children}
              </Container>
            </ManagementLayoutProvider>
          </ManagementApiProvider>
        </MuiSnackbarProvider>
      </ThemeProvider>
    </>
  );
};
export default ManagementLayout;
