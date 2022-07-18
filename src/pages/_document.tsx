import type { NextPage } from "next";
import { Head, Html, Main, NextScript } from "next/document";

const Document: NextPage = () => {
  return (
    <Html>
      <Head>
        <meta name="description" content="Reljod Oreta's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-slate-800 text-white font-serif">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
