import { ComponentPropsWithoutRef } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { IconType } from "react-icons";

import { cn } from "@/utils/cn";

const tabItemCSS = cva("", {
  variants: {
    variant: {
      enclosed:
        "border-gray-middle bg-gray-light w-40 rounded-t-[5px] border border-b-0 py-2",
      underlined: "border-gray-middle text-gray-middle grow border-b-2 py-6",
      solid: "border-gray-middle rounded-sm border p-1.5",
    },
    active: {
      enclosed: "bg-white-dull",
      underlined: "border-gray-dark text-black",
      solid: "border-primary bg-primary",
    },
  },
});

export interface TabItemProps
  extends VariantProps<typeof tabItemCSS>,
    ComponentPropsWithoutRef<"button"> {
  label?: string;
  icon?: IconType;
  isActive?: boolean;
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
        isDisabled && "text-gray-middle",
        className,
      )}
      {...props}
    >
      {Icon ? (
        <Icon
          className={cn("text-gray-dark size-6", isActive && "text-white")}
        />
      ) : (
        label
      )}
    </button>
  );
};

export default TabItem;
