// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
// import { Button } from "components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "components/ui/separator";
// import { PageHeader } from "components/shared/PageHeader";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "components/ui/collapsible";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   ArrowLeft,
//   CreditCard,
//   User,
//   ChevronDown,
//   CheckCircle,
//   Clock,
//   ShieldOff,
//   AlertTriangle,
//   XCircle,
//   Zap,
//   Wallet,
//   DollarSign,
//   ArrowRight,
// } from "lucide-react";
// import { toast } from "sonner";
// import { cn } from "@/lib";;
// import type { CardRequest } from "@/store/slices/cardRequestStore";
// import GoBackButton from "components/shared/GoBackButton";

// // TODO: Replace with actual API endpoint when backend is ready
// // GET /api/cards/{accountNumber} - Fetch existing cards for account
// // POST /api/cards/{cardId}/block - Block a card with reason
// // POST /api/cards/{cardId}/unblock - Unblock a card
// // POST /api/cards/{cardId}/replace - Request card replacement
// // GET /api/accounts/{accountNumber} - Fetch account details including balance

// interface ExistingCard {
//   id: number;
//   number: string;
//   type: string;
//   status: 'Active' | 'Blocked' | 'Damaged' | 'Lost' | 'Stolen' | 'Trapped in ATM';
//   scheme: string;
//   expiryDate: string;
// }

// interface AccountData {
//   accountNumber: string;
//   accountName: string;
//   accountBalance: number;
//   cardCost: number;
// }
// // Mock existing cards data
// const existingCards = [
//   {
//     id: 1,
//     number: "5161 **** **** 1212",
//     type: "Master Card",
//     status: "Active",
//     scheme: "mastercard",
//     expiryDate: "12/26",
//   },
//   {
//     id: 2,
//     number: "4444 **** **** 2211",
//     type: "Visa",
//     status: "Blocked",
//     scheme: "visa",
//     expiryDate: "08/25",
//   },
//   {
//     id: 3,
//     number: "4263 **** **** 1234",
//     type: "Visa",
//     status: "Damaged",
//     scheme: "visa",
//     expiryDate: "03/27",
//   },
//   {
//     id: 4,
//     number: "5060 **** **** 5678",
//     type: "Verve",
//     status: "Lost",
//     scheme: "verve",
//     expiryDate: "11/25",
//   },
// ];

// const cardStatusConfig = {
//   Active: {
//     color: "bg-green-100 text-green-800 border-green-200",
//     icon: CheckCircle,
//     actions: ["block"],
//   },
//   Blocked: {
//     color: "bg-red-100 text-red-800 border-red-200",
//     icon: ShieldOff,
//     actions: ["unblock"],
//   },
//   Damaged: {
//     color: "bg-orange-100 text-orange-800 border-orange-200",
//     icon: AlertTriangle,
//     actions: ["replace"],
//   },
//   Lost: {
//     color: "bg-purple-100 text-purple-800 border-purple-200",
//     icon: XCircle,
//     actions: ["replace"],
//   },
//   Stolen: {
//     color: "bg-red-100 text-red-800 border-red-200",
//     icon: XCircle,
//     actions: ["replace"],
//   },
//   "Trapped in ATM": {
//     color: "bg-yellow-100 text-yellow-800 border-yellow-200",
//     icon: Zap,
//     actions: ["replace"],
//   },
// };

// export default function CardRequestPreview() {
//   const { state } = useLocation() as { state?: { requests: CardRequest[] } };
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isCardsOpen, setIsCardsOpen] = useState(false);
//   const [selectedCardAction, setSelectedCardAction] = useState<{
//     cardId: number;
//     action: string;
//   } | null>(null);

//   const requests = state?.requests || [];

//   // Mock account data - in real app, this would come from API
//   const accountData = {
//     accountNumber: "0123456789",
//     accountName: "John Doe",
//     accountBalance: 150000,
//     cardCost: 2000,
//   };

//   // const handleSubmit = async () => {
//   //   setIsSubmitting(true);

//   //   try {
//   //     // TODO: Call backend API to submit all requests
//   //     await new Promise((resolve) => setTimeout(resolve, 2000));

