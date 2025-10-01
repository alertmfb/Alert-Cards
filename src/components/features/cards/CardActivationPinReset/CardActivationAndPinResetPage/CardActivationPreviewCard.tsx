// components/CardActivatePreviewCard.tsx
import { useState } from "react";
import { toast } from "sonner";
import { CardDisplay } from "@/components/common/custom/CardDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { getCardType } from "@/lib";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";
import { ActivateCardSwitch } from "../components/ActivateCardSwitch";
import { useNavigate } from "react-router";

interface CardActivatePreviewCardProps {
  cardScheme: string;
  cardId: string;
  panNumber: string;
  cardHolderName: string;
  expiryDate: string;
  className?: string;
}

export function CardActivatePreviewCard({
  cardScheme,
  cardId,
  panNumber,
  cardHolderName,
  expiryDate,
  className,
}: CardActivatePreviewCardProps) {
  const [cardActivated, setCardActivated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleProceed = async (): Promise<void> => {
    if (!cardActivated) {
      toast.error("Please activate the card first.");
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Card has been activated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Failed to activate the card. Please try again.");
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
        />

        {/* Activate Card Controls */}
        <div className="space-y-4">
          {/* Activate Card Switch */}
          <ActivateCardSwitch
            cardId={cardId}
            activated={cardActivated}
            onChange={setCardActivated}
          />

          {/* Proceed Button */}
          <div className="flex justify-end">
            <Button onClick={handleProceed} disabled={!cardActivated}>
              Proceed
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
