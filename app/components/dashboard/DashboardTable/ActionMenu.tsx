import { toast } from "sonner";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { CustomerCardData } from "~/index";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ViewCustomerDetailsDialog } from "~/components/shared/Table/ViewDetailsDialog";
import { maskPan } from "~/utils";

export const ActionMenu = ({ item }: { item: CustomerCardData }) => {
  const [open, setOpen] = useState<null | "edit" | "view">(null);
  const [branch, setBranch] = useState(item.branch || "");

  const handleEdit = () => {
    toast.success(`Updated branch for ${item.customerName}.`);
    setOpen(null);
  };

  const details = [
    { label: "Customer Name", value: item.customerName },
    { label: "Account Number", value: item.accountNumber },
    { label: "PAN Number", value: maskPan(item.panNumber) },
    { label: "Card Scheme", value: item.cardScheme },
    { label: "Branch", value: item.branch },
    {
      label: "Card Status",
      value: item.cardStatus,
      isStatus: true,
    },
    {
      label: "Delivery Status",
      value: item.deliveryStatus,
      isStatus: true,
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-md hover:bg-muted">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen("view")}>
            <Eye className="w-4 h-4" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen("edit")}>
            <Pencil className="w-4 h-4" /> Edit Branch
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpen("delete")}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete Record
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Details Dialog */}
      <ViewCustomerDetailsDialog
        title="Customer Details"
        details={details}
        open={open === "view"}
        onClose={() => setOpen(null)}
      />

      {/* Edit Dialog */}
      <Dialog open={open === "edit"} onOpenChange={() => setOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer Branch</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Branch</Label>
            <Input
              value={branch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBranch(e.target.value)
              }
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(null)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {/* <Dialog open={open === "delete"} onOpenChange={() => setOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Customer Record</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Are you sure you want to delete <strong>{item.customerName}</strong>
            ? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </>
  );
};
