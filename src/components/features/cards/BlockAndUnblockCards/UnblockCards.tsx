import React, { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/common/shared/Table/DateRangePicker";
import ExportDialog from "@/components/common/shared/Table/ExportDialog";
import type { CardblockData, CardFilterType } from "@/types";
import { unblockCardData } from "@/lib/data";
import { getCardActionColumns } from "./columns";
import { DataTable } from "@/components/common/shared/Table/DataTable";
import { useGetCardBlocks } from "@/hooks";
import TableLoader from "@/components/common/TableLoader";

const UnblockCards = () => {
  const type = "UNBLOCK";
  const { data, isPending } = useGetCardBlocks(type);
  const [filters, setFilters] = useState<CardFilterType>({
    search: "",
    dateRange: { from: undefined, to: undefined },
  });

  const handleExport = () => {
    toast.info("📤 Exporting unblocked cards...");
    console.log("Export Unblocked Cards with:", filters);
    // TODO: Replace with export endpoint
    toast.success("✅ Export complete (simulated)");
  };

  const unBlockRequests = data?.data || [];
  const filteredData = React.useMemo(() => {
    return unBlockRequests?.filter((card: CardblockData) => {
      const matchesSearch = `${card.card?.customer?.customerName} `
        .toLowerCase()
        .includes(filters?.search?.toLowerCase());

      return matchesSearch;
    });
  }, [unBlockRequests]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Search */}
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

        {/* Right Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <DateRangePicker
            value={filters.dateRange}
            onChange={(dateRange) =>
              setFilters((prev) => ({
                ...prev,
                dateRange: {
                  from: dateRange.from ?? null,
                  to: dateRange.to ?? null,
                },
              }))
            }
          />
          <ExportDialog filters={filters} onExport={handleExport} />
        </div>
      </div>

      {/* TODO: Blocked cards table or list */}
      {/* <div className="border rounded-md p-4 text-sm text-muted-foreground"> */}
      {/* Blocked cards list will go here. */}
      {isPending ? (
        <TableLoader />
      ) : (
        <DataTable
          data={filteredData}
          columns={getCardActionColumns("block")}
        />
      )}
      {/* </div> */}
    </div>
  );
};

export default UnblockCards;
