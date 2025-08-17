import { SetPasswordForm } from "@/components/features/auth/form/SetPasswordForm";

export default function InvitePage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-left mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Set Your Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Please set a strong password for your account.
        </p>
      </div>
      <SetPasswordForm />
    </>
  );
}
