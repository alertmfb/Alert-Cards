import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { branchOptions } from "@/lib/data";
import { cn } from "@/lib";
import type { CustomerData } from "@/components/features";

/* ---------- Types ---------- */
// export interface CardDetailsData {
//   customerName: string;
//   accountNumber: string;
//   phoneNumber: string;
//   pickupBranch: string; // branch ID that matches branchOptions
//   approvedDate: string;
//   cardStatus: string; // e.g. "Delivered", "Pending"
//   activationStatus: "Activated" | "Deactivated" | "Pending";
//   requesterNT: string;
//   requesterBranch: string;
// }

/* ---------- Helpers ---------- */
function getStatusBadgeStyle(status: string, type: "activation" | "card") {
  if (type === "activation") {
    return status === "ACTIVATED"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  }
  // card status colours (extend as needed)
  return status.toLowerCase().includes("delivered")
    ? "bg-green-100 text-green-700"
    : "bg-amber-100 text-amber-700";
}

/* ---------- Reusable Component ---------- */
export function CardDetails({
  data,
  className,
}: {
  data: CustomerData;
  className?: string;
}) {
  const {
    customerName,
    accountNumber,
    phoneNumber,
    pickupBranch,
    approvedDate,
    cardStatus,
    activationStatus,
    requesterNT,
    requesterBranch,
  } = data;

  /* Get branch label from constant file */
  const pickupBranchLabel =
    branchOptions.find((b) => b.value === pickupBranch)?.label ?? pickupBranch;

  const infoRows: Array<[string, React.ReactNode]> = [
    ["Customer Name", customerName],
    ["Account Number", accountNumber],
    ["Phone Number", phoneNumber],
    ["Pickup Branch", pickupBranchLabel],
    ["Approved Date", approvedDate],
    [
      "Card Status",
      <Badge
        key="card-status"
        className={cn(
          "px-2 py-0.5 text-xs font-medium rounded-sm",
          getStatusBadgeStyle(cardStatus, "card")
        )}
      >
        {cardStatus}
      </Badge>,
    ],
    [
      "Activation Status",
      <Badge
        key="act-status"
        className={cn(
          "px-2 py-0.5 text-xs font-medium rounded-sm",
          getStatusBadgeStyle(activationStatus, "activation")
        )}
      >
        {activationStatus}
      </Badge>,
    ],
    ["Requester NT", requesterNT],
    ["Requester Branch", requesterBranch],
  ];

  /* Avatar initials */
  const initials = customerName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-sm font-semibold text-gray-900">
          Card Details
        </CardTitle>

        <div className="mt-4 flex flex-col items-center gap-2">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm font-semibold text-gray-900">
            {customerName}
          </div>
          <div className="text-xs tracking-wider">{accountNumber}</div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 pb-6 px-6 divide-y divide-gray-100">
        {infoRows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between py-2">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {label}
            </span>
            <span className="text-right text-sm text-gray-900">{value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
