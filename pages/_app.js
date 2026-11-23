import {
  Archivo,
  Archivo_Black,
  Averia_Serif_Libre,
  Noto_Serif,
} from "next/font/google";
import GlobalStyle from "../styles";
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

const fontBrand = Archivo_Black({
  weight: "400",
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
      <GlobalStyle
        $fontHeading={fontHeading.style.fontFamily}
        $fontText={fontText.style.fontFamily}
        $fontBrand={fontBrand.style.fontFamily}
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
