// components/CardRequestActionMenu.tsx
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "components/ui/select";
import type { CardRequestData } from "~/index";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export const CardRequestActionMenu = ({ item }: { item: CardRequestData }) => {
  const [dialogType, setDialogType] = useState<
    null | "approve" | "reject" | "reason"
  >(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionCategory, setRejectionCategory] = useState("");

  const handleApprove = () => {
    toast.success("Card request approved.");
    setDialogType(null);
  };

  const handleReject = () => {
    setDialogType("reason");
  };

  const handleSubmitRejection = () => {
    toast.error("Card request rejected.");
    setDialogType(null);
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
          <DropdownMenuItem onClick={() => setDialogType("approve")}>
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogType("reject")}>
            Decline
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Approve Dialog */}
      <Dialog
        open={dialogType === "approve"}
        onOpenChange={() => setDialogType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to approve this request?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            This action cannot be undone. Please confirm if you wish to proceed
            with approving the request.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogType(null)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decline Confirmation Dialog */}
      <Dialog
        open={dialogType === "reject"}
        onOpenChange={() => setDialogType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to reject this request?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            This action cannot be undone. Please confirm if you wish to proceed
            with rejecting the request.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogType(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Reason Dialog */}
      <Dialog
        open={dialogType === "reason"}
        onOpenChange={() => setDialogType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Reason for Rejection
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 pt-2">
            {/* <div className="grid gap-1.5">
              <Label htmlFor="reason-select">Reason</Label>
              <Select onValueChange={(val) => setRejectionCategory(val)}>
                <SelectTrigger id="reason-select" className="w-full">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incomplete-info">
                    Incomplete Information
                  </SelectItem>
                  <SelectItem value="not-eligible">Not Eligible</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div className="grid gap-1.5">
              <Label htmlFor="additional-context">Additional Context</Label>
              <Textarea
                id="additional-context"
                placeholder="Provide more context (optional)"
                value={rejectionReason}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setRejectionReason(e.target.value)
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogType(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSubmitRejection}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
