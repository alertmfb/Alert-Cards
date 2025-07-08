import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import { Button } from "components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useState, type HTMLAttributes } from "react";
import { PasswordInput } from "components/custom/PasswordInput";
import { useAuth } from "~/hooks/useAuth";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
  // .regex(/[A-Z]/, {
  //   message: 'Password must contain at least one uppercase letter',
  // })
  // .regex(/[a-z]/, {
  //   message: 'Password must contain at least one lowercase letter',
  // })
  // .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  // .regex(/[!@#$%^&*(),.?":{}|<>]/, {
  //   message: 'Password must contain at least one special character',
  // }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  //   const signInMutation = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  // const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    login(data);
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            {/* <Button className="mt-2" type="submit">
              {signInMutation.isPending ? (
                <div className="h-4 w-4 animate-spin rounded-full border-b-2" />
              ) : (
                "Login"
              )}
            </Button> */}
            {/* Submit Button */}
            <Button className="mt-4" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
