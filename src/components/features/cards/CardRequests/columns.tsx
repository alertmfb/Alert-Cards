// columns.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { CustomStatus } from "@/components/common/shared/Table/CustomStatus";
import { Checkbox } from "@/components/ui/checkbox";
import type { CardRequestData } from "@/types";
import { CardRequestActionMenu } from "./ActionMenu";
import { formatDateTime } from "@/lib";

export const cardRequestColumns: ColumnDef<CardRequestData, unknown>[] = [
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
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "cardScheme",
    header: "Card Scheme",
  },
  {
    accessorKey: "cardVariant",
    header: "Card Variant",
  },
  {
    accessorKey: "branch",
    header: "Pick up",
  },
  {
    accessorKey: "cardStatus",
    header: "Card Status",
    cell: ({ row }) => {
      const status = row.original.cardStatus;
      const variant =
        status === "Approved"
          ? "success"
          : status === "Pending"
            ? "warning"
            : "danger";
      return <CustomStatus label={status} variant={variant} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
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
    id: "actions",
    header: "Action",
    cell: ({ row }) => <CardRequestActionMenu item={row.original} />,
  },
];
