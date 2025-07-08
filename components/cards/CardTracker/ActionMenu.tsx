import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "components/ui/dropdown-menu";
import { ViewCustomerDetailsDialog } from "components/shared/Table/ViewDetailsDialog";
import type { CardTrackerData } from "~/index";
import { maskPan } from "~/utils";

export const CardTrackerActionMenu = ({ item }: { item: CardTrackerData }) => {
  const [open, setOpen] = useState(false);

  const details = [
    { label: "Account Name", value: item.accountName },
    { label: "Account Number", value: item.accountNumber },
    { label: "PAN Number", value: maskPan(item.panNumber) },
    { label: "Card Scheme", value: item.cardScheme },
    { label: "Card Variant", value: item.cardVariant },
    { label: "Requester NT", value: item.requesterNT },
    { label: "Requester Branch", value: item.requesterBranch },
    { label: "Pick up Branch", value: item.pickupBranch },
    {
      label: "Approved Date",
      value: new Date(item.approvedDate).toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    },
    { label: "Card Status", value: item.cardStatus, isStatus: true },
    { label: "Delivery Status", value: item.deliveryStatus, isStatus: true },
    { label: "Request Channel", value: item.requestChannel },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-md hover:bg-muted">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            👁️ View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewCustomerDetailsDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Card Tracker Details"
        details={details}
      />
    </>
  );
};
