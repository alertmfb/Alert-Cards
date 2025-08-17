import React from "react";
import { PageHeader } from "~/components/shared/PageHeader";
import { DataTable } from "~/components/shared/Table/DataTable";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Search } from "lucide-react";
import { Label } from "~/components/ui/label";
import { adminColumns } from "./columns";
import { adminTableData } from "~/constants/data";
import { AddTeamMemberDialog } from "./AddTeamMemberDialog";
import { useRoleStore } from "~/stores/roleStore";
import { createRoleOptions } from "~/lib/utils/roleOptions";
import type { RoleType } from "~/index";
import { useRolesQuery } from "~/api/queries/auth";
import { useUsersQuery } from "~/api/queries/users";

const AdminTable = () => {
  /* ── local state ─────────────────────────── */
  const [search, setSearch] = React.useState("");
  const [role, setRole] = React.useState<RoleType | "All">("All");
  const [status, setStatus] = React.useState("All");
  const { data: users = [], isLoading: usersLoading } = useUsersQuery();

  /* ── roles: fetch + store ────────────────── */
  const { isLoading: rolesLoading } = useRolesQuery(); // triggers fetch / cache
  const roles = useRoleStore((s) => s.roles); // always use store

  /* Create <Select> options once roles are available */
  const roleOptions = React.useMemo(
    () => [{ label: "All", value: "All" }, ...createRoleOptions(roles)],
    [roles]
  );

  /* ── table filtering ─────────────────────── */
  const filteredData = React.useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = `${u.firstName} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRole = role === "All" || u.role === role;
      const matchesStatus =
        status === "All" || (u.isActive ? "Active" : "Inactive") === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  /* ── UI ───────────────────────────────────── */
  return (
    <div className="space-y-8">
      <PageHeader
        title="Administration"
        subText="Manage internal access by adding users and defining their control levels."
      />

      {/* Filters */}
      <div className="flex flex-col xl:flex-row xl:items-end gap-4">
        {/* Search */}
        <div className="flex-1 min-w-0">
          <Label className="text-sm font-medium mb-2 block" />
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
          {/* Role select */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Role</Label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as RoleType | "All")}
              disabled={rolesLoading}
            >
              <SelectTrigger className="h-10 min-w-[140px]">
                <SelectValue
                  placeholder={rolesLoading ? "Loading…" : "Select role"}
                />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status select */}
          <div>
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

          {/* Add member */}
          <AddTeamMemberDialog />
        </div>
      </div>

      {/* Data table */}
      <DataTable columns={adminColumns} data={filteredData} />
    </div>
  );
};

export default AdminTable;
