import { ComponentProps } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { BsPlusLg } from "react-icons/bs";

import { cn } from "@/utils/cn";

const buttonCSS = cva("rounded-sm px-3 py-2 shadow-md", {
  variants: {
    variant: {
      primary:
        "cursor-pointer bg-blue-900 font-light text-white disabled:bg-gray-200 disabled:font-normal disabled:text-gray-400",
      outlined:
        "border border-gray-300 bg-white font-normal text-gray-800 disabled:bg-gray-200 disabled:font-normal disabled:text-gray-400",
      underlined:
        "font-normal underline underline-offset-8 shadow-none disabled:font-normal disabled:text-gray-400", // underline의 경우 custom으로 색상 조정하기
      add: "flex flex-row items-center gap-1.5 border border-blue-900 bg-white font-normal text-blue-900 disabled:border-gray-300 disabled:bg-gray-200 disabled:font-normal disabled:text-gray-400",
    },
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonCSS> {
  text: string;
}

const Button = ({ variant, type, className, text, ...props }: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      className={cn(buttonCSS({ variant }), className)}
      {...props}
    >
      {variant === "add" && (
        <span className="">
          <BsPlusLg size={20} />
        </span>
      )}
      {text}
    </button>
  );
};

export default Button;