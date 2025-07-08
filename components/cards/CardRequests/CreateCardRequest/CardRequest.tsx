// import { useMemo } from "react";
// import { useLocation, useNavigate } from "react-router";
// import { toast } from "sonner";
// import { ArrowRight, FileQuestion, Plus } from "lucide-react";
// import { RequestCard } from "./components/RequestCard";
// import { CustomerDetails } from "./components/CustomerDetails";
// import { CardDetailsForm } from "./components/CardDetailsForm";
// import { DocumentUpload } from "./components/DocumentUpload";
// import CardAccountDisplay from "./components/CardAccountDisplay";
// import { Button } from "components/ui/button";
// import { useCardRequestStore } from "~/stores/cardRequestStore";

// /* ------------------------------------------------------------------ */
// /* Types                                                              */
// /* ------------------------------------------------------------------ */
// export type Request = {
//   id: string;
//   accountNumber: string;
//   accountName: string;
// };

// const { MAX_REQUESTS } = (() => ({ MAX_REQUESTS: 10 }))();

// export default function CreateCardRequestStep2() {
//   /* ------------------------ Router helpers ----------------------- */
//   const { state } = useLocation() as {
//     state?: { accountNumber?: string; accountName?: string };
//   };
//   const navigate = useNavigate();

//   /* --------------------------- Store ----------------------------- */
//   const {
//     requests,
//     draft,
//     patchDraft,
//     commitDraft,
//     deleteRequest,
//     editRequest,
//   } = useCardRequestStore();

//   /* Pre-seed account number/name coming from Step 1 once */
//   useMemo(() => {
//     if (state?.accountNumber) {
//       patchDraft({
//         customer: {
//           accountNumber: state.accountNumber,
//           accountName: state.accountName ?? "John Doe",
//         },
//       });
//     }
//   }, [state?.accountNumber, state?.accountName, patchDraft]);

//   /* Group requests by account number for card list */
//   const grouped = requests.reduce<Record<string, Request[]>>((acc, cur) => {
//     (acc[cur.customer.accountNumber] ||= []).push();
//     return acc;
//   }, {});

//   /* -------------------------- Handlers --------------------------- */
//   const handleAddAnother = () => {
//     if (requests.length >= MAX_REQUESTS) {
//       toast.error("Limit of 10 requests reached. Please proceed instead.");
//       return;
//     }

//     if (!draft.customer?.accountNumber?.trim()) {
//       toast.error("Missing account number");
//       return;
//     }

//     commitDraft();
//     navigate("/cards/card-requests", { replace: false });
//   };

//   const handleDelete = (id: string) => {
//     deleteRequest(id);
//     toast.success("Request deleted");
//   };

//   const handleEdit = (id: string) => {
//     editRequest(id);
//     navigate("/cards/card-requests", { replace: false });
//   };

//   const handleNext = () => {
//     if (!requests.length) {
//       if (!draft.customer?.accountNumber?.trim()) {
//         toast.error("Missing account number");
//         return;
//       }
//       commitDraft();
//     }

//     navigate("/cards/card-requests/summary", {
//       state: { requests: [...requests] },
//     });
//   };

//   /* --------------------------- Render ---------------------------- */
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
//       {/* ----------- Request list (saved items) ------------- */}
//       {requests.length ? (
//         <div className="space-y-4">
//           {Object.entries(grouped).map(([acctNo, acctRequests]) => (
//             <RequestCard
//               key={acctNo}
//               accountNumber={acctNo}
//               accountName={acctRequests[0].accountName}
//               requests={acctRequests}
//               onDelete={handleDelete}
//               onEdit={handleEdit}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground space-y-4">
//           <FileQuestion className="w-12 h-12" />
//           <p className="font-medium">No card requests yet</p>
//           <p className="text-sm max-w-xs">
//             You’ve verified an account but haven’t started a request. You can
//             create up to 10 requests across different accounts.
//           </p>
//         </div>
//       )}

//       {/* ----------- Current (unsaved) request form ---------- */}
//       <CardAccountDisplay accountNumber={draft.customer?.accountNumber ?? ""} />

//       <CustomerDetails
//         name={draft.customer?.accountName ?? ""}
//         phone="08012345678"
//         account={draft.customer?.accountNumber ?? ""}
//       />
//       <CardDetailsForm />
//       <DocumentUpload />

//       {/* ------------------ Action buttons ------------------ */}
//       <div className="flex justify-end gap-4">
//         <Button onClick={handleAddAnother} variant="outline">
//           <Plus className="mr-2" /> Add Another Card
//         </Button>
//         <Button
//           onClick={handleNext}
//           disabled={
//             requests.length + 1 < 1 || requests.length + 1 > MAX_REQUESTS
//           }
//         >
//           Proceed <ArrowRight className="ml-2" />
//         </Button>
//       </div>
//     </div>
//   );
// }
// -------------------------------------------------------------------------------

