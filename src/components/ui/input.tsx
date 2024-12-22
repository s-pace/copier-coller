import clsx from "clsx";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  preventSpace?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, preventSpace = false, type, ...props }, ref) => {
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === " ") {
        e.preventDefault(); // Prevent space from being typed
      }
    };

    return (
      <input
        type={type}
        className={clsx(
          className,
          type !== "file" && "pl-4",
          "bg-backgroundtext-sm flex h-10 w-full rounded-md border border-input ring-offset-background file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-lost file:px-4 file:py-2 file:text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        )}
        onKeyDown={preventSpace ? handleKeyDown : undefined}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
