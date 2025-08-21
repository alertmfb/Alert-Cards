import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetCards } from "@/hooks";
import type { CardData } from "@/types";
import RequestCardSkeleton from "./RequestCardSkeleton";

const cardTypeStyle = {
  ALERT_GOLD: "bg-yellow-100 text-yellow-700",
  Mastercard: "bg-red-100 text-red-700",
  Verve: "bg-green-100 text-green-700",
} as const;

export function CardRequests() {
  const { data, isPending } = useGetCards();
  const requests = data?.data?.slice(0, 4)?.map((request: CardData) => ({
    name: request?.customer?.customerName,
    accountNumber: request?.customer?.accountNumber,
    type: request?.variant,
  }));
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Card Requests</CardTitle>
          <CardDescription> Showing recent card requests</CardDescription>
        </div>
        <Button variant="ghost" className="text-sm gap-1 text-muted-foreground">
          View more <ArrowRight className="w-4 h-4" />
        </Button>
      </CardHeader>
      {isPending ? (
        <RequestCardSkeleton />
      ) : (
        <CardContent className="grid gap-4">
          {requests?.map((request, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {request.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">
                    {request.name
                      ?.split(" ")
                      ?.map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      ?.join(" ")}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={clsx(
                    "text-xs px-2 py-1 rounded-md font-semibold inline-block mb-2",
                    cardTypeStyle[request.type as keyof typeof cardTypeStyle]
                  )}
                >
                  {request.type}
                </div>
                <p className="text-xs text-muted-foreground">
                  {request.accountNumber}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
