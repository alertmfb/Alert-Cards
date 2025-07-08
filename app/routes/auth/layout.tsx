// routes/auth/layout.tsx (Fixed)
import { AuthLeftPanel } from "components/auth/components/AuthLeftPanel";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/hooks/useAuth";

export function AuthLayout() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait until mounted to prevent hydration issues
  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthLeftPanel />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
