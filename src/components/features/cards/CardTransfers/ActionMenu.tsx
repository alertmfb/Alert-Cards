import { useState } from "react";
import { MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type CardActionProps = {
  onApprove: () => void;
  onDecline: () => void;
};

export const CardTransferActions = ({
  onApprove,
  onDecline,
}: CardActionProps) => {
  const [dialogType, setDialogType] = useState<"approve" | "decline" | null>(
    null
  );

  const handleAction = async (action: "approve" | "decline") => {
    // 🔧 Simulate backend API call here
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (action === "approve") {
      onApprove(); // 👉 Replace this with actual approve logic
      toast.success("Card transfer approved successfully");
    } else {
      onDecline(); // 👉 Replace this with actual decline logic
      toast.error("Card transfer declined");
    }

    setDialogType(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialogType("approve")}>
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogType("decline")}>
            <XCircle className="mr-2 h-4 w-4 text-red-600" />
            Decline
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={dialogType !== null}
        onOpenChange={() => setDialogType(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "approve"
                ? "Are you sure you want to approve the transfer of this card to Yaba branch?"
                : "Are you sure you want to decline the transfer of this card to Yaba branch?"}
            </DialogTitle>
          </DialogHeader>
          <div>
            This action cannot be undone. Please confirm if you wish to proceed
            with {dialogType === "approve" ? "approving" : "declining"} the
            request.
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogType(null)}>
              Cancel
            </Button>
            <Button
              variant={dialogType === "approve" ? "default" : "destructive"}
              onClick={() => handleAction(dialogType!)}
            >
              {dialogType === "approve" ? "Approve" : "Decline"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
