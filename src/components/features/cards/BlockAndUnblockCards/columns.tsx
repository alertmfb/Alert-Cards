import type { ColumnDef } from "@tanstack/react-table";
import { maskPan, formatDateTime } from "@/lib";
import type { CardblockData, CardBlockUnblockRecord } from "@/types";
import { BlockCardActionMenu, UnblockCardActionMenu } from "./ActionMenu";

export const getCardActionColumns = (
  actionType: "block" | "unblock"
): ColumnDef<CardblockData>[] => [
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => row.original?.card?.customer?.customerName || "N/A",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
    cell: ({ row }) => row.original?.card?.customer?.accountNumber || "N/A",
  },
  {
    accessorKey: "panNumber",
    header: "PAN Number",
    cell: ({ row }) => maskPan(row.original.card.cardRequest.pan),
  },
  // {
  //   accessorKey: "cardScheme",
  //   header: "Card Scheme",
  // },
  // {
  //   accessorKey: "cardVariant",
  //   header: "Card Variant",
  // },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original?.card?.expiryDate);
      return (
        <div>
          <div>{date}</div>
          {/* <div className="text-xs text-red-600">{time}</div> */}
        </div>
      );
    },
  },
  {
    accessorKey: "dateEntered",
    header: "Date Entered",
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original?.createdAt);
      return (
        <div>
          <div>{date}</div>
          <div className="text-xs text-red-500">{time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const reason = row.original.reason;
      return reason.length > 30 ? reason.slice(0, 30) + "..." : reason;
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) =>
      actionType === "block" ? (
        <BlockCardActionMenu record={row.original} />
      ) : (
        <UnblockCardActionMenu record={row.original} />
      ),
  },
];
