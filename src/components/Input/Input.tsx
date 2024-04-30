import { ComponentPropsWithoutRef, forwardRef } from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const inputCSS = cva(
  "flex h-12 flex-row items-center justify-center rounded-sm px-3 text-sm disabled:bg-gray-200",
  {
    variants: {
      variant: {
        default: "border border-gray-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type InputProps = ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof inputCSS>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputCSS({ variant }), className)}
        {...props}
      />
    );
  },
);

export default Input;
