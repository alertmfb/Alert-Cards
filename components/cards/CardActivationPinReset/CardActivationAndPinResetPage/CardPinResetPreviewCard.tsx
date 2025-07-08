// components/CardPinResetPreviewCard.tsx
import { useState } from "react";
import { toast } from "sonner";
import { CardDisplay } from "components/custom/CardDisplay";
import { Card, CardContent } from "components/ui/card";
import { getCardType } from "~/utils";
import { cn } from "~/lib/utils";
import { Button } from "components/ui/button";
import { ResetPinSwitch } from "../components/ResetPinSwitch";
import { useNavigate } from "react-router";

interface CardPinResetPreviewCardProps {
  cardScheme: string;
  panNumber: string;
  cardHolderName: string;
  expiryDate: string;
  className?: string;
}

export function CardPinResetPreviewCard({
  cardScheme,
  panNumber,
  cardHolderName,
  expiryDate,
  className,
}: CardPinResetPreviewCardProps) {
  const [pinResetConfirmed, setPinResetConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!pinResetConfirmed) {
      toast.error("Please confirm PIN reset first.");
      return;
    }

    // TODO: Add API call to reset the PIN here
    toast.success("Card PIN reset successfully!");
    navigate("/");
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

        {/* PIN Reset Controls */}
        <div className="space-y-4">
          {/* Activate PIN Reset Switch */}
          <ResetPinSwitch
            pinReset={pinResetConfirmed}
            onChange={setPinResetConfirmed}
          />

          <div className="text-right">
            <Button onClick={handleProceed} disabled={!pinResetConfirmed}>
              Proceed
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
