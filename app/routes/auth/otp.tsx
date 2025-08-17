import { OtpForm } from "~/components/auth/form/OtpForm";
import { AuthLayout } from "./layout";

export default function OtpPage() {
  return (
    <AuthLayout>
      {/* <div className="flex flex-col space-y-2 text-left mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Enter OTP</h1>
        <p className="text-sm text-muted-foreground">
          We’ve sent a 6-digit OTP to your email. Please enter it below.
        </p>
      </div> */}
      <OtpForm />
    </AuthLayout>
  );
}
