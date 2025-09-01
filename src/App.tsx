import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { initializeAxiosAuth } from "./lib";
import { useAuthStore } from "./store";
import { router } from "./routes/routes";
import { Toaster } from "sonner";

function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeAxiosAuth(useAuthStore);
    }
  }, []);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
