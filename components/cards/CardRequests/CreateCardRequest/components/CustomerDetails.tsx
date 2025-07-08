// components/CustomerDetails.tsx
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { User } from "lucide-react";
import { useCardRequestStore } from "~/stores/useCardRequestStore";

interface Props {
  name: string;
  phone: string;
  account: string;
}

/**
 * Displays read‑only customer information in a compact two‑column grid.
 * If your global Zustand store is active, the data is pushed there on mount.
 */
export function CustomerDetails({ name, phone, account }: Props) {
  const setFormData = useCardRequestStore((s) => s.setFormData);

  useEffect(() => {
    setFormData({ customer: { name, phone, account } });
  }, [name, phone, account, setFormData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base uppercase font-semibold">
          {/* <User className="h-4 w-4 shrink-0" /> */}
          Customer details
        </CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* NAME */}
          <div>
            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Customer name
            </dt>
            <dd className="mt-1 rounded-md border px-3 py-2 text-sm bg-muted/40">
              {name || (
                <span className="italic text-muted-foreground">
                  Not provided
                </span>
              )}
            </dd>
          </div>

          {/* PHONE */}
          <div>
            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Phone number
            </dt>
            <dd className="mt-1 rounded-md border px-3 py-2 text-sm bg-muted/40">
              {phone || (
                <span className="italic text-muted-foreground">
                  Not provided
                </span>
              )}
            </dd>
          </div>

          {/* ACCOUNT */}
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Account number
            </dt>
            <dd className="mt-1 flex items-center gap-3 rounded-md border px-3 py-2 text-sm font-mono bg-muted/40">
              {account || (
                <span className="italic text-muted-foreground">
                  Not provided
                </span>
              )}
              {account && (
                <span className="inline-block rounded border px-2 py-0.5 text-[10px] leading-none text-foreground/70">
                  verified
                </span>
              )}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
