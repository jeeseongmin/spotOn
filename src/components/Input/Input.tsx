import { ComponentPropsWithoutRef, forwardRef } from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const inputCSS = cva(
  "disabled:text-gray-black flex flex-row items-center justify-center rounded-sm border border-gray-dull px-3 py-2.5 text-sm font-light text-black placeholder:text-gray-middle disabled:bg-white-dull disabled:font-light",
  {
    variants: {
      variant: {
        default: "",
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
