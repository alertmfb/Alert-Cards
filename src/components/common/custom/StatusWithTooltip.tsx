// 👉  Imports (add these at the top of your file)
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import type { CardActivationStatus } from "@/types";

// ✅ Badge + tooltip component
const StatusWithTooltip = ({ status }: { status: CardActivationStatus }) => {
  const tooltipText =
    status === "Pending CA"
      ? "Pending Card Activation"
      : "Pending Card PIN Reset";

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1 rounded-md border border-orange-500 bg-orange-100 px-2 py-1 text-xs text-orange-600">
            {status}
            <Info className="h-3 w-3 shrink-0" />
          </div>
        </TooltipTrigger>

        <TooltipContent className="text-xs">{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StatusWithTooltip;
