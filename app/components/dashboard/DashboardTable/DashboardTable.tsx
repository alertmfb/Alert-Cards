import { DataTable } from "~/components/shared/Table/DataTable";

import { customerCardColumns } from "./columns";
import { branchOptions, customerCardTableData } from "~/constants/data";
import type { DateRange } from "react-day-picker";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { DateRangePicker } from "~/components/shared/Table/DateRangePicker";
import type { BranchType } from "~/index";

type FilterValues = {
  search?: string;
  branch?: BranchType;
  deliveryStatus?: string;
  dateRange?: DateRange;
};

const DashboardTable = () => {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState<BranchType | "ALL">("ALL");
  const [status, setStatus] = useState("All");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex flex-col xl:flex-row xl:items-end gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <Label className="text-sm font-medium  mb-2 block"></Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4" />
            <Input
              placeholder="Search dashboard data..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9 w-full max-w-md"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          {/* Branch Select */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Branch</Label>
            <Select
              value={branch}
              onValueChange={(val) => setBranch(val as BranchType | "ALL")}
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
          <div>
            <Label className="text-sm font-medium mb-2 block">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                {/* <SelectItem value="Error">Error</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Picker */}
          <div className="min-w-[200px]">
            <Label className="text-sm font-medium mb-2 block">Date Range</Label>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>
        </div>
      </div>

      <DataTable columns={customerCardColumns} data={customerCardTableData} />
    </div>
  );
};

export default DashboardTable;
