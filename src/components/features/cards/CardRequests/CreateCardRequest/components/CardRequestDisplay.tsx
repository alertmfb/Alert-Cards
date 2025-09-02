import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Trash2, Pencil, User, Building2, CreditCard } from "lucide-react";

import type { CardRequest } from "@/store/slices/cardRequestStore";
import { ATMCard, type CardScheme } from "@/components/common/custom/ATMCard";

interface Props {
  requests: CardRequest[]; // Flattened array of all requests
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

interface CardRequestDisplayProps {
  request: CardRequest;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function CardRequestDisplay({
  request,
  onDelete,
  onEdit,
}: CardRequestDisplayProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const scheme = (request.cardDetails.scheme?.toLowerCase() ||
    "visa") as CardScheme;
  const nameOnCard = request.cardDetails.nameOnCard || "Card Holder";
  const accountNumber = request.customer.accountNumber || "****";

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
      <CardContent className="p-6">
        {/* Header with Account Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Card Request
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {accountNumber}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(request.id)}
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeleteId(request.id)}
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-slate-800">
                    Delete Card Request
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Are you sure you want to delete this card request? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-3">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => setDeleteId(null)}
                      className="border-slate-200 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (deleteId) {
                        onDelete(deleteId);
                        setDeleteId(null);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 shadow-sm"
                  >
                    Delete Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ATM Card Display */}
        <div className="flex justify-center mb-6">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <ATMCard
              scheme={scheme}
              nameOnCard={nameOnCard}
              accountNumber={accountNumber}
              size="sm"
            />
          </div>
        </div>

        {/* Card Details Grid */}
        <div className="space-y-4">
          {/* Primary Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Card Holder</p>
              <p
                className="text-sm font-medium text-slate-800 truncate"
                title={nameOnCard}
              >
                {nameOnCard}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Scheme</p>
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 text-xs"
              >
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Secondary Info */}
          <div className="grid grid-cols-2 gap-4">
            {request.cardDetails.variant && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Variant</p>
                <p className="text-sm text-slate-700">
                  {request.cardDetails.variant}
                </p>
              </div>
            )}
            {request.cardDetails.requestType && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Request Type</p>
                <p className="text-sm text-slate-700">
                  {request.cardDetails.requestType}
                </p>
              </div>
            )}
          </div>

          {/* Additional Details */}
          {(request.cardDetails.branch || request.cardDetails.channel) && (
            <div className="grid grid-cols-2 gap-4">
              {request.cardDetails.branch && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">Branch</p>
                  <p className="text-sm text-slate-700">
                    {request.cardDetails.branch}
                  </p>
                </div>
              )}
              {request.cardDetails.channel && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">Channel</p>
                  <p className="text-sm text-slate-700">
                    {request.cardDetails.channel}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Reason */}
          {request.cardDetails.reason && (
            <div>
              <p className="text-xs text-slate-500 mb-1">Reason</p>
              <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-2 border">
                {request.cardDetails.reason}
              </p>
            </div>
          )}

          {/* Status Footer */}
          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-500">Status</span>
            <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 text-xs">
              Pending
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
