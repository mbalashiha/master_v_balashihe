import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import React from "react";
import { Head } from "next/document";

const MyDocument = () => {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
