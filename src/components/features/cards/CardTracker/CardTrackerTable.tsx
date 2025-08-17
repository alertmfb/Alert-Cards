import React, { useState } from "react";
import { PageHeader } from "@/components/common/shared/PageHeader";
import { DataTable } from "@/components/common/shared/Table/DataTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Search } from "lucide-react";
import ExportDialog from "@/components/common/shared/Table/ExportDialog";
import { DateRangePicker } from "@/components/common/shared/Table/DateRangePicker";
import type { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/label";

// Replace these with your actual tracker data and columns
import { branchOptions, cardTrackerData } from "@/lib/data";
import { cardTrackerColumns } from "./columns";
import type { BranchType } from "@/types";

const CardTrackerTable = () => {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState<BranchType | "ALL">("ALL");
  const [status, setStatus] = useState("All");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleExport = () => {
    toast.info("🚧 Exporting data...");

    const payload = {
      search,
      branch,
      status,
      dateRange,
    };

    console.log("Exporting with filters:", payload);
    toast.success("✅ Export complete (simulated)");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Card Tracker"
        subText="Track the end-to-end progress of card deliveries"
      />

      <div className="flex flex-col xl:flex-row xl:items-end gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <Label className="text-sm font-medium  mb-2 block"></Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tracker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 xl:gap-6">
          {/* Branch Select */}
          <div className="">
            <Label className="text-sm font-medium mb-2 block">Branch</Label>
            <Select
              value={branch}
              onValueChange={(val) => setBranch(val as BranchType)}
            >
              <SelectTrigger className="h-10 min-w-[140px]">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branchOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Select */}
          <div className="">
            <Label className="text-sm font-medium  mb-2 block">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-10 min-w-[140px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Returned">Returned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Picker */}
          <div className="min-w-[200px]">
            <Label className="text-sm font-medium  mb-2 block">
              Date Range
            </Label>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>

          {/* Export Button */}
          <div className="flex-shrink-0">
            <Label className="text-sm font-medium text-transparent mb-2 block">
              Actions
            </Label>
            <ExportDialog filters={{ dateRange }} onExport={handleExport} />
          </div>
        </div>
      </div>

      <DataTable columns={cardTrackerColumns} data={cardTrackerData} />
    </div>
  );
};

export default CardTrackerTable;
