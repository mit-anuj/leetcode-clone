import "@/styles/globals.css";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>Leetcode</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Web application that contains leecode problems and video solutions"
        />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
