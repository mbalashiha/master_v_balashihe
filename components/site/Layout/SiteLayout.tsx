import { FC } from "react";
import React, { useContext } from "react";
import Footer from "@components/site/Footer";
import { Navbar } from "@components/site/Navigation";
import { ThemeProvider, Container, Box, Stack, Toolbar } from "@mui/material";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as getMuiTheme, useThemePalette } from "@components/ui";
import { blueGrey } from "@mui/material/colors";
import Image from "next/image";
import { ApiProvider } from "@framework";
import { SiteModalProvider } from "../ModalProvider/ModalProvider";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const SiteLayout: FC<Props> = ({ children }: Props) => {
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <ThemeProvider theme={theme}>
        <ApiProvider>
          <SiteModalProvider>
            <CssBaseline />
            <Navbar />
            {children}
            <Footer />
          </SiteModalProvider>
        </ApiProvider>
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
