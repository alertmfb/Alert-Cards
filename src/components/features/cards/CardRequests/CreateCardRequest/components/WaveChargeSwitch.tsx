import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCardRequestStore } from "@/store/slices/useCardRequestStore";

export function WaiveChargeSwitch() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempReason, setTempReason] = useState("");

  const { setFormData, formData } = useCardRequestStore((state) => ({
    setFormData: state.setFormData,
    formData: state.formData,
  }));

  const waive = formData.waiveCharges ?? false;
  const savedReason = formData.reason ?? "";

  const handleSwitchChange = (checked: boolean) => {
    if (checked && !dialogOpen) {
      setDialogOpen(true);
    } else {
      if (formData.waiveCharges !== false || formData.reason !== "") {
        setFormData({ waiveCharges: false, reason: "" });
        toast("Charge waiver removed.");
      }
    }
  };

  const handleConfirmReason = () => {
    if (!tempReason.trim()) {
      toast.error("Please enter a reason to proceed.");
      return;
    }

    if (
      formData.waiveCharges !== true ||
      formData.reason?.trim() !== tempReason.trim()
    ) {
      setFormData({ waiveCharges: true, reason: tempReason.trim() });
      toast.success("Waiver reason saved successfully.");
    }

    setDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 py-2 px-4 md:px-6">
          <div>
            <h1 className="font-semibold">Waive Charge</h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Check the waive charge box if charges are to be waived and state
              the reason.
            </p>
          </div>
          <Switch checked={waive} onCheckedChange={handleSwitchChange} />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reason for Waiving Charge</DialogTitle>
            <DialogDescription>
              Please provide a brief reason before the charge can be waived.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="waiver-reason">Reason</Label>
            <Input
              id="waiver-reason"
              value={tempReason}
              onChange={(e) => setTempReason(e.target.value)}
              placeholder="Enter reason"
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmReason}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
