
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const hardcoreButtonVariants = cva(
  "group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-cyber-indigo font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-hardcore-pink focus:ring-offset-2 focus:ring-offset-deep-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        default: "px-8 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface HardcoreButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof hardcoreButtonVariants> {
  children: React.ReactNode;
}

const HardcoreButton = React.forwardRef<HTMLButtonElement, HardcoreButtonProps>(
  ({ children, className, size, ...props }, ref) => {
    return (
      <button
        className={cn(hardcoreButtonVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        <span className="absolute -inset-full top-0 block -translate-x-full -skew-x-12 transform bg-hardcore-pink transition-all duration-500 group-hover:translate-x-0 group-hover:skew-x-0" />
        <span className="relative flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
HardcoreButton.displayName = "HardcoreButton";

export default HardcoreButton;
