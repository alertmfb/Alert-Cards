// CreateCardRequestPage.tsx
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { PageHeader } from "~/components/shared/PageHeader";
import { useNavigate } from "react-router";

export default function CreateCardRequestPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!accountNumber.trim()) {
      toast.error("Please enter a valid account number");
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      toast.success("Account verified successfully!");
      navigate("/cards/card-requests/new", {
        state: { accountNumber },
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create new Card Request"
        subText="Initiate a new card request by verifying the customer’s account and providing the required card details."
      />

      <Card className="w-full">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-number">Account Number</Label>
            <div className="relative">
              <Input
                id="account-number"
                placeholder="Enter customer's account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="pr-32 h-12 bg-muted"
              />
              <Button
                size="sm"
                onClick={handleVerify}
                disabled={isVerifying}
                className="absolute top-1/2 -translate-y-1/2 right-2 text-xs"
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
