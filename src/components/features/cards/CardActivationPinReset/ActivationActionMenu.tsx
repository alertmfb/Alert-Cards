import { useState } from "react";
import {
  CheckCircle,
  CircleCheckIcon,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import type { CardActivationType } from "@/types";

export const CardActivationActionMenu = ({
  item,
}: {
  item: CardActivationType;
}) => {
  const [dialogType, setDialogType] = useState<
    null | "approve" | "decline" | "reason"
  >(null);
  //   const [declineReason, setDeclineReason] = useState("");
  //   const [declineCategory, setDeclineCategory] = useState("");

  const handleApprove = () => {
    // 🔥 Call APPROVE endpoint here with `item._id`
    toast.success("PIN activation request approved.");
    setDialogType(null);
  };

  const handleDecline = () => {
    // 🔥 Call DECLINE endpoint here with `item._id`, `declineCategory`, `declineReason`
    toast.error("PIN activation request declined.");
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
            <CircleCheckIcon className="w-4 h-4 mr-2 text-green-600" />
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogType("decline")}>
            <XCircle className="w-4 h-4 mr-2 text-red-600" />
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
              Are you sure you want to approve this PIN activation request?
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

      {/* Decline Dialog (With Reason) */}
      <Dialog
        open={dialogType === "decline"}
        onOpenChange={() => setDialogType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to decline this PIN activation request?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            This action cannot be undone. Please confirm if you wish to proceed
            with declining the request.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogType(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDecline}>
              Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
