import { PageHeader } from "@/components/common/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router";
import GoBackButton from "@/components/common/shared/GoBackButton";
import { toast } from "sonner";
import { CardDetails } from "@/components/common/custom/CardDetails";
import { CardPreviewCard } from "./CardPreview";
import { useGetCustomerCardMutation } from "@/hooks";

export interface CustomerData {
  customerName: string;
  accountNumber: string;
  phoneNumber: string;
  panNumber: string;
  cardScheme: string;
  cardVariant: string;
  requesterNT: string;
  requesterBranch: string;
  pickupBranch: string;
  approvedDate: string;
  expiryDate: string;
  cardStatus: string;
  blockStatus: string;
  cardHolderName: string;
  activationStatus: string;
}

type BlockReason =
  | "damaged"
  | "lost"
  | "stolen"
  | "trapped"
  | "suspicious"
  | "customer_request";

export default function BlockCard() {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const { getCustomerCard, data, isPending, isSuccess } =
    useGetCustomerCardMutation();
  const [cardBlocked, setCardBlocked] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<BlockReason | "">("");
  const navigate = useNavigate();

  const customerData: CustomerData = {
    customerName: data?.data?.customerName as string,
    accountNumber: data?.data?.accountNumber as string,
    phoneNumber: data?.data?.phoneNumber as string,
    panNumber: data?.data?.pan as string,
    cardScheme: "Afrigo",
    cardVariant: data?.data?.cardVariant as string,
    requesterNT: data?.data?.requesterNt as string,
    requesterBranch: data?.data?.requesterBranch as string,
    pickupBranch: data?.data?.pickupBranch as string,
    approvedDate: data?.data?.approvedDate as string,
    expiryDate: data?.data?.expiryDate as string,
    cardStatus: data?.data?.cardStatus as string,
    blockStatus: "Not Blocked",
    cardHolderName: data?.data?.customerName as string,
    activationStatus: data?.data?.activationStatus as string,
  };

  const handleVerify = (): void => {
    if (!accountNumber.trim()) {
      toast.error("Please enter an account number");
      return;
    }

    getCustomerCard({ accountNumber, type: "BLOCK" });
  };

  const handleProceed = (): void => {
    if (!cardBlocked) {
      toast.error("Please block the card first.");
      return;
    }

    if (!blockReason) {
      toast.error("Please select a reason for blocking.");
      return;
    }

    // TODO: Integrate block card API endpoint here when available
    toast.success(`Card has been blocked successfully. Reason: ${blockReason}`);
    // navigate("/dashboard");
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAccountNumber(e.target.value);
  };

  const handleBlockReasonChange = (value: string): void => {
    setBlockReason(value as BlockReason);
  };

  return (
    <div className="space-y-6">
      <GoBackButton />

      <PageHeader
        title="Block Card"
        subText="Initiate a card block request by verifying customer details, selecting the block reason, and submitting for authorization."
      />

      {/* Account Number Input */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account-number" className="text-sm font-medium">
                Account Number
              </Label>
              <div className="relative">
                <Input
                  id="account-number"
                  placeholder="Enter customer's account number"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  className="pr-28 h-12 text-base"
                />
                <Button
                  size="sm"
                  onClick={handleVerify}
                  disabled={isPending}
                  className="absolute top-1/2 -translate-y-1/2 right-2 text-xs font-medium"
                >
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Result */}
      {isSuccess && data?.data && (
        <div className="">
          {/* Card Display and Customer Info */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <CardPreviewCard
              className="col-span-full lg:col-span-3"
              cardScheme={customerData.cardScheme}
              panNumber={customerData.panNumber}
              cardHolderName={customerData.cardHolderName}
              expiryDate={customerData.expiryDate}
              cardId={data?.data?.cardId as string}
            />
            <CardDetails
              className="col-span-full lg:col-span-2"
              data={customerData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// interface InfoFieldProps {
//   label: string;
//   value: string;
// }

// function InfoField({ label, value }: InfoFieldProps) {
//   return (
//     <div className="space-y-1">
//       <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//         {label}
//       </Label>
//       <div className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">
//         {value || "Not provided"}
//       </div>
//     </div>
//   );
// }
