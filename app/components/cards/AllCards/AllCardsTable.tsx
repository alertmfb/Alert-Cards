import React, { useState } from "react";
import { PageHeader } from "~/components/shared/PageHeader";
import { DataTable } from "~/components/shared/Table/DataTable";
import {
  branchOptions,
  CardTransfers,
  customerCardTableData,
} from "~/constants/data";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { toast } from "sonner";
import { Search } from "lucide-react";
import ExportDialog from "~/components/shared/Table/ExportDialog";
import { DateRangePicker } from "~/components/shared/Table/DateRangePicker";
import type { DateRange } from "react-day-picker";
import { customerCardColumns } from "./columns";
import { Label } from "~/components/ui/label";
import type { BranchType } from "~/index";
import { useGetCards } from "~/hooks/useCard";
import type { CardData } from "~/types/card";

const CardTransfersTable = () => {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState<BranchType | "ALL">("ALL");
  const [deliveryStatus, setDeliveryStatus] = React.useState("All");
  const { data, isPending } = useGetCards();
  console.log(data, isPending);
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleExport = () => {
    toast.info("🚧 Exporting data...");

    const payload = {
      search,
      branch,
      deliveryStatus,
      dateRange,
    };

    console.log("Exporting with filters:", payload);
    toast.success("✅ Export complete (simulated)");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="All Cards"
        subText="Monitor the status and movement of all cards to branches"
      />

      {/* Professional Filter Toolbar */}
      {/* <div className="bg-muted border border-gray-200 rounded-lg p-4 shadow-sm"> */}
      <div className="flex flex-col xl:flex-row xl:items-end gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <Label className="text-sm font-medium  mb-2 block"></Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search transfers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 xl:gap-6">
          {/* Branch Select */}
          <div className="">
            <Label className="text-sm font-medium  mb-2 block">Branch</Label>
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

          {/* Delivery Status Select */}
          <div className="">
            <Label className="text-sm font-medium  mb-2 block">Status</Label>
            <Select value={deliveryStatus} onValueChange={setDeliveryStatus}>
              <SelectTrigger className="h-10 min-w-[140px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Picker */}
          <div className="min-w-[200px]">
            <Label className="text-sm font-medium mb-2 block">Date Range</Label>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              // className="h-10"
            />
          </div>

          {/* Export Button */}
          <div className="flex-shrink-0">
            <Label className="text-sm font-medium text-transparent mb-2 block">
              Actions
            </Label>
            <ExportDialog
              filters={{ dateRange }}
              onExport={handleExport}
              // className="h-10"
            />
          </div>
        </div>
      </div>
      {/* </div> */}

      <DataTable
        columns={customerCardColumns}
        data={data?.data as CardData[]}
      />
    </div>
  );
};

export default CardTransfersTable;
