import { ForgotPasswordForm } from "components/auth/form/ForgotPasswordForm";
import { AuthLayout } from "./layout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-left mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot Password?
        </h1>
        <p className="text-sm text-muted-foreground">
          No worries! Enter your email address below, and we’ll send you a link
          to reset your password.
        </p>
      </div>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
