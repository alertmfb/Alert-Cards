import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ExportDialog } from "./ExportDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { branchOptions } from "@/lib/data";

export type Filters = {
  search?: string;
  branch?: string;
  deliveryStatus?: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
};

type TableFilterProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  branches?: string[];
  deliveryStatuses?: string[];
};

export const TableFilterComponent = ({
  filters,
  onFiltersChange,
  branches = [],
  deliveryStatuses = [],
}: TableFilterProps) => {
  const handleChange = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleDateRangeChange = (from?: Date, to?: Date) => {
    onFiltersChange({
      ...filters,
      dateRange: { from, to },
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
      <Input
        placeholder="Search..."
        value={filters.search || ""}
        onChange={(e) => handleChange("search", e.target.value)}
        className="w-full md:max-w-sm"
      />

      <div className="flex flex-wrap gap-4 items-center">
        {branches.length > 0 && (
          <Select
            onValueChange={(val) => handleChange("branch", val)}
            value={filters.branch}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branchOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {deliveryStatuses.length > 0 && (
          <Select
            onValueChange={(val) => handleChange("deliveryStatus", val)}
            value={filters.deliveryStatus}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Delivery Status" />
            </SelectTrigger>
            <SelectContent>
              {deliveryStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "dd MMM yyyy")} -{" "}
                    {format(filters.dateRange.to, "dd MMM yyyy")}
                  </>
                ) : (
                  format(filters.dateRange.from, "dd MMM yyyy")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{
                from: filters.dateRange?.from,
                to: filters.dateRange?.to,
              }}
              onSelect={({ from, to }: any) => handleDateRangeChange(from, to)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <ExportDialog filters={filters} />
      </div>
    </div>
  );
};
