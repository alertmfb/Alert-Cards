import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import CardStatsGrid from "components/dashboard/DashboardCards";
import { PageHeader } from "components/shared/PageHeader";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "components/ui/select";
import { CardOverviewChart } from "components/dashboard/CardOverview";
import { CardRequests } from "components/dashboard/CardRequest";
import DashboardTable from "components/dashboard/DashboardTable/DashboardTable";
import { branchOptions } from "~/constants/data";

const dateOptions = ["Last 7 days", "Last day", "This month"];

const DashboardPage = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
    toast.success(`Branch selected: ${value}`);
  };

  const handleDateChange = (value: string) => {
    setSelectedDateRange(value);
    toast.success(`Date filter: ${value}`);
  };

  return (
    <div className="p-4 space-y-8">
      <PageHeader
        title="Cards"
        subText="View and manage all debit cards processed across branches."
        rightSection={
          <>
            <Select onValueChange={handleBranchChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branchOptions.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleDateChange}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                  <SelectValue placeholder="Filter by date" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((date) => (
                  <SelectItem key={date} value={date}>
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        }
      />
      <CardStatsGrid />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <CardOverviewChart />
        <CardRequests />
      </div>

      <DashboardTable />
    </div>
  );
};

export default DashboardPage;
