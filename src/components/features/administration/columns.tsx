import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import type { ServerUser, UserAdminType } from "@/types";
import { cn } from "@/lib";
import { formatDateTime, getBranchLabel } from "@/lib";
import { AdminActionMenu } from "./AdminActionMenu";

export const adminColumns: ColumnDef<ServerUser>[] = [
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
    accessorFn: (row) => `${row.firstName} ${row.lastName}`.trim(),
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const fullName: string = row.getValue("name");
      const initials = fullName
        .split(" ")
        .filter(Boolean) // Remove empty strings
        .map((n) => n[0]?.toUpperCase())
        .filter(Boolean) // Remove undefined values
        .join("")
        .slice(0, 2);

      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center text-sm font-medium">
            {initials || "??"}
          </div>
          <span className="font-medium">{fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => {
      const branch = row.original.branch;
      const branchName = branch?.name;

      if (!branchName) {
        return <span className="text-gray-400 italic">No branch assigned</span>;
      }

      return (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
          {getBranchLabel(branchName)}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-sm font-medium">
        {row.original.role}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (row) => (row.isActive ? "Active" : "Inactive"),
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const isActive = status === "Active";

      const classes = cn(
        "px-3 py-1 rounded-full text-sm font-medium border inline-flex items-center gap-1",
        isActive
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-gray-100 text-gray-700 border-gray-200"
      );

      return (
        <span className={classes}>
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              isActive ? "bg-green-500" : "bg-gray-400"
            )}
          />
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original.createdAt);
      return (
        <div className="text-sm">
          <div className="font-medium">{date}</div>
          <div className="text-gray-500">{time}</div>
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => <AdminActionMenu admin={row.original} />,
    enableSorting: false,
  },
];