// CreateCardRequestStep2.tsx
// import { useMemo } from "react";
// import { useLocation, useNavigate } from "react-router";
// import { toast } from "sonner";
// import { ArrowRight, FileQuestion, Plus } from "lucide-react";
// import { RequestCard } from "./components/RequestCard";
// import { CustomerDetails } from "./components/CustomerDetails";
// import { CardDetailsForm } from "./components/CardDetailsForm";
// import { DocumentUpload } from "./components/DocumentUpload";
// import { Button } from "components/ui/button";
// import { useCardRequestStore } from "~/stores/cardRequestStore";
// import { CardAccountDisplay } from "./components/CardAccountDisplay";

// const MAX_REQUESTS = 10;

// export default function CreateCardRequestStep2() {
//   const { state } = useLocation() as {
//     state?: { accountNumber?: string; accountName?: string };
//   };
//   const navigate = useNavigate();

//   const {
//     requests,
//     draft,
//     patchDraft,
//     commitDraft,
//     deleteRequest,
//     editRequest,
//   } = useCardRequestStore();

//   // Pre-seed account data from Step 1
//   useMemo(() => {
//     if (state?.accountNumber) {
//       patchDraft({
//         customer: {
//           accountNumber: state.accountNumber,
//           accountName: state.accountName ?? "John Doe",
//           phone: "08012345678", // TODO: Get from backend API
//         },
//       });
//     }
//   }, [state?.accountNumber, state?.accountName, patchDraft]);

//   // Group requests by account for better display
//   const groupedRequests = useMemo(() => {
//     return requests.reduce<Record<string, typeof requests>>((acc, request) => {
//       const key = request.customer.accountNumber;
//       if (!acc[key]) acc[key] = [];
//       acc[key].push(request);
//       return acc;
//     }, {});
//   }, [requests]);

//   const handleAddAnother = () => {
//     if (requests.length >= MAX_REQUESTS) {
//       toast.error(
//         `Maximum limit of ${MAX_REQUESTS} requests reached. Please proceed instead.`
//       );
//       return;
//     }

//     // Validate current draft before adding
//     if (!draft.customer?.accountNumber?.trim()) {
//       toast.error("Please enter account number");
//       return;
//     }

//     if (!draft.cardDetails?.scheme) {
//       toast.error("Please select card scheme");
//       return;
//     }

//     if (!draft.cardDetails?.nameOnCard?.trim()) {
//       toast.error("Please enter name on card");
//       return;
//     }

//     // Commit current draft to requests
//     const success = commitDraft();
//     if (success) {
//       toast.success("Card request added successfully!");
//       // TODO: Call backend API to save draft
//       // await saveCardRequestDraft(draft);
//     } else {
//       toast.error("Failed to add request");
//     }
//   };

//   const handleDelete = (id: string) => {
//     deleteRequest(id);
//     toast.success("Request deleted successfully");
//     // TODO: Call backend API to delete request
//     // await deleteCardRequestAPI(id);
//   };

//   const handleEdit = (id: string) => {
//     editRequest(id);
//     toast.info("Request loaded for editing");
//   };

//   const handleProceed = () => {
//     // If there's an uncommitted draft, commit it first
//     if (draft.customer?.accountNumber?.trim() && draft.cardDetails?.scheme) {
//       const success = commitDraft();
//       if (!success) {
//         toast.error("Failed to save current request");
//         return;
//       }
//     }

//     if (requests.length === 0) {
//       toast.error("Please add at least one card request");
//       return;
//     }

//     // TODO: Call backend API to submit all requests
//     // await submitCardRequests(requests);

//     navigate("/cards/card-requests/summary", {
//       state: { requests: [...requests] },
//     });
//   };

//   const canProceed =
//     requests.length > 0 ||
//     (draft.customer?.accountNumber?.trim() && draft.cardDetails?.scheme);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
//       {/* Saved Requests Display */}
//       {requests.length > 0 && (
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold text-foreground">
//             Card Requests ({requests.length}/{MAX_REQUESTS})
//           </h2>
//           {Object.entries(groupedRequests).map(
//             ([accountNumber, accountRequests]) => (
//               <RequestCard
//                 key={accountNumber}
//                 accountNumber={accountNumber}
//                 accountName={accountRequests[0].customer.accountName}
//                 requests={accountRequests}
//                 onDelete={handleDelete}
//                 onEdit={handleEdit}
//               />
//             )
//           )}
//         </div>
//       )}

