import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export const DateRangePicker = ({
  value,
  onChange,
}: {
  value: { from: Date | null; to: Date | null };
  onChange: (value: { from: Date | null; to: Date | null }) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full md:w-[250px] justify-start text-left font-normal",
            !value.from && !value.to && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value.from && value.to
            ? `${format(value.from, "LLL dd, yyyy")} - ${format(
                value.to,
                "LLL dd, yyyy"
              )}`
            : "Pick a date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          //   selected={value}
          //   onSelect={onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};
