import { ComponentPropsWithoutRef, forwardRef } from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const inputCSS = cva(
  "flex h-12 flex-row items-center justify-center rounded-sm px-3 text-sm",
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
  ({ variant, ...props }, ref) => {
    return <input ref={ref} className={cn(inputCSS({ variant }))} {...props} />;
  },
);

export default Input;