import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { CustomStatus } from "~/components/shared/Table/CustomStatus";
import type { CardTrackerData } from "~/index";
import { CardTrackerActionMenu } from "./ActionMenu";
import { formatDateTime } from "~/utils";

export const cardTrackerColumns: ColumnDef<CardTrackerData, unknown>[] = [
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
    accessorKey: "accountName",
    header: "Account Name",
  },

  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },

  // {
  //   accessorKey: "panNumber",
  //   header: "PAN Number",
  // },

  {
    accessorKey: "cardScheme",
    header: "Card Scheme",
  },

  // {
  //   accessorKey: "cardVariant",
  //   header: "Card Variant",
  // },

  // {
  //   accessorKey: "requesterNT",
  //   header: "Requester NT",
  // },

  {
    accessorKey: "requesterBranch",
    header: "Requester Branch",
  },

  // {
  //   accessorKey: "pickupBranch",
  //   header: "Pick up Branch",
  // },

  {
    accessorKey: "approvedDate",
    header: "Approved Date",
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
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => {
      const status = row.original.deliveryStatus;
      const variant =
        status === "Delivered"
          ? "success"
          : status === "In Production"
            ? "warning"
            : "danger";
      return <CustomStatus label={status} variant={variant} />;
    },
  },

  // {
  //   accessorKey: "requestChannel",
  //   header: "Request Channel",
  // },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <CardTrackerActionMenu item={row.original} />,
  },
];
