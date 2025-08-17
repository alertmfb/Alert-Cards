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
import { Unlock } from "lucide-react";

export function UnblockCardSwitch({
  unblocked,
  onChange,
}: {
  unblocked: boolean;
  onChange: (value: boolean) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      setDialogOpen(true);
    } else {
      onChange(false);
      toast("Card unblock cancelled.");
    }
  };

  const handleConfirm = () => {
    onChange(true);
    toast.success("Card unblock confirmed.");
    setDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 py-2 px-4 md:px-6">
          <div>
            <h1 className="font-semibold ">Unblock Card</h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Toggle this switch to confirm you want to unblock this card.
            </p>
          </div>
          <Switch checked={unblocked} onCheckedChange={handleSwitchChange} />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <Unlock className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center">
              Are you sure you want to unblock this card?{" "}
            </DialogTitle>
            <DialogDescription>
              An unblock request will be submitted for approval. The card will
              remain inactive until the request is approved.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Yes, Unblock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
