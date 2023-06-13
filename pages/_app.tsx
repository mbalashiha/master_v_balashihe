import "@styles/globals.scss";
import "material-icons/iconfont/material-icons.css";
import { CacheProvider, EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect, FC, useContext, useRef } from "react";
import createEmotionCache from "@common/utils/emotion-cache";
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
  const title = pageProps?.product?.title;
  return (
    <>
      <Head>
        {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
        <title>{`Мастер в Балашихе - ${
          title ? title : "Закажите ремонт компьютера сегодня"
        }`}</title>
        <meta
          name="description"
          content="Мастер в Балашихе - Закажите ремонт компьютера сегодня"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CacheProvider value={emotionCache}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </CacheProvider>
    </>
  );
}
export default MyMasterApp;
