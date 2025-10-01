// components/CardDetailsForm.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { useCardRequestStore } from "@/store/slices/cardRequestStore";
import { DocumentUpload } from "./DocumentUpload";
import {
  cardScheme,
  cardVariant,
  requestChannel,
  requestReason,
  requestType,
  type Options,
} from "@/lib";
import { useBranchesQuery } from "@/api";

export function CardDetailsForm() {
  const { draft, patchCardDetails } = useCardRequestStore();
  const { data } = useBranchesQuery();
  const handleFieldChange = (field: string, value: string) => {
    patchCardDetails({ [field]: value });
  };
  console.log(data, "checking branch");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center uppercase gap-2">
          Card Request Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="scheme">Card Scheme</Label>
            <Select
              value={draft.cardDetails.scheme ?? ""}
              onValueChange={(val) => handleFieldChange("scheme", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preferred Card Scheme" />
              </SelectTrigger>
              <SelectContent>
                {cardScheme?.map((scheme: Options) => (
                  <SelectItem value={scheme.value} key={scheme.id}>
                    {scheme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="variant">Card Variant</Label>
            <Select
              value={draft.cardDetails.variant ?? ""}
              onValueChange={(val) => handleFieldChange("variant", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preferred Card Variant" />
              </SelectTrigger>
              <SelectContent>
                {cardVariant?.map((variant: Options) => (
                  <SelectItem value={variant.value} key={variant.id}>
                    {variant.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              value={draft.cardDetails.nameOnCard ?? ""}
              onChange={(e) => handleFieldChange("nameOnCard", e.target.value)}
              placeholder="Enter name as it should appear on card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestType">Request Type</Label>
            <Select
              value={draft.cardDetails.requestType ?? ""}
              onValueChange={(val) => handleFieldChange("requestType", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                {requestType?.map((type: Options) => (
                  <SelectItem value={type.value} key={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">Pickup Branch</Label>
            <Select
              value={draft.cardDetails.branch ?? ""}
              onValueChange={(val) => handleFieldChange("branch", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select pickup branch" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((branch) => (
                  <SelectItem value={branch.id} key={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="channel">Request Channel</Label>
            <Select
              value={draft.cardDetails.channel ?? ""}
              onValueChange={(val) => handleFieldChange("channel", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select request channel" />
              </SelectTrigger>
              <SelectContent>
                {requestChannel?.map((channel: Options) => (
                  <SelectItem value={channel.value} key={channel.id}>
                    {channel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {draft.cardDetails.variant === "ALERT_POTRAIT" && (
          <div className="my-2 w-full border">
            <DocumentUpload title="Profile Picture" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
