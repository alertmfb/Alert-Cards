import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "components/ui/checkbox";
import type { UserAdminType } from "~/index";
import { cn } from "~/lib/utils";
import { formatDateTime, getBranchLabel } from "~/utils";
import { AdminActionMenu } from "./AdminActionMenu";

export const adminColumns: ColumnDef<UserAdminType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center text-sm font-medium">
            {initials}
          </div>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => {
      const branch = row.original.branch;
      return <span>{getBranchLabel(branch)}</span>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const statusClasses = cn(
        "px-3 py-1 rounded-full text-sm font-medium border",
        status === "Active"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-gray-100 text-gray-700 border-gray-200"
      );

      return <span className={statusClasses}>{status}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original.createdAt);
      return (
        <div>
          <div>{date}</div>
          <div className="text-xs text-red-600">{time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <AdminActionMenu admin={row.original} />,
  },
];
