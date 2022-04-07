import "../styles/globals.css";
import "../styles/Home.module.css"
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Global/Layout";
// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: "10em",
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
