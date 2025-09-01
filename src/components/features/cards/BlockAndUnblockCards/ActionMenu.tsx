// components/BlockCardActionMenu.tsx
import { useState } from "react";
import { Ban, CircleCheckIcon, EyeIcon, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CardblockData } from "@/types";
import { maskPan } from "@/lib";
import { ViewCustomerDetailsDialog } from "@/components/common/shared/Table/ViewDetailsDialog";

const getDetailsForView = (record: CardblockData) => [
  { label: "Customer Name", value: record?.card?.customer?.customerName },
  { label: "Account Number", value: record?.card?.customer?.accountNumber },
  { label: "PAN Number", value: maskPan(record?.card?.cardRequest?.pan) },
  { label: "Card Scheme", value: record?.card?.cardRequest?.scheme },
  { label: "Card Variant", value: record?.card?.cardRequest?.variant },
  { label: "Expiry Date", value: record?.card?.expiryDate },
  { label: "Date Entered", value: record?.createdAt },
  { label: "Reason", value: record.reason },
];
export const BlockCardActionMenu = ({ record }: { record: CardblockData }) => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleBlock = () => {
    // Add your API call logic here
    toast.error(`Card blocked: ${record?.card?.customer?.customerName}`);
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-md hover:bg-muted">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            <EyeIcon /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Ban className="text-red-500" />
            Block
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Card</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 pt-2">
            <div className="grid gap-1.5">
              <Label htmlFor="reason-select">Reason</Label>
              <Select onValueChange={(val) => setReason(val)}>
                <SelectTrigger id="reason-select" className="w-full">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fraud">Suspected Fraud</SelectItem>
                  <SelectItem value="lost">Card Lost</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="additional-info">Additional Context</Label>
              <Textarea
                id="additional-info"
                placeholder="Optional additional info"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBlock}
              disabled={!reason}
            >
              Confirm Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ViewCustomerDetailsDialog
        title="Card Details"
        details={getDetailsForView(record)}
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      />
    </>
  );
};

export const UnblockCardActionMenu = ({
  record,
}: {
  record: CardblockData;
}) => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const handleUnblock = () => {
    // Add your API call logic here
    toast.success(`Card unblocked: ${record?.card?.customer?.customerName}`);
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-md hover:bg-muted">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            <EyeIcon /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <CircleCheckIcon className="text-green-500" />
            Unblock
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unblock Card</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Are you sure you want to unblock the card for{" "}
            <strong>{record?.card?.customer?.customerName}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUnblock}>Confirm Unblock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ViewCustomerDetailsDialog
        title="Card Details"
        details={getDetailsForView(record)}
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      />
    </>
  );
};
