// import { useState } from "react";
// import { Button } from "components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Trash2, Pencil } from "lucide-react";
// import type { Request } from "../CardRequest";

// interface Props {
//   accountNumber: string;
//   accountName: string;
//   requests: Request[];
//   onDelete: (id: string) => void;
//   onEdit: (id: string) => void;
// }

// export function RequestCard({
//   accountNumber,
//   accountName,
//   requests,
//   onDelete,
//   onEdit,
// }: Props) {
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   return (
//     <Card className="transition-shadow hover:shadow-md">
//       <CardHeader>
//         <CardTitle className="text-base font-semibold">Request</CardTitle>
//         <p className="text-sm text-muted-foreground">
//           {accountName} • <span className="font-mono">{accountNumber}</span>
//         </p>
//       </CardHeader>

//       <CardContent className="space-y-2">
//         {requests.map((req) => (
//           <div
//             key={req.id}
//             className="flex justify-between items-center py-2 px-4 border rounded-lg"
//           >
//             <span className="text-sm font-medium">{req.id}</span>

//             <div className="flex items-center gap-2">
//               {/* Edit */}
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 onClick={() => onEdit(req.id)}
//               >
//                 <Pencil className="w-4 h-4 text-muted-foreground" />
//               </Button>

//               {/* Delete */}
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <button
//                     onClick={() => setDeleteId(req.id)}
//                     className="rounded-full bg-red-50 hover:bg-red-100 p-2"
//                   >
//                     <Trash2 className="w-4 h-4 text-red-500" />
//                   </button>
//                 </DialogTrigger>

//                 <DialogContent
//                   onChange={() => setDeleteId(null)}
//                   className="sm:max-w-md"
//                 >
//                   <div className="space-y-4 text-center">
//                     <p className="text-lg font-semibold">Confirm Deletion</p>
//                     <p className="text-sm text-muted-foreground">
//                       Are you sure you want to delete this request?
//                     </p>
//                   </div>
//                   <div className="flex justify-end gap-2 mt-4">
//                     <DialogClose asChild>
//                       <Button variant="outline">Cancel</Button>
//                     </DialogClose>
//                     <Button
//                       variant="destructive"
//                       onClick={() => deleteId && onDelete(deleteId)}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }

// components/RequestCard.tsx
// import { useState } from "react";
// import { Button } from "components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Trash2, Pencil, CreditCard, User } from "lucide-react";
// import type { CardRequest } from "@/store/slices/cardRequestStore";

// interface Props {
//   accountNumber: string;
//   accountName: string;
//   requests: CardRequest[];
//   onDelete: (id: string) => void;
//   onEdit: (id: string) => void;
// }

// export function RequestCard({
//   accountNumber,
//   accountName,
//   requests,
//   onDelete,
//   onEdit,
// }: Props) {
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   return (
//     <Card className="transition-all hover:shadow-md border-l-4 border-l-primary/20">
//       <CardHeader className="pb-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-primary/10 rounded-lg">
//               <User className="h-4 w-4 text-primary" />
//             </div>
//             <div>
//               <CardTitle className="text-base font-semibold">
//                 {accountName}
//               </CardTitle>
//               <p className="text-sm text-muted-foreground font-mono">
//                 Account: {accountNumber}
//               </p>
//             </div>
//           </div>
//           <Badge variant="secondary" className="text-xs">
//             {requests.length} Request{requests.length > 1 ? "s" : ""}
//           </Badge>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-3">
//         {requests.map((request, index) => (
//           <div
//             key={request.id}
//             className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
//           >
//             <div className="flex items-center gap-3">
//               <div className="p-1.5 bg-background rounded">
//                 <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
//               </div>
//               <div className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium">
//                     Request #{index + 1}
//                   </span>
//                   <Badge variant="outline" className="text-xs">
//                     {request.cardDetails.scheme || "No scheme"}
//                   </Badge>
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   {request.cardDetails.nameOnCard || "No name specified"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-1">
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => onEdit(request.id)}
//                 className="h-8 w-8 p-0"
//               >
//                 <Pencil className="h-3.5 w-3.5" />
//               </Button>

//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => setDeleteId(request.id)}
//                     className="h-8 w-8 p-0 text-destructive hover:text-destructive"
//                   >
//                     <Trash2 className="h-3.5 w-3.5" />
//                   </Button>
//                 </DialogTrigger>

//                 <DialogContent className="sm:max-w-md">
//                   <DialogHeader>
//                     <DialogTitle>Delete Request</DialogTitle>
//                     <DialogDescription>
//                       Are you sure you want to delete this card request? This
//                       action cannot be undone.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <DialogFooter className="gap-2">
//                     <DialogClose asChild>
//                       <Button
//                         variant="outline"
//                         onClick={() => setDeleteId(null)}
//                       >
//                         Cancel
//                       </Button>
//                     </DialogClose>
//                     <Button
//                       variant="destructive"
//                       onClick={() => {
//                         if (deleteId) {
//                           onDelete(deleteId);
//                           setDeleteId(null);
//                         }
//                       }}
//                     >
//                       Delete Request
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }

// components/RequestCard.tsx - Updated with elegant ATM card design
// import { useState } from "react";
// import { Button } from "components/ui/button";
// import { Card, CardContent, CardHeader } from "components/ui/card";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Trash2, Pencil, User, Building2 } from "lucide-react";

// import type { CardRequest } from "@/store/slices/cardRequestStore";
// import { ATMCard, type CardScheme } from "components/custom/ATMCard";

// interface Props {
//   accountNumber: string;
//   accountName: string;
//   requests: CardRequest[];
//   onDelete: (id: string) => void;
//   onEdit: (id: string) => void;
// }

// export function RequestCard({
//   accountNumber,
//   accountName,
//   requests,
//   onDelete,
//   onEdit,
// }: Props) {
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   return (
//     <Card className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white">
//       <CardHeader className="pb-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
//               <Building2 className="h-5 w-5 text-white" />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-slate-800">
//                 {accountName}
//               </h3>
//               <p className="text-sm text-slate-500 font-mono">
//                 Account: {accountNumber}
//               </p>
//             </div>
//           </div>
//           <Badge
//             variant="secondary"
//             className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 shadow-sm"
//           >
//             {requests.length} Card{requests.length > 1 ? "s" : ""}
//           </Badge>
//         </div>
//       </CardHeader>

//       <CardContent>
//         {/* Cards Grid - 3 cards per row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {requests.map((request, index) => {
//             const scheme = (request.cardDetails.scheme?.toLowerCase() ||
//               "visa") as CardScheme;
//             const nameOnCard = request.cardDetails.nameOnCard || accountName;

//             return (
//               <div
//                 key={request.id}
//                 className="group relative p-5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
//               >
//                 {/* Request Header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-2">
//                     <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm">
//                       <User className="h-3.5 w-3.5 text-white" />
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-semibold text-slate-800">
//                         Request #{index + 1}
//                       </h4>
//                       <p className="text-xs text-slate-500">
//                         {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={() => onEdit(request.id)}
//                       className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
//                     >
//                       <Pencil className="h-3.5 w-3.5" />
//                     </Button>

//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => setDeleteId(request.id)}
//                           className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600 rounded-lg"
//                         >
//                           <Trash2 className="h-3.5 w-3.5" />
//                         </Button>
//                       </DialogTrigger>

//                       <DialogContent className="sm:max-w-md">
//                         <DialogHeader>
//                           <DialogTitle className="text-slate-800">
//                             Delete Card Request
//                           </DialogTitle>
//                           <DialogDescription className="text-slate-600">
//                             Are you sure you want to delete this card request?
//                             This action cannot be undone.
//                           </DialogDescription>
//                         </DialogHeader>

//                         <DialogFooter className="gap-3">
//                           <DialogClose asChild>
//                             <Button
//                               variant="outline"
//                               onClick={() => setDeleteId(null)}
//                               className="border-slate-200 hover:bg-slate-50"
//                             >
//                               Cancel
//                             </Button>
//                           </DialogClose>
//                           <Button
//                             variant="destructive"
//                             onClick={() => {
//                               if (deleteId) {
//                                 onDelete(deleteId);
//                                 setDeleteId(null);
//                               }
//                             }}
//                             className="bg-red-500 hover:bg-red-600 shadow-sm"
//                           >
//                             Delete Request
//                           </Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </div>

//                 {/* Beautiful ATM Card Display */}
//                 <div className="flex justify-center mb-4">
//                   <ATMCard
//                     scheme={scheme}
//                     nameOnCard={nameOnCard}
//                     accountNumber={accountNumber}
//                     size="sm"
//                     className="transform hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>

//                 {/* Card Details */}
//                 <div className="space-y-3 text-xs">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-slate-500">Card Holder</p>
//                       <p
//                         className="font-medium text-slate-800 truncate"
//                         title={nameOnCard}
//                       >
//                         {nameOnCard}
//                       </p>
//                     </div>
//                     <Badge
//                       variant="outline"
//                       className="bg-white border-slate-200 text-slate-700 shadow-sm text-xs px-2 py-1"
//                     >
//                       {request.cardDetails.cardType || "Standard"}
//                     </Badge>
//                   </div>

//                   {/* Additional card info row */}
//                   <div className="pt-2 border-t border-slate-100">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-500">Status</span>
//                       <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5 border-0">
//                         Pending
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import type { CardRequest } from "@/store/slices/cardRequestStore";

interface Props {
  accountNumber: string;
  accountName: string;
  requests: CardRequest[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function RequestCard({
  accountNumber,
  accountName,
  requests,
  onDelete,
  onEdit,
}: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-slate-800">
              {accountName}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{accountNumber}</p>
          </div>
          <Badge
            variant="outline"
            className="text-xs font-normal border-slate-200"
          >
            {requests.length} Request{requests.length > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {requests.map((request, index) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-2 rounded-md border border-slate-100 bg-muted/50"
          >
            <div>
              <p className="text-sm font-medium text-slate-800">
                {request.cardDetails.nameOnCard || `Request #${index + 1}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {request.cardDetails.scheme || "No scheme"}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-blue-700 hover:bg-blue-100 hover:text-blue-600"
                onClick={() => onEdit(request.id)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-600 hover:bg-red-100 hover:text-red-600"
                    onClick={() => setDeleteId(request.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Delete Request</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this card request? This
                      action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (deleteId) {
                          onDelete(deleteId);
                          setDeleteId(null);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
