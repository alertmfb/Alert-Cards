import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export function BlockCardSwitch({
  blocked,
  onChange,
}: {
  blocked: boolean;
  onChange: (value: boolean) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      setDialogOpen(true);
    } else {
      onChange(false);
      toast("Card block action cancelled.");
    }
  };

  const handleConfirm = () => {
    onChange(true);
    toast.success("Card has been marked for block.");
    setDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <h1 className="">Block Card</h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Toggle this switch to confirm you want to block this card.
            </p>
          </div>
          <Switch
            checked={blocked}
            onCheckedChange={handleSwitchChange}
            className="data-[state=checked]:bg-red-600"
          />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-red-600 text-center">
              Confirm Card Block
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to block this card? This action is
              irreversible from this interface.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleConfirm}
            >
              Confirm Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
