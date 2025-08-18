import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { initializeAxiosAuth } from "./lib";
import { useAuthStore } from "./store";
import { router } from "./routes/routes";

function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeAxiosAuth(useAuthStore);
    }
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
