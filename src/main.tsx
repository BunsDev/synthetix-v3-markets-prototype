import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WagmiConfig } from "wagmi";

// import { PerpsMarket } from "./pages/perps/PerpsMarket";
import { chains, client } from "./wagmi";

import theme from "./theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
// import { Index } from "./pages/Index";
// import { PerpsAdmin } from "./pages/perps/PerpsAdmin";
import { SpotMarket } from "./pages/spot/SpotMarket";
import { SpotAdmin } from "./pages/spot/SpotAdmin";

import { ApolloProvider } from "@apollo/client";
import { PerpsMarket } from "./pages/perps/PerpsMarket";
import { spotClient } from "./utils/clients";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SpotMarket />,
  },
  // {
  //   path: "/perps/admin",
  //   element: <PerpsAdmin />,
  // },
  {
    path: "/perps/markets/:marketId",
    element: <PerpsMarket />,
  },
  // {
  //   path: "/perps/markets/:marketId/:accountId",
  //   element: <PerpsMarket />,
  // },
  {
    path: "/spot/admin",
    element: <SpotAdmin />,
  },
  {
    path: "/spot/markets/:marketId",
    element: <SpotMarket />,
  },
]);

/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ApolloProvider client={spotClient}>
        <WagmiConfig client={client}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              accentColor: "#00a4c4",
              accentColorForeground: "#ffffff",
              borderRadius: "small",
            })}
          >
            <RouterProvider router={router} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
