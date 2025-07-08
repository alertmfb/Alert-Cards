import { useState } from "react";
import { toast } from "sonner";
import { CardDisplay } from "components/custom/CardDisplay";
import { Card, CardContent } from "components/ui/card";
import { getCardType } from "~/utils";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Button } from "components/ui/button";

import { Label } from "~/components/ui/label";
import { UnblockCardSwitch } from "../component/UnblockCardSwitch";
import { useNavigate } from "react-router";

interface CardUnblockPreviewCardProps {
  cardScheme: string;
  panNumber: string;
  cardHolderName: string;
  expiryDate: string;
  className?: string;
}

export function CardUnblockPreviewCard({
  cardScheme,
  panNumber,
  cardHolderName,
  expiryDate,
  className,
}: CardUnblockPreviewCardProps) {
  const navigate = useNavigate();
  const [cardUnblocked, setCardUnblocked] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProceed = async (): Promise<void> => {
    if (!cardUnblocked) {
      toast.error("Please toggle the unblock switch first.");
      return;
    }

    if (!reason) {
      toast.error("Please select a reason for unblocking.");
      return;
    }

    try {
      setIsSubmitting(true);

      // TODO: Integrate unblock card API here

      toast.success(`Card unblocked successfully. Reason: ${reason}`);

      // Optional slight delay for user to read the toast
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Failed to unblock the card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="space-y-8 py-8">
        {/* Card UI */}
        <CardDisplay
          cardType={getCardType(cardScheme)}
          panNumber={panNumber}
          cardHolderName={cardHolderName}
          expiryDate={expiryDate}
          bankName="Alert MFB"
        />

        {/* Unblock Controls */}
        <div className="space-y-4">
          {/* Unblock Switch */}
          <UnblockCardSwitch
            unblocked={cardUnblocked}
            onChange={setCardUnblocked}
          />

          {/* Reason Select */}
          {cardUnblocked && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Reason for Unblocking
              </Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Card Recovered">Card Recovered</SelectItem>
                  <SelectItem value="False Alert">False Alert</SelectItem>
                  <SelectItem value="Issue Resolved">Issue Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleProceed}
              disabled={!cardUnblocked || !reason || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Proceed"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
