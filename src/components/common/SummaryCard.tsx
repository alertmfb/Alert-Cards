// componen@/components/common/SummaryCard.tsx
import { IconFidgetSpinner } from "@tabler/icons-react";
import { type ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value?: string | number;
  subText?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  error?: string;
}

export function SummaryCard({
  title,
  value = 0,
  subText,
  icon,
  isLoading = false,
  error,
}: SummaryCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
        </div>
        <div className="text-2xl font-bold font-geist-mono">
          {isLoading ? (
            <div className="flex items-center">
              <IconFidgetSpinner className="animate-spin" size={24} />
            </div>
          ) : error ? (
            <p className="text-sm font-light text-muted-foreground">{error}</p>
          ) : (
            value?.toLocaleString?.() ?? value
          )}
        </div>
        {subText && (
          <p className="text-xs text-muted-foreground mt-1">{subText}</p>
        )}
      </div>
    </div>
  );
}
