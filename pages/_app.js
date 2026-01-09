import "../styles/globals.css";
import "../styles/Home.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Global/Layout";
import AuthProvider from "../service/AuthService";
import { extendTheme } from "@chakra-ui/react";
import Overlay from "../components/Global/Overlay";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DevelopmentNotice from "../components/Global/DevelopmentNotice";
import Meta from "../components/Global/Meta";
//break points to fit small device
const breakpoints = {
  sm: "10em",
  lg: "72em",
};
const theme = extendTheme({ breakpoints });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return (
    <ChakraProvider theme={theme}>
      {loading && <Overlay />}
      <Meta />
      <AuthProvider>
        <DevelopmentNotice />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
