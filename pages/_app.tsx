import "../styles/globals.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({});
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <MantineProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
}

export default MyApp;
