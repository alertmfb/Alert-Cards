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
import { CircleCheck } from "lucide-react";
import { useActivateCard } from "@/hooks";

export function ActivateCardSwitch({
  cardId,
  activated,
  onChange,
}: {
  cardId: string;
  activated: boolean;
  onChange: (value: boolean) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate, data, isPending, isSuccess } = useActivateCard();
  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      setDialogOpen(true);
    } else {
      onChange(false);
      toast("Card activation cancelled.");
    }
  };

  const handleConfirm = () => {
    onChange(true);
    mutate({ cardId });
    // toast.success("Card activation confirmed.");
    // setDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 py-2 px-4 md:px-6">
          <div>
            <h1 className="font-semibold">Activate Card</h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Toggle this switch to confirm you want to activate this card.
            </p>
          </div>
          <Switch checked={activated} onCheckedChange={handleSwitchChange} />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center -mt-10">
            <div className="bg-green-100 text-green-600 rounded-full p-3 shadow-sm">
              <CircleCheck className="w-6 h-6" />
            </div>
          </div>
          <DialogHeader className="text-center">
            <DialogTitle>Confirm Card Activation</DialogTitle>
            <DialogDescription>
              Are you sure you want to activate this card?
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
