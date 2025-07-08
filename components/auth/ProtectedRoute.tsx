// components/auth/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "~/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
  </div>
);

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - Auth state:", {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    initialized: auth.initialized,
  });

  // Show loading state while checking authentication or not initialized
  if (!auth.initialized || auth.isLoading) {
    return <LoadingSpinner />;
  }

  // If not authenticated, redirect to sign-in with return URL
  if (!auth.isAuthenticated) {
    return (
      <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
    );
  }

  // Render children safely
  return <div>{children}</div>;
}
