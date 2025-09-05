// CreateCardRequestPage.tsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/shared/PageHeader";
import { useNavigate } from "react-router";
import { useGetCustomerVerificationMutation } from "@/hooks";
import type { CustomerData } from "../..";
import type { VerifiedCustomerData } from "@/types";

export default function CreateCardRequestPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const { mutate, data, isPending, isSuccess } =
    useGetCustomerVerificationMutation();
  const navigate = useNavigate();

  const handleVerify = (): void => {
    if (!accountNumber.trim()) {
      toast.error("Please enter an account number");
      return;
    }

    mutate({ accountNumber });
  };
  console.log(data, "checking data");
  const customerData: VerifiedCustomerData = {
    name: data?.data?.name as string,
    accountNumber: data?.data?.accountNumber as string,
    phone: data?.data?.phone as string,
    email: data?.data?.email as string,
    accountBalance: data?.data?.accountBalance as string,
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account verified successfully!");
      navigate("/cards/card-requests/new", {
        state: { customerData },
      });
    }
  }, [isSuccess, customerData]);

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
                disabled={isPending}
                className="absolute top-1/2 -translate-y-1/2 right-2 text-xs"
              >
                {isPending ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
