import "../styles/globals.css";
import "../styles/Home.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Global/Layout";
import AuthProvider from "../service/AuthService";
import { extendTheme } from "@chakra-ui/react";

//break points to fit small device
const breakpoints = {
  sm: "10em",
  lg:"68em"
};
const theme = extendTheme({ breakpoints });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
