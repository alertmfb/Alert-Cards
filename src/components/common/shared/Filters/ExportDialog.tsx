import { format } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Filters } from "./TableFilterComponent";

export const ExportDialog = ({ filters }: { filters: Filters }) => {
  const handleExport = () => {
    const { from, to } = filters.dateRange;

    if (from && to) {
      toast.success(
        `Exporting data from ${format(from, "LLL dd, yyyy")} to ${format(
          to,
          "LLL dd, yyyy"
        )}`
      );
    } else {
      toast.success("Exporting all data");
    }

    // Backend integration will use `filters`
    console.log("📦 Export payload:", filters);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Export</Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="flex flex-col gap-2">
          <Button variant="ghost" onClick={handleExport}>
            Export
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