//   //     toast.success(
//   //       `${requests.length} card request${
//   //         requests.length > 1 ? "s" : ""
//   //       } submitted successfully!`
//   //     );
//   //     navigate("/cards/card-requests/success", {
//   //       state: {
//   //         requestIds: requests.map((r) => r.id),
//   //         count: requests.length,
//   //       },
//   //     });
//   //   } catch (error) {
//   //     toast.error("Failed to submit requests. Please try again.");
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleBack = () => {
//     navigate("/cards/card-requests/new", {
//       state: { requests },
//     });
//   };

//   const handleProceed = () => {
//     navigate("/cards/card-requests/cards-request-submit", {
//       state: { requests },
//     });
//   };

//   const handleCardAction = async (cardId: number, action: string) => {
//     try {
//       // TODO: Call backend API
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const actionMessages = {
//         block: "Card has been blocked successfully",
//         unblock: "Card has been unblocked successfully",
//         replace: "Card replacement request submitted successfully",
//       };

//       toast.success(actionMessages[action as keyof typeof actionMessages]);
//       setSelectedCardAction(null);
//     } catch (error) {
//       toast.error(`Failed to ${action} card. Please try again.`);
//     }
//   };

//   const getActionButton = (card: any) => {
//     const config =
//       cardStatusConfig[card.status as keyof typeof cardStatusConfig];
//     const actions = config?.actions || [];

//     if (actions.length === 0) return null;

//     const action = actions[0];
//     const buttonText =
//       action === "block"
//         ? "Block Card"
//         : action === "unblock"
//         ? "Unblock Card"
//         : "Replace Card";

//     const variant = action === "block" ? "destructive" : "default";

//     return (
//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button
//             variant={variant}
//             size="sm"
//             onClick={() => setSelectedCardAction({ cardId: card.id, action })}
//           >
//             {buttonText}
//           </Button>
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>{buttonText}?</AlertDialogTitle>
//             <AlertDialogDescription>
//               {action === "block" &&
//                 "This will block the card and prevent all transactions."}
//               {action === "unblock" &&
//                 "This will unblock the card and allow transactions."}
//               {action === "replace" &&
//                 "This will request a replacement card for the damaged/lost card."}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => setSelectedCardAction(null)}>
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() =>
//                 selectedCardAction &&
//                 handleCardAction(
//                   selectedCardAction.cardId,
//                   selectedCardAction.action
//                 )
//               }
//             >
//               Yes, {buttonText}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     );
//   };

//   if (!requests.length) {
//     return (
//       <div className="text-center py-16">
//         <p className="text-muted-foreground">No requests to review</p>
//         <Button
//           onClick={() => navigate("/cards/card-requests")}
//           className="mt-4"
//         >
//           Back to Requests
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* <GoBackButton /> */}
//       <PageHeader
//         title="Card Request Preview"
//         subText="Review the customer's account balance and card cost. Block any existing card of the same type before proceeding with a new request."
//       />

//       <div className="space-y-8">
//         {/* Account Information Card */}
//         <Card className="">
//           {/* <CardHeader className="pb-1">
//             <CardTitle className="text-base font-semibold text-slate-800">
//               Account information
//             </CardTitle>
//           </CardHeader> */}

//           <CardContent className="space-y-4">
//             {/* Account number – single, full‑width field */}
//             <div className="space-y-1">
//               <label className="block font-medium text-muted-foreground">
//                 Account Number
//               </label>
//               <div className="w-full rounded-md border border-slate-200 bg-slate-50 p-3">
//                 {accountData.accountNumber}
//               </div>
//             </div>

//             {/* Three detail rows */}
//             {[
//               { label: "Account Name", value: accountData.accountName },
//               {
//                 label: "Account Balance",
//                 value: `₦${accountData.accountBalance.toLocaleString()}`,
//               },
//               {
//                 label: "Card Cost",
//                 value: `₦${accountData.cardCost.toLocaleString()}`,
//               },
//             ].map(({ label, value }) => (
//               <div
//                 key={label}
//                 className="flex justify-between items-center border-b border-slate-200 bg-white p-2"
//               >
//                 <span className="font-medium text-muted-foreground">
//                   {label}
//                 </span>
//                 <span className="">{value}</span>
//               </div>
//             ))}
//             {/* Existing cards (updated collapsible layout) */}
//             <Collapsible open={isCardsOpen} onOpenChange={setIsCardsOpen}>
//               <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100">
//                 <span className="">Existing cards</span>
//                 <Badge variant="outline">{existingCards.length}</Badge>
//               </CollapsibleTrigger>

//               <CollapsibleContent className="pt-4 space-y-4">
//                 {existingCards.map((card) => {
//                   const cfg =
//                     cardStatusConfig[
//                       card.status as keyof typeof cardStatusConfig
//                     ];
//                   return (
//                     <div
//                       key={card.id}
//                       className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3"
//                     >
//                       <div className="space-y-1">
//                         <div className="">{card.number}</div>
//                         <div className="text-sm">
//                           {card.type} ({card.status})
//                         </div>
//                       </div>

//                       <div>{getActionButton(card)}</div>
//                     </div>
//                   );
//                 })}
//               </CollapsibleContent>
//             </Collapsible>
//           </CardContent>
//         </Card>

//         {/* Request Summary
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <CreditCard className="h-5 w-5" />
//               New Card Request Summary
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
//               {requests.map((request, index) => (
//                 <div
//                   key={request.id}
//                   className="p-4 bg-slate-50 rounded-lg space-y-2"
//                 >
//                   <h4 className="font-semibold text-slate-800">
//                     Request #{index + 1}
//                   </h4>
//                   <div className="space-y-1 text-xs">
//                     <div className="flex justify-between">
//                       <span className="text-slate-600">Scheme:</span>
//                       <span className="font-medium">
//                         {request.cardDetails.scheme || "Not specified"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-slate-600">Variant:</span>
//                       <span className="font-medium">
//                         {request.cardDetails.variant || "Not specified"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-slate-600">Name:</span>
//                       <span className="font-medium">
//                         {request.cardDetails.nameOnCard || "Not specified"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card> */}

//         {/* Action Buttons */}
//         <div className="flex justify-between items-center pt-6 border-t">
//           {/* <Button variant="outline" onClick={handleBack}>
//             <ArrowLeft className="h-4 w-4" />
//             Back to Edit
//           </Button> */}

//           <Button onClick={handleProceed} className="min-w-40">
//             Proceed
//             <ArrowRight className="h-4 w-4" />
//           </Button>

//           {/* <Button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="min-w-40"
//           >
//             {isSubmitting ? (
//               <>
//                 <Clock className="mr-2 h-4 w-4 animate-spin" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <CheckCircle className="mr-2 h-4 w-4" />
//                 Submit Request{requests.length > 1 ? "s" : ""}
//               </>
//             )}
//           </Button> */}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  CheckCircle,
  ShieldOff,
  AlertTriangle,
  XCircle,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Info,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  useCardRequestStore,
  type CardRequest,
} from "@/store/slices/cardRequestStore";
import GoBackButton from "@/components/common/shared/GoBackButton";
import { PageHeader } from "@/components/common/shared/PageHeader";

