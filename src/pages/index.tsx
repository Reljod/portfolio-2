import Hero from "components/app/home/Hero";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jod</title>
        <meta name="description" content="Jod's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
};

export default Home;
