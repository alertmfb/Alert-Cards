import React, { useState } from "react";
import { PageHeader } from "@/components/common/shared/PageHeader";
import { DataTable } from "@/components/common/shared/Table/DataTable";
import { cardActivationColumns } from "./columns";
import { cardActivationData } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/common/shared/Table/DateRangePicker";
import ExportDialog from "@/components/common/shared/Table/ExportDialog";
import type { DateRange } from "react-day-picker";
import { useGetCardActivations } from "@/hooks";
import TableLoader from "@/components/common/TableLoader";
import type { ActivationRequest } from "@/types";

type FilterState = {
  search: string;
  deliveryStatus: string;
  dateRange: DateRange;
};

const CardActivationTable = () => {
  const { data, isPending } = useGetCardActivations();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    deliveryStatus: "",
    dateRange: { from: undefined, to: undefined },
  });

  const activationRequests = data?.data?.requests || [];
  const filteredData = React.useMemo(() => {
    return activationRequests?.filter((card: ActivationRequest) => {
      const matchesSearch = `${card.card?.customer?.customerName} `
        .toLowerCase()
        .includes(filters?.search?.toLowerCase());

      const matchesStatus =
        filters?.deliveryStatus === "All" ||
        (card?.card?.status ? "Active" : "Inactive") ===
          filters?.deliveryStatus;

      return matchesSearch;
    });
  }, [activationRequests]);

  const handleExport = () => {
    toast.info("📦 Exporting filtered data...");

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
      {isPending ? (
        <TableLoader />
      ) : (
        <DataTable columns={cardActivationColumns} data={filteredData} />
      )}
    </div>
  );
};

export default CardActivationTable;
