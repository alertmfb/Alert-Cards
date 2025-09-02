import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info, CreditCard, ShieldOff } from "lucide-react";
import { cn } from "@/lib";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useCardRequestStore } from "@/store/slices/useCardRequestStore";

export default function CardEntrySection() {
  const [accountNumber, setAccountNumber] = useState("");
  const [showCards, setShowCards] = useState(false);
  const { setFormData } = useCardRequestStore();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // Debounced or effect-based update to avoid max update depth
  useEffect(() => {
    if (!accountNumber) {
      setShowCards(false);
      setFormData({ customer: undefined });
    } else {
      const dummyCustomer = {
        name: "John Doe",
        phone: "08012345678",
        account: accountNumber,
      };

      setFormData({
        customer: dummyCustomer,
        accountBalance: 50000,
        cardCost: 2000,
      });
    }
  }, [accountNumber, setFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  const existingCards = [
    {
      id: 1,
      number: "5161 **** **** 1212",
      type: "Master Card",
      status: "Active",
    },
    {
      id: 2,
      number: "4444 **** **** 2211",
      type: "Visa",
      status: "Blocked",
    },
  ];

  const handleBlockCard = (cardId: number) => {
    // Simulate API call
    toast.success("Card has been blocked.");
    // You can implement backend call here later
  };

  return (
    <Card>
      <CardContent className="space-y-6 py-6">
        <div className="space-y-2">
          <Label htmlFor="account-number">Account Number</Label>
          <Input
            id="account-number"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={handleInputChange}
          />
        </div>

        {accountNumber && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Account Name:</span>
              <span className="font-medium">John Doe</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Account Balance:</span>
              <span className="font-semibold text-green-600">₦50,000.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Card Cost:</span>
              <span className="font-semibold text-primary">₦2000</span>
            </div>

            {/* Existing Cards Toggle */}
            <div
              className="flex items-center justify-between cursor-pointer mt-6"
              onClick={() => setShowCards((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                <ChevronDown
                  className={cn(
                    "transition-transform",
                    showCards && "rotate-180"
                  )}
                />
                <span className="text-base font-medium">Existing Cards</span>
              </div>
              <Info className="text-yellow-400 w-4 h-4" />
            </div>
          </div>
        )}

        {/* Existing Cards List */}
        {accountNumber && showCards && (
          <div className="space-y-3">
            {existingCards.map((card) => (
              <div
                key={card.id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-muted/50"
              >
                <div className="space-y-1">
                  <div className="text-sm font-semibold">{card.number}</div>
                  <div className="text-xs text-muted-foreground">
                    {card.type}
                  </div>
                  <div
                    className={cn(
                      "text-xs font-semibold",
                      card.status === "Active"
                        ? "text-green-600"
                        : "text-gray-500"
                    )}
                  >
                    ({card.status})
                  </div>
                </div>

                {card.status === "Active" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => setSelectedCardId(card.id)}
                      >
                        Block Card
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Block this card?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will block the card and cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleBlockCard(card.id)}
                        >
                          Yes, Block
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* <CardFooter className="justify-end">
        <Button>Request New Card</Button>
      </CardFooter> */}
    </Card>
  );
}
