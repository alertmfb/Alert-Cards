// columns.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { CustomStatus } from "@/components/common/shared/Table/CustomStatus";
import type { CustomerCardData } from "@/types";
import { ActionMenu } from "./ActionMenu";
import { Checkbox } from "@/components/ui/checkbox";
import { maskPan } from "@/lib";

export const customerCardColumns: ColumnDef<CustomerCardData>[] = [
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
    accessorKey: "panNumber",
    header: "PAN Number",
    cell: ({ row }) => maskPan(row.original.panNumber) || "N/A",
  },
  {
    accessorKey: "cardScheme",
    header: "Card Scheme",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "cardStatus",
    header: "Card Status",
    cell: ({ row }) => {
      const status = row.original.cardStatus;

      const variant =
        status === "Activated"
          ? "success"
          : status === "Inactive"
            ? "warning"
            : "danger";

      return <CustomStatus label={status} variant={variant} />;
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => {
      const status = row.original.deliveryStatus;

      const variant =
        status === "Branch Delivered"
          ? "success"
          : status === "Dispatched"
            ? "info"
            : "warning";

      return <CustomStatus label={status} variant={variant} />;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <ActionMenu item={row.original} />,
  },
];
