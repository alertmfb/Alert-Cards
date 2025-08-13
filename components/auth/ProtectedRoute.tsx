// components/ProtectedRoute.tsx - Fixed
import React from "react";
import { Navigate, useLocation } from "react-router";
import { useHydratedAuthStore } from "~/stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, accessToken, _hasHydrated } =
    useHydratedAuthStore();
  const location = useLocation();

  // Show loading spinner while checking auth or during hydration
  if (isLoading || !_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!accessToken || !isAuthenticated) {
    return (
      <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
}
