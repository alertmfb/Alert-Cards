// components/CardAccountDisplay.tsx
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { CreditCard, CheckCircle } from "lucide-react";

interface Props {
  accountNumber: string;
}

export function CardAccountDisplay({ accountNumber }: Props) {
  if (!accountNumber) return null;

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Current Account
              </p>
              <p className="text-lg font-semibold font-mono">{accountNumber}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
