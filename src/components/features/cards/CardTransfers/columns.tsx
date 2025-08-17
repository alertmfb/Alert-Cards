import type { ColumnDef } from "@tanstack/react-table";
import type { CardTransfer } from "@/types";
import { CardTransferActions } from "./ActionMenu";
import { CustomStatus } from "@/components/common/shared/Table/CustomStatus";
import { formatDateTime, maskPan } from "@/lib";
import { Checkbox } from "@/components/ui/checkbox";

export const cardTransferColumns: ColumnDef<CardTransfer>[] = [
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
    header: "Customer Name",
    accessorKey: "customerName",
  },
  {
    header: "PAN Number",
    accessorKey: "panNumber",
    cell: ({ row }) => {
      const pan = maskPan(row.original.panNumber);
      return pan;
    },
  },
  {
    header: "Card Scheme",
    accessorKey: "cardScheme",
  },
  {
    header: "Card Variant",
    accessorKey: "cardVariant",
  },
  {
    header: "Expiry Date",
    accessorKey: "expiryDate",
  },
  {
    header: "Approved Date",
    accessorKey: "approvedDate",
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original.approvedDate);
      return (
        <div>
          <div>{date}</div>
          <div className="text-xs text-red-600">{time}</div>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;

      const variant =
        status === "approved"
          ? "success"
          : status === "declined"
            ? "danger"
            : "warning";

      return <CustomStatus label={status} variant={variant} />;
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <CardTransferActions
        onApprove={() => console.log("Approved", row.original.id)}
        onDecline={() => console.log("Declined", row.original.id)}
      />
    ),
  },
];
