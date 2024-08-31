import { ComponentPropsWithoutRef } from "react";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

interface TableFilterButton extends ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}

const TableFilterButton = ({
  children,
  active = false,
  className,
  ...props
}: TableFilterButton) => {
  return (
    <Button
      variant="custom"
      className={cn(
        "relative w-12 break-keep rounded-sm border border-gray-middle bg-white p-0 text-black",
        active && "border-primary bg-primary font-light text-white",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default TableFilterButton;
