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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const cardRequests = [
  {
    name: "Adaeze Okafor",
    email: "adaeze.okafor@example.com",
    accountNumber: "1234567890",
    type: "Visa",
    avatarUrl: "",
  },
  {
    name: "Tunde Bakare",
    email: "tunde.bakare@example.com",
    accountNumber: "2345678901",
    type: "Mastercard",
    avatarUrl: "",
  },
  {
    name: "Chinedu Nwosu",
    email: "chinedu.nwosu@example.com",
    accountNumber: "3456789012",
    type: "Verve",
    avatarUrl: "",
  },
  {
    name: "Lionel Ritchie",
    email: "lionek.nwosu@example.com",
    accountNumber: "3456789012",
    type: "Visa",
    avatarUrl: "",
  },
];

const cardTypeStyle = {
  Visa: "bg-blue-100 text-blue-700",
  Mastercard: "bg-red-100 text-red-700",
  Verve: "bg-green-100 text-green-700",
} as const;

export function CardRequests() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Card Requests</CardTitle>
          <CardDescription>Showing recent card requests</CardDescription>
        </div>
        <Button variant="ghost" className="text-sm gap-1 text-muted-foreground">
          View more <ArrowRight className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="grid gap-4">
        {cardRequests.map((request, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                {request.avatarUrl ? (
                  <AvatarImage src={request.avatarUrl} />
                ) : (
                  <AvatarFallback>
                    {request.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium">{request.name}</p>
                <p className="text-xs text-muted-foreground">{request.email}</p>
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
    </Card>
  );
}
