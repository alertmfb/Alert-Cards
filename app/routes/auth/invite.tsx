import { SetPasswordForm } from "~/components/auth/form/SetPasswordForm";
import { AuthLayout } from "./layout";

export default function InvitePage() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-left mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Get Started</h1>
        <p className="text-sm text-muted-foreground">
          Set your password to get started with Card Management.
        </p>
      </div>
      <SetPasswordForm />
    </AuthLayout>
  );
}
