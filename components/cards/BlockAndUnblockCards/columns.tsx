import type { ColumnDef } from "@tanstack/react-table";
import { maskPan, formatDateTime } from "~/utils";
import type { CardBlockUnblockRecord } from "~/index";
import { BlockCardActionMenu, UnblockCardActionMenu } from "./ActionMenu";

export const getCardActionColumns = (
  actionType: "block" | "unblock"
): ColumnDef<CardBlockUnblockRecord>[] => [
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
    cell: ({ row }) => maskPan(row.original.panNumber),
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
    // cell: ({ row }) => {
    //   const { date, time } = formatDateTime(row.original.expiryDate);
    //   return (
    //     <div>
    //       <div>{date}</div>
    //       <div className="text-xs text-red-600">{time}</div>
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: "dateEntered",
    header: "Date Entered",
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original.dateEntered);
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
