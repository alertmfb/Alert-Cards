import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Detail = {
  label: string;
  value: string | React.ReactNode;
  isStatus?: boolean;
};

type Props = {
  title: string;
  details: Detail[];
  open: boolean;
  onClose: () => void;
};

const getStatusStyles = (value: string) => {
  const status = value.toLowerCase();
  if (
    ["activated", "dispatched", "branch delivered", "active"].includes(status)
  ) {
    return "bg-green-100 text-green-700";
  } else if (["inactive", "in production"].includes(status)) {
    return "bg-yellow-100 text-yellow-800";
  } else if (["blocked"].includes(status)) {
    return "bg-red-100 text-red-700";
  } else {
    return "bg-gray-100";
  }
};

export const ViewCustomerDetailsDialog = ({
  title,
  details,
  open,
  onClose,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl shadow-xl px-6 py-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 text-sm text-foreground mt-4">
          {details.map(({ label, value, isStatus }, idx) => (
            <div key={idx} className="flex items-start justify-between gap-4">
              <span className="text-muted-foreground font-medium min-w-[120px]">
                {label}
              </span>
              {isStatus ? (
                <Badge
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyles(
                    String(value)
                  )}`}
                >
                  {value}
                </Badge>
              ) : (
                <span className="text-right font-semibold max-w-[60%] break-words">
                  {value}
                </span>
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
