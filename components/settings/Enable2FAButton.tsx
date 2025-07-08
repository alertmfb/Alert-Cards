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

export function Enable2FAButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    password: "",
    code: "",
  });

  const handleConfirm = () => {
    if (!form.password || !form.code) {
      toast.error("Both fields are required.");
      return;
    }

    // TODO: Implement actual 2FA enabling API here
    // Example: await enable2FA(form.password, form.code);

    toast.success("Two-Factor Authentication enabled successfully.");
    setDialogOpen(false);
    setForm({ password: "", code: "" });
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 px-4">
          <div>
            <h1 className="font-semibold">Two-Factor Authentication (2FA)</h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Enhance account security by enabling two-factor authentication.
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>Enable 2FA</Button>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter your password and 2FA code from your authenticator app.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Input
              type="text"
              placeholder="6-digit 2FA Code"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
          </div>

          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm Enable</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
