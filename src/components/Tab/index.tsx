import {
  Children,
  ComponentPropsWithRef,
  ReactElement,
  cloneElement,
  useMemo,
} from "react";

import { VariantProps, cva } from "class-variance-authority";
import { useSearchParams } from "react-router-dom";

import TabItem, { type TabItemProps } from "@/components/Tab/TabItem";
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
    ComponentPropsWithRef<"div"> {
  querystringKey?: string;
}

/**
 *  className을 지정하여 Tab Content 영역 스타일을 변경할 수 있습니다.
 *
 *  Tab을 중첩된 구조로 사용할 경우 내부 Tab에 "tab"이 아닌 값으로 querystringKey을 지정해야 합니다.
 */

const Tab = ({
  children,
  className,
  querystringKey = "tab",
  ...props
}: TabProps) => {
  const { variant } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabIndex = Number(searchParams.get(querystringKey)) || 0;

  const items = useMemo(
    () =>
      Children.map(children as ReactElement<TabItemProps>[], (child, index) =>
        cloneElement(child, {
          ...child.props,
          variant,
          isActive: index === activeTabIndex,
          onClick: () => {
            setSearchParams(
              { [querystringKey]: String(index) },
              { replace: true },
            );
          },
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
