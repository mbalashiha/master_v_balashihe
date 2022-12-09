import "@styles/globals.scss";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";
import Head from "next/head";
import React, { useEffect, FC, useContext, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AlertsProvider,
  theme as getMuiTheme,
  useThemePalette,
} from "@components/ui";
import { ThemeProvider } from "@mui/material";

const Noop: FC<any> = ({ children }) => <>{children}</>;

function MyMasterApp(ctx: AppProps & { Component: { Layout: FC<any> } }) {
  const { Component, pageProps } = ctx;
  const Layout = Component.Layout ?? Noop;
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  const title = pageProps?.product?.title;
  return (
    <>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <title>{`Мастер в Балашихе - ${title ? title : "Закажите ремонт компьютера сегодня"}`}</title>
        <meta name="description" content="`Мастер в Балашихе - Закажите ремонт компьютера сегодня" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertsProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AlertsProvider>
      </ThemeProvider>
    </>
  );
}
export default MyMasterApp;
