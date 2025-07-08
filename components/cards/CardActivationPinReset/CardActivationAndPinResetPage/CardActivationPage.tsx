import { PageHeader } from "components/shared/PageHeader";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import GoBackButton from "components/shared/GoBackButton";
import type { CustomerData } from "components/cards/BlockAndUnblockCards/BlockAndUnblockServices/CardBlock";
import { CardActivatePreviewCard } from "./CardActivationPreviewCard";
import { CardDetails } from "components/custom/CardDetails";

export default function CardActivation() {
  const [accountNumber, setAccountNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const customerData: CustomerData = {
    customerName: "Victor Balogun",
    accountNumber: "1122334455",
    phoneNumber: "+234 913 943 4923",
    panNumber: "5432 9087 5678 8100",
    cardScheme: "Afrigo",
    cardVariant: "Alert Gold",
    requesterNT: "victorbalogun@gmail.com",
    requesterBranch: "VI",
    pickupBranch: "Yaba",
    approvedDate: "11/09/2025",
    expiryDate: "11/2030",
    cardStatus: "Delivered",
    blockStatus: "Not Blocked",
    cardHolderName: "Victor Balogun",
    activationStatus: "Pending",
  };

  const handleVerify = () => {
    // Simulate verification
    setTimeout(() => {
      setIsVerified(true);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <GoBackButton />

      <PageHeader
        title="Card Activation"
        subText="Activate newly issued or replaced debit cards to enable transactions."
      />

      {/* Account Number Input */}
      <div className="w-full border rounded-xl p-6 shadow-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="account-number">Account Number</Label>
          <div className="relative">
            <Input
              id="account-number"
              placeholder="Enter customer's account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="pr-28 h-12"
            />
            <Button
              size="sm"
              onClick={handleVerify}
              disabled={!accountNumber}
              className="absolute top-1/2 -translate-y-1/2 right-2 text-xs"
            >
              Verify
            </Button>
          </div>
        </div>
      </div>

      {/* Verification Result */}
      {isVerified && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <CardActivatePreviewCard
            className="col-span-full lg:col-span-3"
            cardScheme={customerData.cardScheme}
            panNumber={customerData.panNumber}
            cardHolderName={customerData.cardHolderName}
            expiryDate={customerData.expiryDate}
          />
          <CardDetails
            className="col-span-full lg:col-span-2"
            data={customerData}
          />
        </div>
      )}
    </div>
  );
}
