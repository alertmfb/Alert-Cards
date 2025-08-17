import React, { useState } from "react";
import { PageHeader } from "~/components/shared/PageHeader";
import { DataTable } from "~/components/shared/Table/DataTable";
import { cardTransferColumns } from "./columns";
import { CardTransfers } from "~/constants/data";
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

type FilterState = {
  search: string;
  deliveryStatus: string;
  dateRange: DateRange;
};
const CardTransfersTable = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    deliveryStatus: "",
    dateRange: { from: undefined, to: undefined },
  });
  // const [search, setSearch] = React.useState("");
  // const [deliveryStatus, setDeliveryStatus] = React.useState("All");
  // const [dateRange, setDateRange] = React.useState<DateRange>({
  //   from: undefined,
  //   to: undefined,
  // });

  const handleExport = () => {
    toast.info("🚧 Exporting data...");

    // Simulate filter params being passed to the endpoint
    const payload = {
      filters,
    };

    // TODO: Plug export endpoint here and pass the payload
    console.log("Exporting with filters:", payload);
    toast.success("✅ Export complete (simulated)");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Card Transfer"
        subText="Monitor the status and movement of all cards to branches"
      />

      {/* Filter Toolbar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left - Search */}
        <div className="w-full lg:w-1/3 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="pl-10"
          />
        </div>

        {/* Right - Filters */}
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

          {/* Export Dialog */}
          <ExportDialog filters={filters} onExport={handleExport} />
        </div>
      </div>

      <DataTable columns={cardTransferColumns} data={CardTransfers} />
    </div>
  );
};

export default CardTransfersTable;
