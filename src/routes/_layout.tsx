import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/store/providers/QueryProviders";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </ThemeProvider>
  );
}
