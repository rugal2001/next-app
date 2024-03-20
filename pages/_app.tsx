import "../styles/globals.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({});
function MyApp({ Component, pageProps }) {
  const GetLayout = Component.GetLayout ?? ((page) => page);
  return (
    <MantineProvider theme={theme}>
      {GetLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
}

export default MyApp;
