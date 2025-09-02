import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ActivationRequest, CardActivationType } from "@/types";
import { formatDateTime, maskPan } from "@/lib";
import { CardActivationActionMenu } from "./ActivationActionMenu";
import StatusWithTooltip from "@/components/common/custom/StatusWithTooltip";

// Custom status component using yellow styling
const YellowStatusBox = ({ label }: { label: string }) => (
  <div className="inline-flex items-center rounded-md border border-orange-500 bg-orange-100 px-2 py-1 text-xs text-orange-500">
    {label}
  </div>
);

export const cardActivationColumns: ColumnDef<ActivationRequest>[] = [
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
    cell: ({ row }) => row.original?.card?.customer?.customerName || "N/A",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => row.original?.card?.customer?.phoneNumber || "N/A",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
    cell: ({ row }) => row.original?.card?.customer?.accountNumber || "N/A",
  },
  // {
  //   accessorKey: "panNumber",
  //   header: "PAN Number",
  //   cell: ({ row }) => {
  //     return maskPan(row.original.panNumber);
  //   },
  // },
  {
    accessorKey: "cardScheme",
    header: "Card Scheme",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original?.createdAt);
      return (
        <div>
          <div>{date}</div>
          <div className="text-xs text-red-600">{time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusWithTooltip status={row.original.card?.status as string} />
    ),
  },
  // {
  //   accessorKey: "expiryDate",
  //   header: "Expiry Date",
  //   cell: ({ row }) => {
  //     const { date, time } = formatDateTime(row.original?.card?.);
  //     return (
  //       <div>
  //         <div>{date}</div>
  //         <div className="text-xs text-red-600">{time}</div>
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <CardActivationActionMenu item={row.original} />,
  },
];
