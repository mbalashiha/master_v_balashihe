import { FC } from "react";
import React, { useContext } from "react";
import Footer from "@components/site/Footer";

import { HugeContainer } from "@components/ui";
import { Navbar, NavBreadcrumbs } from "@components/site/Navigation";
import { ThemeProvider, Container, Box, Stack, Toolbar } from "@mui/material";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import { Search } from "@components/site";
import { theme as getMuiTheme, useThemePalette } from "@components/ui";
import { blueGrey } from "@mui/material/colors";
import Image from "next/image";
import { ApiProvider } from "@framework";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const SiteLayout: FC<Props> = ({ children }: Props) => {
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

        <ApiProvider>{children}</ApiProvider>
        <Footer />
      </ThemeProvider>
      <div
        dangerouslySetInnerHTML={{
          __html: process.env.Yandex_Metrika_dangerouslySetInnerHTML || "",
        }}
      />
    </>
  );
};
export default SiteLayout;
