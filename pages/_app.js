import { Archivo, Averia_Serif_Libre, Noto_Serif } from "next/font/google";
import Head from "next/head";
import GlobalStyle from "../styles";
import { SITE_DESCRIPTION, pageTitle } from "@/utils/site";
import { SWRConfig } from "swr";
import { StyleSheetManager } from "styled-components";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fontHeading = Averia_Serif_Libre({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const fontTitle = Archivo({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

const fontText = Noto_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      {/* defaults – pages override the title via PageLayout (same key) */}
      <Head>
        <title key="title">{pageTitle()}</title>
        <meta name="description" content={SITE_DESCRIPTION} key="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
        <meta name="theme-color" content="#efe8d8" />
      </Head>
      <GlobalStyle
        $fontHeading={fontHeading.style.fontFamily}
        $fontText={fontText.style.fontFamily}
        $fontTitle={fontTitle.style.fontFamily}
      />
      <SWRConfig value={{ fetcher }}>
        <StyleSheetManager
          shouldForwardProp={(prop) =>
            prop !== "category" && prop !== "isJoined"
          }
        >
          <SessionProvider session={session}>
            <ToastContainer />
            <Component {...pageProps} />
          </SessionProvider>
        </StyleSheetManager>
      </SWRConfig>
    </>
  );
}