//       {/* Empty State */}
//       {requests.length === 0 && (
//         <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground space-y-4">
//           <FileQuestion className="w-16 h-16" />
//           <div className="space-y-2">
//             <p className="text-lg font-medium">No card requests yet</p>
//             <p className="text-sm max-w-md">
//               Fill out the form below to create your first card request. You can
//               create up to {MAX_REQUESTS} requests across different accounts.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Current Request Form */}
//       <div className="space-y-6">
//         <h2 className="text-lg font-semibold text-foreground">
//           {requests.length > 0 ? "Add Another Request" : "Create Card Request"}
//         </h2>

//         <CardAccountDisplay
//           accountNumber={draft.customer?.accountNumber ?? ""}
//         />

//         <CustomerDetails
//           name={draft.customer?.accountName ?? ""}
//           phone={draft.customer?.phone ?? "08012345678"}
//           account={draft.customer?.accountNumber ?? ""}
//         />

//         <CardDetailsForm />

//         <DocumentUpload />
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-between items-center pt-6 border-t">
//         <div className="text-sm text-muted-foreground">
//           {requests.length} of {MAX_REQUESTS} requests created
//         </div>

//         <div className="flex gap-3">
//           {requests.length < MAX_REQUESTS && (
//             <Button
//               onClick={handleAddAnother}
//               variant="outline"
//               disabled={!draft.customer?.accountNumber?.trim()}
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Add Another Card
//             </Button>
//           )}

