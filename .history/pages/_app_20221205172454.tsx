import "@styles/globals.scss";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";
import Head from "next/head";
import React, { useEffect, FC, useContext, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import {
  AlertsProvider,
  theme as getMuiTheme,
  useThemePalette,
} from "@components/ui";
import { PaletteMode, ThemeProvider } from "@mui/material";

const Noop: FC<any> = ({ children }) => <>{children}</>;

function MyMasterApp(ctx: AppProps & { Component: { Layout: FC } }) {
  const { Component, pageProps } = ctx;
  const Layout = Component.Layout ?? Noop;
  const themePaletteCtx = useThemePalette(getMuiTheme);
  const { theme } = themePaletteCtx;
  const title = pageProps?.product?.title;
  return (
    <>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <title>{`Мастер в Балашихе${title ? " - " + title : ""}`}</title>
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
