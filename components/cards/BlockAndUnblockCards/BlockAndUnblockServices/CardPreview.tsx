// components/CardPreviewCard.tsx
import { CardDisplay } from "components/custom/CardDisplay";
import { Card, CardHeader, CardTitle, CardContent } from "components/ui/card";
import { cn } from "~/lib/utils";
import { getCardType } from "~/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Button } from "components/ui/button";
import { BlockCardSwitch } from "../component/BlockCardSwitch";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface CardPreviewCardProps {
  cardScheme: string;
  panNumber: string;
  cardHolderName: string;
  expiryDate: string;
  className?: string;
}

type BlockReason =
  | "damaged"
  | "lost"
  | "stolen"
  | "trapped"
  | "suspicious"
  | "customer_request";

export function CardPreviewCard({
  cardScheme,
  panNumber,
  cardHolderName,
  expiryDate,
  className,
}: CardPreviewCardProps) {
  const navigate = useNavigate();
  const [cardBlocked, setCardBlocked] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<BlockReason | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleBlockReasonChange = (value: string): void => {
    setBlockReason(value as BlockReason);
  };

  const handleProceed = async (): Promise<void> => {
    if (!cardBlocked) {
      toast.error("Please block the card first.");
      return;
    }

    if (!blockReason) {
      toast.error("Please select a reason for blocking.");
      return;
    }

    try {
      setIsSubmitting(true);

      // TODO: Call API to block the card here

      toast.success(
        `Card has been blocked successfully. Reason: ${blockReason}`
      );

      // Optional slight delay for better UX
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Failed to block the card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className={cn("", className)}>
      <CardContent className="space-y-8 py-8">
        {/* Card UI Display */}
        <CardDisplay
          cardType={getCardType(cardScheme)}
          panNumber={panNumber}
          cardHolderName={cardHolderName}
          expiryDate={expiryDate}
          bankName="Alert MFB"
          //   className="w-full h-72 sm:h-80 md:h-96"
        />

        {/* Block Card Controls */}
        <div className="space-y-4">
          <div className="space-y-4">
            {/* Block Card Switch */}
            <BlockCardSwitch blocked={cardBlocked} onChange={setCardBlocked} />

            {/* Reason Selector */}
            {cardBlocked && (
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Reason for Blocking
                </Label>
                <Select
                  onValueChange={handleBlockReasonChange}
                  value={blockReason}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select reason for blocking" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="damaged">Card Damaged</SelectItem>
                    <SelectItem value="lost">Card Lost</SelectItem>
                    <SelectItem value="stolen">Card Stolen</SelectItem>
                    <SelectItem value="trapped">Trapped in ATM</SelectItem>
                    <SelectItem value="suspicious">
                      Suspicious Activity
                    </SelectItem>
                    <SelectItem value="customer_request">
                      Customer Request
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleProceed}
              disabled={!cardBlocked || !blockReason || isSubmitting}
              variant="destructive"
            >
              {isSubmitting ? "Processing..." : "Block Card"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
