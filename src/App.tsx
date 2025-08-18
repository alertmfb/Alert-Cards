import React from "react";
import { Outlet } from "react-router-dom";

import { QueryProvider } from "./store/providers/QueryProviders";

function App() {
  return (
    <QueryProvider>
      <Outlet />
    </QueryProvider>
  );
}

export default App;