//           <Button
//             onClick={handleProceed}
//             disabled={!canProceed}
//             className="min-w-32"
//           >
//             Proceed <ArrowRight className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// CreateCardRequestStep2.tsx
import { useMemo, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  FileQuestion,
  Plus,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { RequestCard } from "./components/RequestCard";
import { CustomerDetails } from "./components/CustomerDetails";
import { CardDetailsForm } from "./components/CardDetailsForm";
import { DocumentUpload } from "./components/DocumentUpload";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "~/components/ui/label";
import { useCardRequestStore } from "~/stores/cardRequestStore";
import { PageHeader } from "components/shared/PageHeader";
import { Card, CardContent } from "components/ui/card";

const MAX_REQUESTS = 10;

type VerificationStatus = "idle" | "verifying" | "verified" | "error";

export default function CreateCardRequestStep2() {
  const { state } = useLocation() as {
    state?: { accountNumber?: string; accountName?: string };
  };
  const navigate = useNavigate();

  const {
    requests,
    draft,
    patchDraft,
    commitDraft,
    deleteRequest,
    editRequest,
    // clearDraft,
  } = useCardRequestStore();

  const [accountInput, setAccountInput] = useState("");
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("idle");
  const [accountName, setAccountName] = useState("");

  // Debounced account verification
  const verifyAccount = useCallback(
    async (accountNumber: string) => {
      if (!accountNumber.trim() || accountNumber.length < 10) {
        setVerificationStatus("idle");
        return;
      }

      setVerificationStatus("verifying");

      // Simulate API call with realistic delay
      setTimeout(() => {
        // Mock verification logic
        if (accountNumber.length >= 10) {
          const mockName = `Account Holder ${accountNumber.slice(-4)}`;
          setAccountName(mockName);
          setVerificationStatus("verified");

          // Update draft with verified account info
          patchDraft({
            customer: {
              accountNumber: accountNumber.trim(),
              accountName: mockName,
              phone: "08012345678", // TODO: Get from backend API
            },
          });
        } else {
          setVerificationStatus("error");
          setAccountName("");
        }
      }, 800);
    },
    [patchDraft]
  );

  // Debounce effect for account verification
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      verifyAccount(accountInput);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [accountInput, verifyAccount]);

  // Pre-seed account data from Step 1
  useMemo(() => {
    if (state?.accountNumber && !accountInput) {
      setAccountInput(state.accountNumber);
      setAccountName(state.accountName ?? "");
      setVerificationStatus("verified");
      patchDraft({
        customer: {
          accountNumber: state.accountNumber,
          accountName: state.accountName ?? "Account Holder",
          phone: "08012345678",
        },
      });
    }
  }, [state?.accountNumber, state?.accountName, patchDraft, accountInput]);

  // Group requests by account for better display
  const groupedRequests = useMemo(() => {
    return requests.reduce<Record<string, typeof requests>>((acc, request) => {
      const key = request.customer.accountNumber;
      if (!acc[key]) acc[key] = [];
      acc[key].push(request);
      return acc;
    }, {});
  }, [requests]);

  const handleAddAnother = () => {
    if (requests.length >= MAX_REQUESTS) {
      toast.error(
        `Maximum limit of ${MAX_REQUESTS} requests reached. Please proceed instead.`
      );
      return;
    }

    // Validate current draft before adding
    if (verificationStatus !== "verified") {
      toast.error("Please enter and verify a valid account number");
      return;
    }

    if (!draft.cardDetails?.scheme) {
      toast.error("Please select card scheme");
      return;
    }

    if (!draft.cardDetails?.nameOnCard?.trim()) {
      toast.error("Please enter name on card");
      return;
    }

    // Commit current draft to requests
    const success = commitDraft();
    if (success) {
      toast.success("Card request added successfully!");

      // Reset form for new account
      setAccountInput("");
      setAccountName("");
      setVerificationStatus("idle");
      // clearDraft();

      // TODO: Call backend API to save draft
      // await saveCardRequestDraft(draft);
    } else {
      toast.error("Failed to add request");
    }
  };

  const handleDelete = (id: string) => {
    deleteRequest(id);
    toast.success("Request deleted successfully");
    // TODO: Call backend API to delete request
    // await deleteCardRequestAPI(id);
  };

  const handleEdit = (id: string) => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      // Load the request data into the form
      setAccountInput(request.customer.accountNumber);
      setAccountName(request.customer.accountName);
      setVerificationStatus("verified");
      editRequest(id);
      toast.info("Request loaded for editing");
    }
  };

  const handleProceed = () => {
    // If there's an uncommitted draft with valid data, commit it first
    if (
      verificationStatus === "verified" &&
      draft.cardDetails?.scheme &&
      draft.cardDetails?.nameOnCard?.trim()
    ) {
      const success = commitDraft();
      if (!success) {
        toast.error("Failed to save current request");
        return;
      }
    }

    if (requests.length === 0) {
      toast.error("Please add at least one card request");
      return;
    }

    // TODO: Call backend API to submit all requests
    // await submitCardRequests(requests);

    navigate("/cards/card-requests/preview", {
      state: { requests: [...requests] },
    });
  };

  const canAddRequest =
    verificationStatus === "verified" &&
    draft.cardDetails?.scheme &&
    draft.cardDetails?.nameOnCard?.trim();

  const canProceed = requests.length > 0 || canAddRequest;

  const getVerificationIcon = () => {
    switch (verificationStatus) {
      case "verifying":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case "verified":
        return <Check className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getVerificationMessage = () => {
    switch (verificationStatus) {
      case "verifying":
        return "Verifying account...";
      case "verified":
        return `Verified: ${accountName}`;
      case "error":
        return "Account not found or invalid";
      default:
        return "";
    }
  };

  return (
    <>
      <PageHeader
        title="Create New Card Request"
        subText="Initiate a new card request by verifying the customer’s account and providing the required card details."
      />
      <div className="space-y-8">
        {/* Saved Requests Display */}
        {requests.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Card Requests ({requests.length}/{MAX_REQUESTS})
            </h2>
            {Object.entries(groupedRequests).map(
              ([accountNumber, accountRequests]) => (
                <RequestCard
                  key={accountNumber}
                  accountNumber={accountNumber}
                  accountName={accountRequests[0].customer.accountName}
                  requests={accountRequests}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )
            )}
          </div>
        )}

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground space-y-4">
            <FileQuestion className="w-16 h-16" />
            <div className="space-y-2">
              <p className="text-lg font-medium">No card requests yet</p>
              <p className="text-sm max-w-md">
                Enter an account number below to create your first card request.
                You can create up to {MAX_REQUESTS} requests across different
                accounts.
              </p>
            </div>
          </div>
        )}

        {/* Current Request Form */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {requests.length > 0 ? "New Card Request" : "Create Card Request"}
          </h2>

          {/* Account Number Input with Verification */}
          <Card>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="account-input">Account Number</Label>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="account-input"
                      placeholder="Enter customer's account number"
                      value={accountInput}
                      onChange={(e) => setAccountInput(e.target.value)}
                      className={`pr-12 h-12 ${
                        verificationStatus === "verified"
                          ? "border-green-500"
                          : verificationStatus === "error"
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getVerificationIcon()}
                    </div>
                  </div>
                  {verificationStatus !== "idle" && (
                    <p
                      className={`text-sm ${
                        verificationStatus === "verified"
                          ? "text-green-600"
                          : verificationStatus === "error"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {getVerificationMessage()}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details - Only show when account is verified */}
          {verificationStatus === "verified" && (
            <>
              <CustomerDetails
                name={accountName}
                phone={draft.customer?.phone ?? "08012345678"}
                account={accountInput}
              />

              <CardDetailsForm />

              <DocumentUpload />
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            {requests.length} of {MAX_REQUESTS} requests created
          </div>

          <div className="flex gap-3">
            {requests.length < MAX_REQUESTS &&
              verificationStatus === "verified" && (
                <Button
                  onClick={handleAddAnother}
                  variant="outline"
                  disabled={!canAddRequest}
                  className="min-w-40"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Card
                </Button>
              )}

            <Button
              onClick={handleProceed}
              disabled={!canProceed}
              className="min-w-32"
            >
              Proceed <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
