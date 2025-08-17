// columns.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { CustomStatus } from "~/components/shared/Table/CustomStatus";
import type { CustomerCardData } from "~/index";
import { Checkbox } from "~/components/ui/checkbox";
import { ActionMenu } from "./ActionMenu";
import { maskPan } from "~/utils";
import type { CardData } from "~/types/card";

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
    cell: ({ row }) => row.original?.customer?.customerName || "N/A",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },
  {
    accessorKey: "panNumber",
    header: "PAN Number",
    cell: ({ row }) => maskPan(row.original?.pan) || "N/A",
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
