import React from "react";
import { PageHeader } from "components/shared/PageHeader";
import { DataTable } from "components/shared/Table/DataTable";
import { Input } from "components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "components/ui/select";
import { Search } from "lucide-react";
import { Label } from "~/components/ui/label";
import { adminColumns } from "./columns";
import { adminTableData } from "~/constants/data";
import { AddTeamMemberDialog } from "./AddTeamMemberDialog";

const AdminTable = () => {
  const [search, setSearch] = React.useState("");
  const [role, setRole] = React.useState("All");
  const [status, setStatus] = React.useState("All");

  const filteredData = adminTableData.filter((item) => {
    const matchesSearch = `${item.name} ${item.email}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRole = role === "All" || item.role === role;
    const matchesStatus = status === "All" || item.status === status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Administration"
        subText="Manage internal access by adding users and defining their control levels."
      />

      <div className="flex flex-col xl:flex-row xl:items-end gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <Label className="text-sm font-medium mb-2 block"></Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9 w-full max-w-md"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 xl:gap-6">
          {/* Role Select */}
          <div className="">
            <Label className="text-sm font-medium mb-2 block">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-10 min-w-[140px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="CSO">CSO</SelectItem>
                <SelectItem value="HOP">HOP</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Select */}
          <div className="">
            <Label className="text-sm font-medium mb-2 block">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-10 min-w-[140px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Member */}
          <AddTeamMemberDialog />
        </div>
      </div>

      <DataTable columns={adminColumns} data={filteredData} />
    </div>
  );
};

export default AdminTable;
