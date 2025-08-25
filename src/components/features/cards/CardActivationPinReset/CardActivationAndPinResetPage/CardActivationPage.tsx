import { PageHeader } from "@/components/common/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import GoBackButton from "@/components/common/shared/GoBackButton";
import type { CustomerData } from "@/components/features/cards/BlockAndUnblockCards/BlockAndUnblockServices/CardBlock";
import { CardActivatePreviewCard } from "./CardActivationPreviewCard";
import { CardDetails } from "@/components/common/custom/CardDetails";
import { useGetCustomerCardMutation } from "@/hooks";

export default function CardActivation() {
  const [accountNumber, setAccountNumber] = useState("");

  const { getCustomerCard, data, isPending, isSuccess } =
    useGetCustomerCardMutation();

  const customerData: CustomerData = {
    customerName: data?.data?.customerName as string,
    accountNumber: data?.data?.accountNumber as string,
    phoneNumber: data?.data?.phoneNumber as string,
    panNumber: "5432 9087 5678 8100",
    cardScheme: "Afrigo",
    cardVariant: data?.data?.cardVariant as string,
    requesterNT: data?.data?.requesterNt as string,
    requesterBranch: data?.data?.requesterBranch as string,
    pickupBranch: data?.data?.pickupBranch as string,
    approvedDate: data?.data?.approvedDate as string,
    expiryDate: data?.data?.expiryDate as string,
    cardStatus: data?.data?.cardStatus as string,
    blockStatus: "Not Blocked",
    cardHolderName: "Victor Balogun",
    activationStatus: data?.data?.activationStatus as string,
  };

  console.log(data, "testttttttttinggggg");
  const handleVerify = () => {
    if (accountNumber === "") return;

    getCustomerCard({ accountNumber, type: "ACTIVATION" });
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
              disabled={isPending}
              className="absolute top-1/2 -translate-y-1/2 right-2 text-xs"
            >
              Verify
            </Button>
          </div>
        </div>
      </div>

      {/* Verification Result */}
      {isSuccess && data?.data && (
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
