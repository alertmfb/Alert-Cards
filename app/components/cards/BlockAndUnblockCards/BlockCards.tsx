import React, { useState } from "react";

import { Search } from "lucide-react";

import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { DateRangePicker } from "~/components/shared/Table/DateRangePicker";
import ExportDialog from "~/components/shared/Table/ExportDialog";
import type { CardFilterType } from "~/index";
import { DataTable } from "~/components/shared/Table/DataTable";
import { blockCardData } from "~/constants/data";
import { getCardActionColumns } from "./columns";

const BlockCards = () => {
  const [filters, setFilters] = useState<CardFilterType>({
    search: "",
    dateRange: { from: null, to: null },
  });

  const handleExport = () => {
    toast.info("Exporting blocked cards...");
    console.log("Export Blocked Cards with:", filters);
    // TODO: Replace with export endpoint
    toast.success("✅ Export complete (simulated)");
  };

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
      <DataTable data={blockCardData} columns={getCardActionColumns("block")} />
      {/* </div> */}
    </div>
  );
};

export default BlockCards;
