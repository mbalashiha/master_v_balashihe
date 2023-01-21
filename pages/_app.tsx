import "@styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect, FC, useContext, useRef } from "react";

const Noop: FC<any> = ({ children }) => <>{children}</>;

function MyMasterApp(ctx: AppProps & { Component: { Layout: FC<any> } }) {
  const { Component, pageProps } = ctx;
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
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyMasterApp;
