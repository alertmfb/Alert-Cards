import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { type DateRange } from "react-day-picker"; // Needed for typing

export const DateRangePicker = ({
  value,
  onChange,
  className,
}: {
  value: DateRange;
  onChange: (value: DateRange) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const formattedLabel =
    value.from && value.to
      ? `${format(value.from, "LLL dd, yyyy")} - ${format(
          value.to,
          "LLL dd, yyyy"
        )}`
      : "Pick a date range";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full md:w-[250px] justify-start text-left font-normal",
            !value.from && !value.to && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          selected={value}
          onSelect={(range) => onChange(range as DateRange)}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};
