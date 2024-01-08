import "@utils/MuiClassNameSetup";
import "@styles/globals.scss";
// import "animate.css/animate.css";
import { NEXT_PUBLIC_SITE_ORIGIN } from "@framework/const";
import { MuiSnackbarProvider } from "@components/ui";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@utils/emotion-cache";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect, FC, useContext, useRef } from "react";
const clientSideEmotionCache = createEmotionCache();
const Noop: FC<any> = ({ children }) => <>{children}</>;

function MyMasterApp(
  ctx: AppProps & {
    emotionCache?: EmotionCache;
    Component: { Layout: FC<any> };
  }
) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = ctx;
  const hasLayout = !!Component.Layout;
  const Layout = hasLayout ? Component.Layout : Noop;
  const title = NEXT_PUBLIC_SITE_ORIGIN
    ? pageProps?.product?.title + ""
    : pageProps?.product?.title;
  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=UTF-8"
          charSet="utf-8"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
        <title>{`Частный компьютерный мастер в Балашихе ${
          title
            ? title
            : "в центре города рядом с Шоссе Энтузиастов М-7 Балашиха"
        }`}</title>
        <meta
          name="description"
          content={`Вызвать частного мастера на дом для ремонта ПК в Балашихе - ${
            title
              ? title
              : "в центре города рядом с Шоссе Энтузиастов дом 7 М-7 Балашиха"
          }`}
        />
      </Head>
      <CacheProvider value={emotionCache}>
        <MuiSnackbarProvider
          autoHideDuration={14000}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </MuiSnackbarProvider>
      </CacheProvider>
    </>
  );
}
export default MyMasterApp;
