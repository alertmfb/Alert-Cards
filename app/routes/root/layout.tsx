import { AppSidebar } from "~/components/AppSidebar";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import Navbar from "~/components/Navbar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default RootLayout;
