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
import { ManagementLayoutProvider } from "@framework/management/utils/providers";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: FC<Props> = ({ children }: Props) => {
  // const breadcrumbs: Array<{ name: string; url: string }> | undefined = (
  //   children as any
  // )?.props?.breadcrumbs;
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  return (
    <>
      <ManagementApiProvider>
        <ManagementLayoutProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
          </ThemeProvider>
        </ManagementLayoutProvider>
      </ManagementApiProvider>
    </>
  );
};
export default Layout;
