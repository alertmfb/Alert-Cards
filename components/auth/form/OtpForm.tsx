// import { useState, useRef } from "react";
// import { Button } from "components/ui/button";
// import { Input } from "components/ui/input";
// import { useLocation, useNavigate } from "react-router";
// import { toast } from "sonner";

// /* ---- helper to mask email ---- */
// const maskEmail = (email = "") => {
//   const [user, domain] = email.split("@");
//   if (!user) return email;
//   return `${user.slice(0, 3)}****@${domain}`;
// };

// export function OtpForm() {
//   const navigate = useNavigate();
//   const { state } = useLocation() as { state?: { email?: string } };
//   const maskedEmail = maskEmail(state?.email);

//   // store refs − empty array initially
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));

//   /* ---------- Helpers ---------- */
//   const focusInput = (idx: number) => inputRefs.current[idx]?.focus();

//   const handleChange = (idx: number, value: string) => {
//     if (!/^\d?$/.test(value)) return; // allow 0‑9 or empty

//     const newOtp = [...otpValues];
//     newOtp[idx] = value;
//     setOtpValues(newOtp);

//     if (value && idx < 5) focusInput(idx + 1);
//   };

//   const handleKeyDown = (
//     idx: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     // backspace to previous
//     if (e.key === "Backspace" && !otpValues[idx] && idx > 0) {
//       focusInput(idx - 1);
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     const paste = e.clipboardData
//       .getData("text")
//       .replace(/\D/g, "")
//       .slice(0, 6);

//     if (paste.length === 0) return;
//     e.preventDefault();

//     const newOtp = paste.split("");
//     while (newOtp.length < 6) newOtp.push("");

//     setOtpValues(newOtp);
//     focusInput(Math.min(paste.length, 5));
//   };

//   /* ---------- Submit ---------- */
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const otp = otpValues.join("");
//     if (otp.length !== 6) {
//       toast.error("Please enter all 6 digits");
//       return;
//     }

//     toast.success("OTP verified successfully!");
//     setTimeout(() => navigate("/reset-password"), 1000);
//   };

//   /* ---- resend ---- */
//   const handleResend = () => {
//     toast.info("A new code has been sent.");
//     /* TODO: trigger resend OTP endpoint */
//   };

//   /* ---------- UI ---------- */
//   return (
//     <form onSubmit={handleSubmit} className="py-12 space-y-6">
//       <div className="text-center space-y-2">
//         <h2 className="text-2xl font-semibold">Enter OTP</h2>
//         <p className="text-muted-foreground">
//           Enter the 6‑digit code sent to your email&nbsp;
//           <span className="font-medium">{maskedEmail || "address"}</span>.
//           <br />
//           If you didn't receive it, request a new code.
//         </p>
//       </div>

//       <div className="flex justify-center gap-3">
//         {otpValues.map((digit, idx) => (
//           <Input
//             key={idx}
//             ref={(el) => {
//               // ✅ just assign, don't return
//               inputRefs.current[idx] = el;
//             }}
//             type="text"
//             inputMode="numeric"
//             pattern="[0-9]*"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleChange(idx, e.target.value)}
//             onKeyDown={(e) => handleKeyDown(idx, e)}
//             onPaste={handlePaste}
//             className="h-12 w-12 text-center text-xl font-bold border rounded-md shadow-sm focus:ring-2 focus:ring-primary"
//           />
//         ))}
//       </div>

//       <Button type="submit" className="w-full mt-6">
//         Verify OTP
//       </Button>
//     </form>
//   );
// }

import { useState, useRef } from "react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";

/* ---- helper to mask email ---- */
const maskEmail = (email = "") => {
  const [user, domain] = email.split("@");
  if (!user) return email;
  return `${user.slice(0, 3)}****@${domain}`;
};

export function OtpForm() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { email?: string } };
  const maskedEmail = maskEmail(state?.email);

  /* Refs & state for the 6 boxes */
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const focus = (i: number) => refs.current[i]?.focus();

  const onChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) focus(i + 1);
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) focus(i - 1);
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!paste) return;
    e.preventDefault();
    const next = paste.split("");
    while (next.length < 6) next.push("");
    setOtp(next);
    focus(Math.min(paste.length, 5));
  };

  /* ---- submit ---- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    toast.success("OTP verified successfully!");
    /* TODO: verify OTP with backend */
    setTimeout(
      () => navigate("/reset-password", { state: { email: state?.email } }),
      800
    );
  };

  /* ---- resend ---- */
  const handleResend = () => {
    toast.info("A new code has been sent.");
    /* TODO: trigger resend OTP endpoint */
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
        {otp.map((d, i) => (
          <Input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="h-12 w-12 rounded-md text-center text-xl font-bold shadow-sm focus:ring-2"
            inputMode="numeric"
            maxLength={1}
            pattern="[0-9]*"
            value={d}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
          />
        ))}
      </div>

      <Button type="submit" className="w-full mt-6">
        Verify OTP
      </Button>

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-primary underline mt-4"
          onClick={handleResend}
        >
          Didn’t receive any code? Resend Code
        </button>
      </div>
    </form>
  );
}
