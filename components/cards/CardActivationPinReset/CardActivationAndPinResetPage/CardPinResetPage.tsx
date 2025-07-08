import GoBackButton from "components/shared/GoBackButton";
import { PageHeader } from "components/shared/PageHeader";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { CardPinResetPreviewCard } from "./CardPinResetPreviewCard";
import { CardDetails } from "components/custom/CardDetails";
import type { CustomerData } from "components/cards/BlockAndUnblockCards/BlockAndUnblockServices/CardBlock";

const CardPinResetPage = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const customerData: CustomerData = {
    customerName: "Fatima Bello",
    accountNumber: "5566778899",
    phoneNumber: "+234 901 876 5432",
    panNumber: "4895 6543 3210 1111",
    cardScheme: "Visa",
    cardVariant: "Alert Basic",
    requesterNT: "fatima.bello@alertmfb.com",
    requesterBranch: "Surulere",
    pickupBranch: "Yaba",
    approvedDate: "08/01/2025",
    expiryDate: "11/31",
    cardStatus: "Pending",
    blockStatus: "Not Blocked",
    cardHolderName: "Fatima Bello",
    activationStatus: "Deactivated",
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
        title="Card PIN Reset"
        subText="Reset a customer's card PIN securely after verification."
      />

      {/* Account Number Input */}
      <div className="w-full bg-muted border rounded-xl p-6 shadow-sm space-y-4">
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
          <CardPinResetPreviewCard
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
};

export default CardPinResetPage;
