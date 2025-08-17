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
  activationStatus: "Activated" | "Deactivated" | "Pending";
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
  const [cardBlocked, setCardBlocked] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<BlockReason | "">("");
  const navigate = useNavigate();

  // Mock customer data - in real app, this would come from API
  const customerData: CustomerData = {
    customerName: "Emeka Chukwu",
    accountNumber: "1122334455",
    phoneNumber: "+234 913 943 4923",
    panNumber: "5432 1234 5678 8100",
    cardScheme: "Mastercard",
    cardVariant: "Alert Gold",
    requesterNT: "victorbalogun@gmail.com",
    requesterBranch: "VI",
    pickupBranch: "Yaba",
    approvedDate: "11/09/2025",
    expiryDate: "10/30",
    cardStatus: "Active",
    blockStatus: "Not Blocked",
    cardHolderName: "Victor Balogun",
    activationStatus: "Activated",
  };

  const handleVerify = (): void => {
    if (!accountNumber.trim()) {
      toast.error("Please enter an account number");
      return;
    }

    // Simulate verification with loading
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          setIsVerified(true);
          resolve();
        }, 1000);
      }),
      {
        loading: "Verifying account...",
        success: "Account verified successfully",
        error: "Failed to verify account",
      }
    );
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
                  disabled={!accountNumber.trim()}
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
      {isVerified && (
        <div className="">
          {/* Card Display and Customer Info */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <CardPreviewCard
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
