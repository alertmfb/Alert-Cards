import { useState } from "react";
import { EyeOff, MoreHorizontal } from "lucide-react";
import type { CustomerCardData } from "@/types";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ViewCustomerDetailsDialog } from "@/components/common/shared/Table/ViewDetailsDialog";
import { maskPan } from "@/lib";

export const ActionMenu = ({ item }: { item: CustomerCardData }) => {
  const [open, setOpen] = useState(false);

  const customerDetails = [
    { label: "Customer Name", value: item.customerName },
    { label: "Account Number", value: item.accountNumber },
    { label: "PAN Number", value: maskPan(item.panNumber) },
    { label: "Card Scheme", value: item.cardScheme },
    { label: "Branch", value: item.branch },
    { label: "Card Status", value: item.cardStatus, isStatus: true },
    { label: "Delivery Status", value: item.deliveryStatus, isStatus: true },
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
            <EyeOff /> View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewCustomerDetailsDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Customer Details"
        details={customerDetails}
      />
    </>
  );
};
