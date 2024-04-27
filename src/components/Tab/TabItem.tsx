import { ComponentPropsWithoutRef } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { IconType } from "react-icons";

import { cn } from "@/utils/cn";

const tabItemCSS = cva("", {
  variants: {
    variant: {
      enclosed:
        "w-40 rounded-t-[5px] border border-b-0 border-[#CCCCCC] bg-[#F2F2F2] py-2",
      underlined: "grow border-b-2 border-[#CCCCCC] py-6 text-[#CCCCCC]",
      solid: "rounded-sm border border-[#CCCCCC] p-1.5",
    },
    active: {
      enclosed: "bg-[#F9F9F9]",
      underlined: "border-[#616161] text-black",
      solid: "border-[#06367A] bg-[#06367A]",
    },
  },
});

export interface TabItemProps
  extends VariantProps<typeof tabItemCSS>,
    ComponentPropsWithoutRef<"button"> {
  label?: string;
  icon?: IconType;
  isActive?: boolean;
  isDisabled?: boolean;
}

const TabItem = ({
  variant,
  label = "",
  icon,
  isActive = false,
  className,
  ...props
}: TabItemProps) => {
  const Icon = icon;
  const { disabled: isDisabled } = props;

  return (
    <button
      className={cn(
        tabItemCSS({ variant }),
        isActive && tabItemCSS({ active: variant }),
        isDisabled && "text-[#CCCCCC]",
        className,
      )}
      {...props}
    >
      {Icon ? (
        <Icon
          className={cn("size-6 text-[#616161]", isActive && "text-white")}
        />
      ) : (
        label
      )}
    </button>
  );
};

export default TabItem;
