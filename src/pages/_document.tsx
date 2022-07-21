import type { NextPage } from "next";
import { Head, Html, Main, NextScript } from "next/document";

const Document: NextPage = () => {
  return (
    <Html>
      <Head>
        <meta name="description" content="Reljod Oreta's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-slate-800 text-white font-primary">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
