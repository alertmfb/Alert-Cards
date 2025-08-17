import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { RefreshCcw } from "lucide-react";

export function ResetPinSwitch({
  pinReset,
  onChange,
}: {
  pinReset: boolean;
  onChange: (value: boolean) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      setDialogOpen(true);
    } else {
      onChange(false);
      toast("PIN reset cancelled.");
    }
  };

  const handleConfirm = () => {
    onChange(true);
    toast.success("PIN reset confirmed.");
    setDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 py-2 px-4 md:px-6">
          <div>
            <h1 className="font-semibold">Reset PIN</h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Toggle this switch to confirm you want to reset the customer's
              PIN.
            </p>
          </div>
          <Switch checked={pinReset} onCheckedChange={handleSwitchChange} />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center -mt-10">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 shadow-sm">
              <RefreshCcw className="w-6 h-6" />
            </div>
          </div>
          <DialogHeader className="text-center">
            <DialogTitle>Confirm PIN Reset</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset the customer's PIN? They will need
              to change it on their next login or card usage.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
