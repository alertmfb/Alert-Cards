// components/ui/ATMCard.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib";

export type CardScheme = "visa" | "mastercard" | "verve" | "american-express";

interface ATMCardProps {
  scheme: CardScheme;
  nameOnCard: string;
  accountNumber: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const cardSchemeStyles = {
  visa: {
    gradient: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900",
    accent: "from-blue-400/20 to-blue-300/10",
    logo: "VISA",
    logoColor: "text-white",
    textColor: "text-white/90",
    pattern:
      "bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]",
  },
  mastercard: {
    gradient: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500",
    accent: "from-orange-400/20 to-red-300/10",
    logo: "mastercard",
    logoColor: "text-white",
    textColor: "text-white/90",
    pattern:
      "bg-[radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.1),transparent_50%)]",
  },
  verve: {
    gradient: "bg-gradient-to-br from-green-600 via-teal-600 to-emerald-700",
    accent: "from-green-400/20 to-teal-300/10",
    logo: "VERVE",
    logoColor: "text-white",
    textColor: "text-white/90",
    pattern:
      "bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]",
  },
  "american-express": {
    gradient: "bg-gradient-to-br from-slate-700 via-slate-800 to-black",
    accent: "from-slate-400/20 to-slate-300/10",
    logo: "AMEX",
    logoColor: "text-white",
    textColor: "text-white/90",
    pattern:
      "bg-[radial-gradient(circle_at_20%_60%,rgba(255,255,255,0.1),transparent_50%)]",
  },
};

const sizeStyles = {
  sm: "w-48 h-28 text-xs",
  md: "w-60 h-36 text-sm",
  lg: "w-72 h-44 text-base",
};

export function ATMCard({
  scheme,
  nameOnCard,
  accountNumber,
  className,
  size = "md",
}: ATMCardProps) {
  const styles = cardSchemeStyles[scheme];
  const sizeClass = sizeStyles[size];

  const MastercardLogo = () => (
    <div className="flex items-center">
      <div className="w-6 h-6 rounded-full bg-red-500 opacity-90"></div>
      <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-90 -ml-3"></div>
    </div>
  );

  const renderLogo = () => {
    if (scheme === "mastercard") {
      return <MastercardLogo />;
    }
    return (
      <span className={cn("font-bold tracking-wider", styles.logoColor)}>
        {styles.logo}
      </span>
    );
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-xl",
        styles.gradient,
        styles.pattern,
        sizeClass,
        className
      )}
    >
      {/* Background pattern overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t opacity-30",
          styles.accent
        )}
      />

      {/* Chip */}
      <div className="absolute top-4 left-4">
        <div className="w-8 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-sm shadow-sm" />
      </div>

      {/* Logo */}
      <div className="absolute top-4 right-4">{renderLogo()}</div>

      {/* Card Number */}
      <div
        className={cn(
          "absolute bottom-12 left-4 font-mono tracking-widest font-medium",
          styles.textColor
        )}
      >
        •••• •••• •••• {accountNumber.slice(-4)}
      </div>

      {/* Name */}
      <div
        className={cn(
          "absolute bottom-4 left-4 font-medium uppercase tracking-wide",
          styles.textColor
        )}
      >
        {nameOnCard}
      </div>

      {/* Holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse" />
    </Card>
  );
}
