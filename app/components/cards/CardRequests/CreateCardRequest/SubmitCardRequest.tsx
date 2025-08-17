import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ArrowLeft, BarChart2, Check, Clock } from "lucide-react";
import { toast } from "sonner";
import { useCardRequestStore } from "~/stores/cardRequestStore";
import { cn } from "~/lib/utils";
import GoBackButton from "~/components/shared/GoBackButton";
import { PageHeader } from "~/components/shared/PageHeader";
import { Separator } from "~/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";

export default function CardRequestSummary() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  // Get data from Zustand store
  const { requests, updateRequestStatus } = useCardRequestStore();

  const cardCost = 2000;

  //   const handleSubmit = async () => {
  //     setIsSubmitting(true);

  //     try {
  //       // Simulate API call
  //       await new Promise((resolve) => setTimeout(resolve, 2000));

  //       // Update all request statuses to pending
  //       requests.forEach((request) => {
  //         updateRequestStatus(request.id, "pending");
  //       });

  //       toast.success(
  //         `${requests.length} card request${
  //           requests.length > 1 ? "s" : ""
  //         } submitted successfully!`
  //       );

  //       // Navigate to success page
  //       navigate("/cards/card-requests/success", {
  //         state: {
  //           requestIds: requests.map((r) => r.id),
  //           count: requests.length,
  //         },
  //       });
  //     } catch (error) {
  //       toast.error("Failed to submit requests. Please try again.");
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // await submitRequestsAPI(requests); // 🔄 replace with real call

      // If you use SWR/React‑Query later, invalidate here:
      // mutate("/api/requests");  // SWR
      // queryClient.invalidateQueries("requests"); // React Query

      toast.success(
        `${requests.length} request${requests.length > 1 ? "s" : ""} submitted`
      );
      setShowDialog(true);
    } catch (err) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!requests.length) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No requests to review</p>
        <Button
          onClick={() => navigate("/cards/card-requests")}
          className="mt-4"
        >
          Back to Requests
        </Button>
      </div>
    );
  }

  const currentRequest = requests[activeTab];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <GoBackButton />
        <PageHeader
          title="Summary"
          subText="View a detailed breakdown of the card request, including customer information, selected card type, and pickup details before submission."
        />
      </div>

      <div className="space-y-8">
        {requests.length > 1 && (
          <div className="border-b overflow-x-auto">
            <nav
              className="flex min-w-full w-max space-x-4 px-4 pt-2 pb-0 -mb-px"
              aria-label="Tabs"
            >
              {requests.map((request, index) => (
                <button
                  key={request.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "whitespace-nowrap uppercase tracking-wide relative pb-2 px-3 border-b-2 text-sm font-medium transition-colors duration-200",
                    activeTab === index
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                  )}
                >
                  Request {index + 1}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Current Request Details */}
        {currentRequest && (
          <Card className="border border-gray-200 bg-white shadow-sm">
            {/* <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-900">
                Account Request Summary
                <Badge
                  variant="outline"
                  className={cn(
                    "px-3 py-1 text-xs font-medium capitalize",
                    currentRequest.status === "draft" &&
                      "border-amber-300 bg-amber-50 text-amber-800"
                  )}
                >
                  {currentRequest.status}
                </Badge>
              </CardTitle>
            </CardHeader> */}

            <CardContent className="space-y-6">
              {/* Account Number Section */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-wide uppercase">
                  Account Number
                </label>
                <div className="rounded-md border bg-muted px-4 py-2 text-lg">
                  {currentRequest.customer.accountNumber}
                </div>
              </div>

              {/* Divider */}
              <Separator />

              {/* Key Details List */}
              <div className="divide-y divide-gray-100">
                {[
                  ["Account Name", currentRequest.customer.accountName],
                  [
                    "Phone Number",
                    currentRequest.customer.phone || "Not provided",
                  ],
                  [
                    "Card Scheme",
                    currentRequest.cardDetails.scheme || "Not specified",
                  ],
                  [
                    "Card Variant",
                    currentRequest.cardDetails.variant || "Not specified",
                  ],
                  [
                    "Name on Card",
                    currentRequest.cardDetails.nameOnCard || "Not specified",
                  ],
                  [
                    "Pickup Branch",
                    currentRequest.cardDetails.branch || "Not specified",
                  ],
                  [
                    "Request Type",
                    currentRequest.cardDetails.requestType || "Not specified",
                  ],
                  [
                    "Reason for Request",
                    currentRequest.cardDetails.reason || "Not specified",
                  ],
                  [
                    "Request Channel",
                    currentRequest.cardDetails.channel || "Not specified",
                  ],
                  ["Card Cost", `₦ ${cardCost.toLocaleString()}`],
                  [
                    "Documents Uploaded",
                    `${currentRequest.documents.length} file${
                      currentRequest.documents.length !== 1 ? "s" : ""
                    }`,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4 py-3"
                  >
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      {label}
                    </span>
                    <span className="text-right text-sm font-medium text-gray-900">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle>REQUEST SUMMARY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {[
                {
                  value: requests.length,
                  label: "Total Requests",
                },
                {
                  value: new Set(requests.map((r) => r.customer.accountNumber))
                    .size,
                  label: "Unique Accounts",
                },
                {
                  value: `₦ ${(requests.length * cardCost).toLocaleString()}`,
                  label: "Total Cost",
                },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center py-4 px-6"
                >
                  <span className="text-3xl font-extrabold tracking-tight text-blue-700">
                    {value}
                  </span>
                  <span className="mt-1 text-sm font-medium uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-8 border-t border-gray-200">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="min-w-40 px-6 py-2 font-semibold"
          >
            {isSubmitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              `Submit Request${requests.length > 1 ? "s" : ""}`
            )}
          </Button>
        </div>

        {/* Success Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-xs px-6 pt-6 pb-4 text-left">
            {/* Icon at top (inline) */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600 animate-pulse" />
            </div>

            {/* Header */}
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-base font-semibold text-gray-900">
                Card Request Submitted Successfully!
              </DialogTitle>
              <DialogDescription className="text-sm">
                The request has been logged and is now pending approval. You can
                track its progress in the Card Tracker table.
              </DialogDescription>
            </DialogHeader>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setShowDialog(false)}
                className="text-sm"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/cards/card-tracker")}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Track Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