// TODO: Replace with actual API endpoint when backend is ready
// GET /api/cards/{accountNumber} - Fetch existing cards for account
// POST /api/cards/{cardId}/block - Block a card with reason
// POST /api/cards/{cardId}/unblock - Unblock a card
// POST /api/cards/{cardId}/replace - Request card replacement
// GET /api/accounts/{accountNumber} - Fetch account details including balance

interface ExistingCard {
  id: number;
  number: string;
  type: string;
  status:
    | "Active"
    | "Blocked"
    | "Damaged"
    | "Lost"
    | "Stolen"
    | "Trapped in ATM";
  scheme: string;
  expiryDate: string;
}

interface AccountData {
  accountNumber: string;
  accountName: string;
  accountBalance: number;
  cardCost: number;
}

// Mock data - TODO: Replace with API calls
const getMockExistingCards = (accountNumber: string): ExistingCard[] => [
  {
    id: 1,
    number: "5161 **** **** 1212",
    type: "Master Card",
    status: "Active",
    scheme: "mastercard",
    expiryDate: "12/26",
  },
  {
    id: 2,
    number: "4444 **** **** 2211",
    type: "Visa",
    status: "Active",
    scheme: "visa",
    expiryDate: "08/25",
  },
  {
    id: 3,
    number: "4263 **** **** 1234",
    type: "Visa",
    status: "Blocked",
    scheme: "visa",
    expiryDate: "03/27",
  },
];

const getMockAccountData = (accountNumber: string): AccountData => ({
  accountNumber,
  accountName: "John Doe", // Hard-coded for now
  accountBalance: 150000, // Hard-coded for now - ₦150,000
  cardCost: 2000, // Hard-coded for now - ₦2,000
});

