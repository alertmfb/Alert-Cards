import { ResetPasswordForm } from "@/components/features/auth/form/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-left mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset Your Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </div>
      <ResetPasswordForm />
    </>
  );
}
