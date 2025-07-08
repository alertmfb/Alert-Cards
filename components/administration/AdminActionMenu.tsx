import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Input } from "components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "components/ui/select";
import { Label } from "~/components/ui/label";
import { Eye, MoreHorizontal, Pencil, ShieldX } from "lucide-react";
import type { BranchType, RoleType, UserAdminType } from "~/index";
import { ViewCustomerDetailsDialog } from "components/shared/Table/ViewDetailsDialog";
import { formatDialogDateTime, getBranchLabel } from "~/utils";
import { branchOptions } from "~/constants/data";

export const AdminActionMenu = ({ admin }: { admin: UserAdminType }) => {
  const [dialog, setDialog] = useState<null | "edit" | "suspend" | "view">(
    null
  );
  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    branch: admin.branch,
    role: admin.role,
  });
  const { date, time } = formatDialogDateTime(admin.createdAt);

  const createdAtCell = (
    <div className="flex flex-col whitespace-nowrap">
      <span>{date}</span>
      <span className="text-xs text-red-600">{time}</span>
    </div>
  );

  const handleEditSubmit = () => {
    // TODO: Submit updated data to backend
    toast.success("User information updated");
    setDialog(null);
  };

  const handleSuspend = () => {
    // TODO: Call backend to suspend user
    toast.error("User has been suspended");
    setDialog(null);
  };

  const viewDetails = [
    { label: "Name", value: admin.name },
    { label: "Email", value: admin.email },
    { label: "Branch", value: getBranchLabel(admin.branch) },
    { label: "Role", value: admin.role },
    { label: "Status", value: admin.status, isStatus: true },
    { label: "Created At", value: createdAtCell },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialog("view")}>
            <Eye className="w-4 h-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialog("edit")}>
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialog("suspend")}>
            <ShieldX className="w-4 h-4 mr-2 text-red-600" /> Suspend User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Suspend Dialog */}
      <Dialog open={dialog === "suspend"} onOpenChange={() => setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Member</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Suspending <strong>{admin.name}</strong>. This user will be
            temporarily removed from the platform and all associated data will
            be deactivated.
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialog(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSuspend}>
              Yes, Suspend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={dialog === "edit"} onOpenChange={() => setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 pt-2">
            {/* Name + Email (Same Row) */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Branch */}
            <div>
              <Label htmlFor="branch">Branch</Label>
              <Select
                value={formData.branch}
                onValueChange={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    branch: val as BranchType,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branchOptions.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, role: val as RoleType }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {["CSO", "HOP", "IT"].map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Edit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ViewCustomerDetailsDialog
        title="Member Details"
        details={viewDetails}
        open={dialog === "view"}
        onClose={() => setDialog(null)}
      />
    </>
  );
};
