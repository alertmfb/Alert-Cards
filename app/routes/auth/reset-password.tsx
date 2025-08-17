import { ResetPasswordForm } from "~/components/auth/form/ResetPasswordForm";
import { AuthLayout } from "./layout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-left mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create New Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Your new password must be different from the previous one.
        </p>
      </div>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
