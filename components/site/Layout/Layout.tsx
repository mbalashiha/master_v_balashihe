import { FC } from "react";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Footer from "@components/site/Footer";
import { Navbar, NavBreadcrumbs } from "@components/site/Navigation";
import { Container, styled } from "@mui/material";
import { Box } from "@mui/material";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import { theme as getMuiTheme, useThemePalette } from "@components/ui";
import { ThemeProvider } from "@mui/material";

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
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {/* {(router.asPath === "/" && <IndexHeader />) || (
            <Box sx={{ width: "100%", height: "6rem" }}></Box>
          )} */}
        {/* <NavBreadcrumbs breadcrumbs={breadcrumbs}></NavBreadcrumbs> */}
        <Box component="main" pb="24rem">
          {children}
          <BottomContactsWithMap />
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
};
export default Layout;
