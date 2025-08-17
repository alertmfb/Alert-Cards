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
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  ShieldX,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { ViewCustomerDetailsDialog } from "~/components/shared/Table/ViewDetailsDialog";
import { formatDialogDateTime } from "~/utils";
import { branchOptions } from "~/constants/data";
import type { BranchType, RoleType, ServerUser } from "~/index";
import {
  useSuspendUserMutation,
  useActivateUserMutation,
  useUpdateUserMutation,
} from "~/api/mutations/users";

export const AdminActionMenu = ({ admin }: { admin: ServerUser }) => {
  const [dialog, setDialog] = useState<
    null | "edit" | "suspend" | "activate" | "view"
  >(null);

  // Mutations
  const suspendUserMutation = useSuspendUserMutation();
  const activateUserMutation = useActivateUserMutation();
  const updateUserMutation = useUpdateUserMutation();

  /* ── local editable copy ────────────────────────── */
  const [formData, setFormData] = useState({
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    branch: admin.branch?.name as BranchType | undefined,
    role: admin.role as RoleType,
  });

  const { date, time } = formatDialogDateTime(admin.createdAt);

  /* ── helpers ────────────────────────────────────── */
  const fullName = `${admin.firstName} ${admin.lastName}`.trim();
  const statusLabel = admin.isActive ? "Active" : "Inactive";
  const branchName = admin.branch?.name || "No branch assigned";

  const createdAtCell = (
    <div className="flex flex-col whitespace-nowrap">
      <span>{date}</span>
      <span className="text-xs text-red-600">{time}</span>
    </div>
  );

  /* ── submit handlers ─────────────────────────────── */
  const handleEditSubmit = async () => {
    // Validate required fields
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("First name and last name are required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      await updateUserMutation.mutateAsync({
        userId: admin.id,
        userData: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          role: formData.role,
          branch: formData.branch || undefined,
        },
      });
      setDialog(null);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleSuspend = async () => {
    try {
      await suspendUserMutation.mutateAsync(admin.id);
      setDialog(null);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleActivate = async () => {
    try {
      await activateUserMutation.mutateAsync(admin.id);
      setDialog(null);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  // Loading states
  const isLoading =
    suspendUserMutation.isPending ||
    activateUserMutation.isPending ||
    updateUserMutation.isPending;

  /* ── table-style detail list for <ViewDetailsDialog> */
  const viewDetails = [
    { label: "Name", value: fullName },
    { label: "Email", value: admin.email },
    { label: "Branch", value: branchName },
    { label: "Role", value: admin.role },
    { label: "Status", value: statusLabel, isStatus: true },
    { label: "Created At", value: createdAtCell },
  ];

  /* ── UI ─────────────────────────────────────────── */
  return (
    <>
      {/* Action dropdown – the "•••" button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="sr-only">Open menu for {fullName}</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialog("view")}>
            <Eye className="w-4 h-4 mr-2" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialog("edit")}
            disabled={isLoading}
          >
            <Pencil className="w-4 h-4 mr-2" /> Edit User
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {admin.isActive ? (
            <DropdownMenuItem
              onClick={() => setDialog("suspend")}
              className="text-red-600 focus:text-red-600"
              disabled={isLoading}
            >
              <ShieldX className="w-4 h-4 mr-2" /> Suspend User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => setDialog("activate")}
              className="text-green-600 focus:text-green-600"
              disabled={isLoading}
            >
              <ShieldCheck className="w-4 h-4 mr-2" /> Activate User
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ── Suspend dialog ──────────────────────────── */}
      <Dialog open={dialog === "suspend"} onOpenChange={() => setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to suspend <strong>{fullName}</strong>?
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> This user will be temporarily removed
                from the platform and all associated data will be deactivated.
                This action can be reversed later.
              </p>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setDialog(null)}
              disabled={suspendUserMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSuspend}
              disabled={suspendUserMutation.isPending}
            >
              {suspendUserMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Suspending...
                </>
              ) : (
                "Yes, Suspend User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Activate dialog ──────────────────────────── */}
      <Dialog open={dialog === "activate"} onOpenChange={() => setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to activate <strong>{fullName}</strong>?
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Info:</strong> This user will be restored to the
                platform and all associated data will be reactivated.
              </p>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setDialog(null)}
              disabled={activateUserMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleActivate}
              disabled={activateUserMutation.isPending}
            >
              {activateUserMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Activating...
                </>
              ) : (
                "Yes, Activate User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit dialog ─────────────────────────────── */}
      <Dialog open={dialog === "edit"} onOpenChange={() => setDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 pt-2">
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, firstName: e.target.value }))
                  }
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, lastName: e.target.value }))
                  }
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="Enter email address"
              />
            </div>

            {/* Branch */}
            <div>
              <Label htmlFor="branch">Branch</Label>
              <Select
                value={formData.branch || ""}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, branch: val as BranchType }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select branch (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No branch assigned</SelectItem>
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
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, role: val as RoleType }))
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

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setDialog(null)}
              disabled={updateUserMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── View dialog ─────────────────────────────── */}
      <ViewCustomerDetailsDialog
        title="User Details"
        details={viewDetails}
        open={dialog === "view"}
        onClose={() => setDialog(null)}
      />
    </>
  );
};
