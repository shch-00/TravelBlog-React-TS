import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorModeProvider } from "./contexts/ColorModeContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles/index.css";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  _jsx(React.StrictMode, {
    children: _jsx(ColorModeProvider, {
      children: _jsx(BrowserRouter, {
        basename: "/",
        children: _jsxs(QueryClientProvider, {
          client: queryClient,
          children: [
            _jsx(App, {}),
            _jsx(ReactQueryDevtools, { initialIsOpen: false }),
          ],
        }),
      }),
    }),
  })
);
