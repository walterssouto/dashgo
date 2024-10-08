import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from "../styles/theme";

import { QueryClientProvider, QueryClient } from "react-query";
import { SidebarDrawerProvider } from "@/contexts/SidebarDrawerContext";
import { makeServer } from "@/services/mirage";
import { queryClient } from "@/services/queryClient";

if (process.env.NODE_ENV === 'development') {
  makeServer()
}


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
