import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export function ForgotPasswordForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    toast.success("Reset link sent to your email.");
    /* TODO: call backend to send OTP email */

    // pass the email to the OTP page via router state
    setTimeout(() => {
      navigate("/forgot-password-otp", { state: { email: values.email } });
    }, 800);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-10">
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
}
