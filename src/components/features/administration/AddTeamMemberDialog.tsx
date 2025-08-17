import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import type { BranchType, RoleType } from "@/types";
import { toast } from "sonner";
import { useBranchOptions } from "@/hooks/useBranchOptions";
import { useInviteMutation } from "@/api/mutations/auth";
import { COMPANY_EMAIL_REGEX } from "@/lib/utils/validation";
import { useRolesQuery } from "@/api/queries/auth";
import { useRoleStore } from "@/store/slices/roleStore";
import { createRoleOptions } from "@/lib/utils/roleOptions";

export const AddTeamMemberDialog = () => {
  const [email, setEmail] = React.useState("");
  const [branch, setBranch] = React.useState<BranchType | "">("");
  const [role, setRole] = React.useState<RoleType | "">("");
  const [open, setOpen] = React.useState(false);

  const { branchOptions, isLoading: branchesLoading } = useBranchOptions();
  const { isLoading: rolesLoading } = useRolesQuery();
  const roles = useRoleStore((s) => s.roles);

  const inviteMutation = useInviteMutation();

  const emailIsValid = COMPANY_EMAIL_REGEX.test(email.trim());

  // Create role options from store data
  const roleOptions = React.useMemo(() => createRoleOptions(roles), [roles]);

  const handleInvite = async () => {
    if (!email || !branch || !role) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!emailIsValid) {
      toast.error(
        "Please enter a valid email address (e.g. adeyemi.tolulope@alertmfb.com.ng)"
      );
      return;
    }

    try {
      await inviteMutation.mutateAsync({
        email,
        branchId: branch,
        role,
      });

      toast.success("Invite sent successfully.");
      setOpen(false);

      // Reset form
      setEmail("");
      setBranch("");
      setRole("");
    } catch (error) {
      toast.error("Failed to send invite. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="off"
              placeholder="e.g. adeyemi.tolulope@alertmfb.com.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="branch">Branch</Label>
            <Select
              value={branch}
              onValueChange={(val) => setBranch(val as BranchType)}
              disabled={branchesLoading}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue
                  placeholder={
                    branchesLoading ? "Loading branches..." : "Select a branch"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {branchOptions.map(
                  ({ label, value }: { label: string; value: string }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={(val) => setRole(val as RoleType)}
              disabled={rolesLoading}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue
                  placeholder={
                    rolesLoading ? "Loading roles..." : "Select a role"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleInvite} disabled={inviteMutation.isPending}>
            {inviteMutation.isPending ? "Sending..." : "Send Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
