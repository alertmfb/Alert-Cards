import * as React from "react";
import { cn } from "~/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Fix browser autofill styling to match your design system
        "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_oklch(1_0_0)] [&:-webkit-autofill]:[-webkit-text-fill-color:oklch(0.145_0_0)]",
        "[&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_oklch(1_0_0)] [&:-webkit-autofill:hover]:[-webkit-text-fill-color:oklch(0.145_0_0)]",
        "[&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_oklch(1_0_0)] [&:-webkit-autofill:focus]:[-webkit-text-fill-color:oklch(0.145_0_0)]",
        "dark:[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_oklch(0.205_0_0)] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:oklch(0.985_0_0)]",
        "dark:[&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_oklch(0.205_0_0)] dark:[&:-webkit-autofill:hover]:[-webkit-text-fill-color:oklch(0.985_0_0)]",
        "dark:[&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_oklch(0.205_0_0)] dark:[&:-webkit-autofill:focus]:[-webkit-text-fill-color:oklch(0.985_0_0)]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