const blockReasons = [
  { value: "damaged", label: "Damaged" },
  { value: "lost", label: "Lost" },
  { value: "stolen", label: "Stolen" },
  { value: "trapped", label: "Trapped in ATM" },
];

const cardStatusConfig = {
  Active: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  Blocked: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: ShieldOff,
  },
  Damaged: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: AlertTriangle,
  },
  Lost: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: XCircle,
  },
  Stolen: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
  "Trapped in ATM": {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Zap,
  },
};

// Blinking animation component for info icon
const BlinkingInfoIcon = () => (
  <div className="animate-pulse">
    <Info className="h-4 w-4 text-yellow-500" />
  </div>
);

export default function CardRequestPreview() {
  const { state } = useLocation() as { state?: { requests: CardRequest[] } };
  const navigate = useNavigate();
  const { requests: storeRequests } = useCardRequestStore();

  const [isCardsOpen, setIsCardsOpen] = useState<Record<string, boolean>>({});
  const [selectedCard, setSelectedCard] = useState<ExistingCard | null>(null);
  const [blockReason, setBlockReason] = useState<string>("");
  const [isBlockingCard, setIsBlockingCard] = useState(false);
  const [accountsData, setAccountsData] = useState<Map<string, AccountData>>(
    new Map()
  );
  const [cardsData, setCardsData] = useState<Map<string, ExistingCard[]>>(
    new Map()
  );

  // Use requests from navigation state or fallback to store
  const requests = state?.requests || storeRequests;

  // Get account data for each request
  useEffect(() => {
    // Load data for each unique account
    const uniqueAccounts = [
      ...new Set(requests.map((req) => req.customer.accountNumber)),
    ];

    uniqueAccounts.forEach((accountNumber) => {
      // TODO: Replace with actual API calls
      // fetchAccountData(accountNumber);
      // fetchExistingCards(accountNumber);

      // Mock data for now
      setAccountsData(
        (prev) =>
          new Map(prev.set(accountNumber, getMockAccountData(accountNumber)))
      );
      setCardsData(
        (prev) =>
          new Map(prev.set(accountNumber, getMockExistingCards(accountNumber)))
      );
    });
  }, [requests]);

  // TODO: Implement actual API calls when backend is ready
  const fetchAccountData = async (accountNumber: string) => {
    try {
      // const response = await fetch(`/api/accounts/${accountNumber}`);
      // const data = await response.json();
      // setAccountsData(prev => new Map(prev.set(accountNumber, data)));
    } catch (error) {
      console.error("Failed to fetch account data:", error);
      toast.error("Failed to load account information");
    }
  };

  const fetchExistingCards = async (accountNumber: string) => {
    try {
      // const response = await fetch(`/api/cards/${accountNumber}`);
      // const data = await response.json();
      // setCardsData(prev => new Map(prev.set(accountNumber, data)));
    } catch (error) {
      console.error("Failed to fetch existing cards:", error);
      toast.error("Failed to load existing cards");
    }
  };

  const handleBlockCard = async (accountNumber: string) => {
    if (!selectedCard || !blockReason) return;

    setIsBlockingCard(true);
    try {
      // TODO: Call actual API endpoint
      // await fetch(`/api/cards/${selectedCard.id}/block`, {
      //   method: 'POST',
      //   body: JSON.stringify({ reason: blockReason }),
      //   headers: { 'Content-Type': 'application/json' }
      // });

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update card status locally for the specific account
      setCardsData((prev) => {
        const newMap = new Map(prev);
        const accountCards = newMap.get(accountNumber) || [];
        const updatedCards = accountCards.map((card) =>
          card.id === selectedCard.id
            ? { ...card, status: "Blocked" as const }
            : card
        );
        newMap.set(accountNumber, updatedCards);
        return newMap;
      });

      toast.success("Card has been blocked successfully");
      setSelectedCard(null);
      setBlockReason("");
    } catch (error) {
      toast.error("Failed to block card. Please try again.");
    } finally {
      setIsBlockingCard(false);
    }
  };

  const handleProceed = () => {
    navigate("/cards/card-requests/cards-request-submit", {
      state: { requests },
    });
  };

  // Show empty state if no requests
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

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <GoBackButton />
        <PageHeader
          title="Card Request Preview"
          subText="Review the customer's account balance and card cost. Block any
          existing card of the same type before proceeding with a new request."
        />
      </div>

      <div className="space-y-8">
        {/* Account Information Cards - One for each request */}
        {requests.map((request, index) => {
          const accountNumber = request.customer.accountNumber;
          const accountData = accountsData.get(accountNumber);
          const existingCards = cardsData.get(accountNumber) || [];
          const isCardsOpenForAccount = isCardsOpen[accountNumber] || false;

          return (
            <Card key={`${accountNumber}-${index}`}>
              {/* <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Request #{index + 1} - Account Details
                  <Badge variant="secondary" className="text-xs">
                    {request.status}
                  </Badge>
                </CardTitle>
              </CardHeader> */}
              <CardContent className="space-y-4">
                {/* Account number – single, full‑width field */}
                <div className="space-y-1">
                  <label className="block font-medium text-muted-foreground">
                    Account Number
                  </label>
                  <div className="w-full rounded-md border border-slate-200 bg-slate-50 p-3">
                    {accountNumber}
                  </div>
                </div>

                {/* Account details */}
                {accountData && (
                  <>
                    {[
                      { label: "Account Name", value: accountData.accountName },
                      {
                        label: "Account Balance",
                        value: `₦${accountData.accountBalance.toLocaleString()}`,
                      },
                      {
                        label: "Card Cost",
                        value: `₦${accountData.cardCost.toLocaleString()}`,
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center border-b border-slate-200 bg-white p-2"
                      >
                        <span className="font-medium text-muted-foreground">
                          {label}
                        </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </>
                )}

                {/* Request details */}
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-800">
                    Request Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Scheme:</span>
                      <span className="font-medium">
                        {request.cardDetails.scheme || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Variant:</span>
                      <span className="font-medium">
                        {request.cardDetails.variant || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Name on Card:</span>
                      <span className="font-medium">
                        {request.cardDetails.nameOnCard || "Not specified"}
                      </span>
                    </div>
                    {request.cardDetails.requestType && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Request Type:</span>
                        <span className="font-medium">
                          {request.cardDetails.requestType}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Existing cards collapsible */}
                <Collapsible
                  open={isCardsOpenForAccount}
                  onOpenChange={(open) =>
                    setIsCardsOpen((prev) => ({
                      ...prev,
                      [accountNumber]: open,
                    }))
                  }
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100">
                    <div className="flex items-center gap-3">
                      <span>Existing cards</span>
                      <Badge variant="outline">{existingCards.length}</Badge>
                      <BlinkingInfoIcon />
                    </div>
                    <div className="flex items-center gap-2">
                      {isCardsOpenForAccount ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="pt-4 space-y-4">
                    {existingCards.map((card) => {
                      const cfg = cardStatusConfig[card.status];
                      const StatusIcon = cfg.icon;

                      return (
                        <div
                          key={card.id}
                          className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <StatusIcon className="h-5 w-5 text-slate-500" />
                            <div className="space-y-1">
                              <div className="font-medium">{card.number}</div>
                              <div className="text-sm text-muted-foreground">
                                {card.type} • Expires {card.expiryDate}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge className={cfg.color}>{card.status}</Badge>

                            {card.status === "Active" && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
                                    onClick={() => setSelectedCard(card)}
                                  >
                                    Block Card
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-red-700">
                                      Block Card?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will block the card and prevent all
                                      transactions. Please select a reason for
                                      blocking this card.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <div className="py-4">
                                    <Select
                                      value={blockReason}
                                      onValueChange={setBlockReason}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select reason for blocking" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {blockReasons.map((reason) => (
                                          <SelectItem
                                            key={reason.value}
                                            value={reason.value}
                                          >
                                            {reason.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      onClick={() => {
                                        setSelectedCard(null);
                                        setBlockReason("");
                                      }}
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      disabled={!blockReason || isBlockingCard}
                                      onClick={() =>
                                        handleBlockCard(accountNumber)
                                      }
                                      className="bg-red-600 hover:bg-red-700 border-red-600"
                                    >
                                      {isBlockingCard
                                        ? "Blocking..."
                                        : "Yes, Block Card"}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })}

        {/* Action Buttons */}
        <div className="flex justify-end items-center pt-6 border-t">
          <Button onClick={handleProceed}>
            Proceed
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
