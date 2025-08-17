// CardDisplay.tsx - Beautiful Reusable Card Component
import { cn } from "~/lib/utils";
import type { ReactNode } from "react";

export type CardType = "mastercard" | "visa" | "verve" | "afrigo" | "default";

interface CardTypeConfig {
  name: string;
  colors: string;
  icon: ReactNode;
  chipColor: string;
}

interface CardDisplayProps {
  cardType?: CardType;
  panNumber?: string;
  cardHolderName?: string;
  expiryDate?: string;
  bankName?: string;
  className?: string;
}

export const cardTypes: Record<CardType, CardTypeConfig> = {
  mastercard: {
    name: "Mastercard",
    colors: "from-red-500 via-orange-400 to-yellow-400",
    chipColor: "from-yellow-200 to-yellow-300",
    icon: (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-red-500 rounded-full opacity-95 shadow-lg" />
        <div className="w-10 h-10 bg-yellow-400 rounded-full -ml-5 opacity-95 shadow-lg" />
      </div>
    ),
  },
  visa: {
    name: "Visa",
    colors: "from-blue-600 via-blue-500 to-indigo-600",
    chipColor: "from-blue-100 to-blue-200",
    icon: (
      <div className="bg-white px-4 py-2 rounded-md shadow-lg">
        <span className="text-blue-600 font-black text-xl tracking-wider">
          VISA
        </span>
      </div>
    ),
  },
  verve: {
    name: "Verve",
    colors: "from-green-600 via-emerald-500 to-green-400",
    chipColor: "from-green-100 to-green-200",
    icon: (
      <div className="bg-white px-4 py-2 rounded-md shadow-lg">
        <span className="text-green-600 font-black text-xl tracking-wider">
          VERVE
        </span>
      </div>
    ),
  },
  afrigo: {
    name: "Afrigo",
    colors: "from-purple-600 via-violet-500 to-purple-400",
    chipColor: "from-purple-100 to-purple-200",
    icon: (
      <div className="bg-white px-4 py-2 rounded-md shadow-lg">
        <span className="text-purple-600 font-black text-xl tracking-wider">
          AFRIGO
        </span>
      </div>
    ),
  },
  default: {
    name: "Bank Card",
    colors: "from-slate-700 via-slate-600 to-slate-500",
    chipColor: "from-slate-100 to-slate-200",
    icon: (
      <div className="bg-white px-4 py-2 rounded-md shadow-lg">
        <span className="text-slate-600 font-black text-lg tracking-wider">
          CARD
        </span>
      </div>
    ),
  },
};

export function CardDisplay({
  cardType = "default",
  panNumber = "**** **** **** ****",
  cardHolderName = "CARD HOLDER",
  expiryDate = "MM/YY",
  bankName = "Alert MFB",
  className,
}: CardDisplayProps) {
  const card =
    cardTypes[cardType.toLowerCase() as CardType] || cardTypes.default;

  // Format PAN number to show first 4 and last 4 digits
  const formatPAN = (pan: string): string => {
    if (!pan) return "**** **** **** ****";
    const cleanPAN = pan.replace(/\s/g, "");
    if (cleanPAN.length >= 8) {
      const first4 = cleanPAN.substring(0, 4);
      const last4 = cleanPAN.substring(cleanPAN.length - 4);
      return `${first4} **** **** ${last4}`;
    }
    return pan;
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {/* Card Container */}
      <div className="relative w-full aspect-[1.586/1] perspective-1000">
        <div
          className={cn(
            "relative w-full h-full rounded-2xl overflow-hidden shadow-2xl",
            "bg-gradient-to-br transform-gpu",
            card.colors
          )}
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large Circle */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/15"></div>

            {/* Small Circle */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10 blur-lg"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/15"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60' fill='none' stroke='white' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
                }}
              ></div>
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-medium opacity-90 tracking-wide">
                  {bankName}
                </div>
                <div className="text-xs opacity-70 uppercase tracking-widest">
                  Debit Card
                </div>
              </div>
              <div className="flex-shrink-0">{card.icon}</div>
            </div>

            {/* Chip Section */}
            <div className="flex items-center space-x-4">
              <div
                className={cn(
                  "w-12 h-9 rounded-md bg-gradient-to-br shadow-lg border border-white/20",
                  card.chipColor
                )}
              >
                <div className="w-full h-full rounded-md bg-gradient-to-br from-yellow-200/80 to-yellow-300/80 shadow-inner">
                  <div className="w-full h-full rounded-md border border-yellow-400/30 bg-gradient-to-br from-yellow-100/50 to-transparent"></div>
                </div>
              </div>

              {/* Contactless Symbol */}
              <div className="flex space-x-1 opacity-80">
                <div className="w-4 h-4 rounded-full border-2 border-white/60"></div>
                <div className="w-4 h-4 rounded-full border-2 border-white/40 -ml-2"></div>
                <div className="w-4 h-4 rounded-full border-2 border-white/20 -ml-2"></div>
              </div>
            </div>

            {/* PAN Number Section */}
            <div className="flex items-center justify-center py-2">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold tracking-[0.25em] drop-shadow-lg">
                  {formatPAN(panNumber)}
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-end">
              <div className="flex-1 min-w-0 max-w-[60%]">
                <div className="text-xs opacity-80 uppercase tracking-widest mb-1 font-medium">
                  Card Holder
                </div>
                <div className="font-bold uppercase tracking-wide text-sm truncate drop-shadow">
                  {cardHolderName}
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="text-xs opacity-80 uppercase tracking-widest mb-1 font-medium">
                  Expires
                </div>
                <div className="font-bold text-sm tracking-wider drop-shadow">
                  {expiryDate}
                </div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20"></div>
          </div>

          {/* Holographic Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
