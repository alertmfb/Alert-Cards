// routes/auth/sign-in.tsx - Fixed
import { Navigate, useLocation } from "react-router";
import { UserAuthForm } from "../../components/auth/form/UserForm";
import { useHydratedAuthStore } from "~/stores/authStore";

export default function SignIn() {
  const { isAuthenticated, isLoading, _hasHydrated } = useHydratedAuthStore();
  const location = useLocation();

  // Wait for hydration - the auth layout will handle this loading state
  // so we don't need our own mounted state here
  if (!_hasHydrated || isLoading) {
    return null; // Let the AuthLayout handle the loading UI
  }

  // Only redirect after hydrated and not loading
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-left mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
        <p className="text-sm text-muted-foreground">
          Manage all card operations just in one place!
        </p>
      </div>
      <UserAuthForm />
    </>
  );
}
