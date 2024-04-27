import {
  Children,
  ComponentPropsWithRef,
  ReactElement,
  cloneElement,
  useMemo,
  useState,
} from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import TabItem, { TabItemProps } from "./TabItem";

const tabContentCSS = cva("w-full text-base text-black", {
  variants: {
    variant: {
      enclosed: "border-gray-middle bg-white-dull rounded-sm border shadow",
      underlined: "",
      solid: "",
    },
  },
});

interface TabProps
  extends VariantProps<typeof tabContentCSS>,
    ComponentPropsWithRef<"div"> {}

const Tab = ({ children, className, ...props }: TabProps) => {
  const { variant } = props;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const items = useMemo(
    () =>
      Children.map(children as ReactElement<TabItemProps>[], (child, index) =>
        cloneElement(child, {
          ...child.props,
          variant,
          isActive: index === activeTabIndex,
          onClick: () => setActiveTabIndex(index),
        }),
      ),
    [children, activeTabIndex, variant],
  );

  const activeContent = items[activeTabIndex].props.children;

  return (
    <div className="w-full">
      <div className={cn("flex", variant === "solid" && "gap-2")}>{items}</div>
      <div className={cn(tabContentCSS({ variant }), className)}>
        {activeContent}
      </div>
    </div>
  );
};

Tab.Item = TabItem;

export default Tab;
