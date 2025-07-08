import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Input } from "components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "components/ui/select";
import { Button } from "components/ui/button";
import { Label } from "~/components/ui/label";
import { Plus } from "lucide-react";
import type { BranchType, RoleType } from "~/index";
import { branchOptions } from "~/constants/data";
import { toast } from "sonner";

const roleOptions: RoleType[] = ["CSO", "HOP", "IT"];

export const AddTeamMemberDialog = () => {
  const [email, setEmail] = React.useState("");
  const [branch, setBranch] = React.useState<BranchType | "">("");
  const [role, setRole] = React.useState<RoleType | "">("");
  const [open, setOpen] = React.useState(false); // control dialog open state

  const handleInvite = () => {
    toast.success("Invite sent successfully.");
    setOpen(false); // close dialog after success

    // Optionally reset form:
    setEmail("");
    setBranch("");
    setRole("");
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
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Select a branch" />
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

          <div className="grid gap-1">
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={(val) => setRole(val as RoleType)}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
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
          <Button onClick={handleInvite}>Send Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
