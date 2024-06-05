import { ComponentPropsWithoutRef } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { IconType } from "react-icons";

import { cn } from "@/utils/cn";

const tabItemCSS = cva("", {
  variants: {
    variant: {
      enclosed:
        "w-40 rounded-t-[5px] border border-b-0 border-gray-middle bg-gray-light py-2",
      underlined: "grow border-b-2 border-gray-middle py-6 text-gray-middle",
      solid: "rounded-sm border border-gray-middle p-1.5",
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
      type="button"
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
          className={cn("size-6 text-gray-dark", isActive && "text-white")}
        />
      ) : (
        label
      )}
    </button>
  );
};

export default TabItem;
