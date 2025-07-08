import { useState } from "react";
import { Card, CardContent } from "components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { toast } from "sonner";

export function ChangePasswordButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleConfirm = () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmNewPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    // TODO: Implement password change API here
    // Example: await changePassword(form.oldPassword, form.newPassword);

    toast.success("Password has been changed successfully.");
    setDialogOpen(false);
    setForm({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 px-4">
          <div>
            <h1 className="font-semibold">Change Password</h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Click the button below to update your password.
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>Change Password</Button>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your old and new password below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <Input
              type="password"
              placeholder="Old Password"
              value={form.oldPassword}
              onChange={(e) =>
                setForm({ ...form, oldPassword: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="New Password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={form.confirmNewPassword}
              onChange={(e) =>
                setForm({ ...form, confirmNewPassword: e.target.value })
              }
            />
          </div>

          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm Change</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
