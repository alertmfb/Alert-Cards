import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import GoBackButton from "~/components/shared/GoBackButton";
import { PageHeader } from "~/components/shared/PageHeader";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { CardUnblockPreviewCard } from "./CardUnblockPreview";
import type { CustomerData } from "./CardBlock";
import { CardDetails } from "~/components/custom/CardDetails";

export default function CardUnblock() {
  const [accountNumber, setAccountNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [cardUnblocked, setCardUnblocked] = useState(false);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const customerData: CustomerData = {
    customerName: "Adaobi Nwachukwu",
    accountNumber: "2233445566",
    phoneNumber: "+234 802 123 4567",
    panNumber: "4539 8765 4321 9001",
    cardScheme: "Verve",
    cardVariant: "Alert Classic",
    requesterNT: "ada.nwachukwu@alertmfb.com",
    requesterBranch: "Ikeja",
    pickupBranch: "Lekki",
    approvedDate: "05/04/2025",
    expiryDate: "06/27",
    cardStatus: "Customer Delivered",
    blockStatus: "Blocked",
    cardHolderName: "Adaobi Nwachukwu",
    activationStatus: "Deactivated",
  };
  const handleVerify = () => {
    setTimeout(() => {
      setIsVerified(true);
    }, 1000);
  };

  const handleProceed = () => {
    if (!cardUnblocked) {
      toast.error("Please unblock the card first.");
      return;
    }

    if (!reason) {
      toast.error("Please select a reason for unblocking.");
      return;
    }

    toast.success("Card has been unblocked successfully.");
    // navigate("/dashboard");
  };

  return (
    <div className="space-y-4">
      <GoBackButton />
      <PageHeader
        title="Card Unblock"
        subText="Unblock cards that were previously blocked for valid reasons."
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

      {isVerified && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <CardUnblockPreviewCard
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

function InfoInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <input
        className="w-full h-10 px-3 py-2 border bg-muted rounded-md text-sm font-medium cursor-not-allowed"
        value={value}
        disabled
        readOnly
      />
    </div>
  );
}
