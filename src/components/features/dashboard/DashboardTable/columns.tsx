// columns.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { CustomStatus } from "@/components/common/shared/Table/CustomStatus";
import type { CardData, CustomerCardData } from "@/types";
import { ActionMenu } from "./ActionMenu";
import { Checkbox } from "@/components/ui/checkbox";
import { maskPan } from "@/lib";

export const customerCardColumns: ColumnDef<CardData>[] = [
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
    cell: ({ row }) =>
      row.original?.customer?.customerName
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ") || "N/A",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
    cell: ({ row }) => row.original?.customer?.accountNumber || "N/A",
  },
  {
    accessorKey: "panNumber",
    header: "PAN Number",
    cell: ({ row }) => maskPan(row.original?.pan) || "N/A",
  },
  {
    accessorKey: "cardScheme",
    header: "Card Scheme",
    cell: ({ row }) => row.original?.scheme || "N/A",
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => row.original?.pickUpBranch?.name || "N/A",
  },
  {
    accessorKey: "cardStatus",
    header: "Card Status",
    cell: ({ row }) => {
      const status = row.original.card?.status;

      const variant =
        row.original.card?.status === "Activated"
          ? "success"
          : row.original.card?.status === "Inactive"
          ? "warning"
          : "danger";

      return (
        <CustomStatus label={row.original.card?.status} variant={variant} />
      );
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
  // {
  //   id: "actions",
  //   header: "Action",
  //   cell: ({ row }) => <ActionMenu item={row.original} />,
  // },
];
