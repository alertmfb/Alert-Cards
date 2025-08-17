import React from "react";
import { Outlet } from "react-router-dom";
// import { ThemeProvider } from "./components/layout/theme-provider";

import { QueryProvider } from "./store/providers/QueryProviders";

function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    // </ThemeProvider>
  );
}

export default App;
