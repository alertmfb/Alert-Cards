import { Navigate, useLocation } from "react-router";
import { UserAuthForm } from "../../../components/auth/form/UserForm";
import { useAuth } from "~/hooks/useAuth";

export default function SignIn() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If already authenticated, redirect to dashboard
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
