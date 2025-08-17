import React, { useState } from "react";
import { PageHeader } from "~/components/shared/PageHeader";
import { DataTable } from "~/components/shared/Table/DataTable";
import { cardActivationColumns } from "./columns";
import { cardActivationData } from "~/constants/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { DateRangePicker } from "~/components/shared/Table/DateRangePicker";
import ExportDialog from "~/components/shared/Table/ExportDialog";
import type { DateRange } from "react-day-picker";

type FilterState = {
  search: string;
  deliveryStatus: string;
  dateRange: DateRange;
};

const CardActivationTable = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    deliveryStatus: "",
    dateRange: { from: undefined, to: undefined },
  });

  const handleExport = () => {
    toast.info("📦 Exporting filtered data...");
    console.log("Export with filters:", filters);
    // TODO: Hook this up to real export logic
    toast.success("✅ Export complete (simulated)");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Card Activation"
        subText="Activate newly issued or replaced debit cards to enable transactions."
      />

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full lg:w-1/3 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search by name, ID or card number..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="pl-10"
          />
        </div>

        {/* Right Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Delivery Status Select */}
          <Select
            value={filters.deliveryStatus}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, deliveryStatus: value }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Delivery Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Picker */}
          <DateRangePicker
            value={filters.dateRange}
            onChange={(dateRange) =>
              setFilters((prev) => ({ ...prev, dateRange }))
            }
            // placeholder="Filter by date range"
          />

          {/* Export */}
          <ExportDialog filters={filters} onExport={handleExport} />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={cardActivationColumns} data={cardActivationData} />
    </div>
  );
};

export default CardActivationTable;
