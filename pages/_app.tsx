import "../styles/globals.css";
import '@mantine/core/styles.css';

import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
});
function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider theme={theme}>
      
      <Component {...pageProps} />

    </MantineProvider>
  );
}

export default MyApp;
