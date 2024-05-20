import {
  Children,
  ComponentPropsWithRef,
  ReactElement,
  cloneElement,
  useMemo,
  useState,
} from "react";

import { VariantProps, cva } from "class-variance-authority";

import TabItem, { TabItemProps } from "@/components/Tab/TabItem";
import { cn } from "@/utils/cn";

const tabContentCSS = cva("w-full text-base text-black", {
  variants: {
    variant: {
      enclosed: "rounded-sm border border-gray-middle bg-white-dull shadow",
      underlined: "",
      solid: "",
    },
  },
});

interface TabProps
  extends VariantProps<typeof tabContentCSS>,
    ComponentPropsWithRef<"div"> {}

/**
 *  className을 지정하여 Tab Content 영역 스타일을 변경할 수 있습니다.
 */

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
