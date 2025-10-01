import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";

const maskEmail = (email = "") => {
  const [user, domain] = email.split("@");
  if (!user) return email;
  return `${user.slice(0, 3)}****@${domain}`;
};

export function OtpForm() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { email?: string } };
  const maskedEmail = maskEmail(state?.email);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));

  const focusInput = (idx: number) => inputRefs.current[idx]?.focus();

  const handleChange = (idx: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpValues];
    newOtp[idx] = value;
    setOtpValues(newOtp);

    if (value && idx < 5) focusInput(idx + 1);
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[idx] && idx > 0) {
      focusInput(idx - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (paste.length === 0) return;
    e.preventDefault();

    const newOtp = paste.split("");
    while (newOtp.length < 6) newOtp.push("");

    setOtpValues(newOtp);
    focusInput(Math.min(paste.length, 5));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    toast.success("OTP verified successfully!");
    setTimeout(() => navigate("/reset-password"), 1000);
  };

  const handleResend = () => {
    toast.info("A new code has been sent.");
  };

  return (
    <form onSubmit={handleSubmit} className="py-12 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Enter OTP</h2>
        <p className="text-muted-foreground">
          Enter the 6‑digit code sent to your email&nbsp;
          <span className="font-medium">{maskedEmail || "address"}</span>.
          <br />
          If you didn't receive it, request a new code.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {otpValues.map((digit, idx) => (
          <Input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-lg font-semibold"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      <div className="space-y-4">
        <Button type="submit" className="w-full">
          Verify OTP
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-primary hover:underline"
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </div>
    </form>
  );
}
