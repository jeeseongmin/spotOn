import { Children } from "react";

import { ReservationLabel } from "@/pages/Reservation";
import { PropsWithRequiredChildren } from "@/types/common";
import { cn } from "@/utils/cn";

interface LayoutProps extends PropsWithRequiredChildren {
  title: string;
  errorMessage?: string;
  type?: string;
  isLabel?: boolean;
}

const Left = ({ children, title, type }: LayoutProps) => {
  const recurringStyle = "w-1/2";

  return (
    <div
      className={cn(
        `flex flex-col gap-2 border-r border-r-gray-middle px-12 py-4`,
        type === "recurring" && recurringStyle,
      )}
    >
      <ReservationLabel>{title}</ReservationLabel>
      {children}
    </div>
  );
};

const Right = ({ children, title, type }: LayoutProps) => {
  const generalStyle = "w-full";
  const recurringStyle = "w-1/2";

  return (
    <div
      className={`flex flex-col gap-2 px-8 py-4 ${type === "recurring" ? recurringStyle : generalStyle}`}
    >
      <ReservationLabel>{title}</ReservationLabel>
      {children}
    </div>
  );
};

const Bottom = ({
  children,
  title,
  errorMessage,
  isLabel = false,
}: LayoutProps) => (
  <div className="flex flex-col gap-2 px-12 py-4">
    <div className="flex gap-6">
      <ReservationLabel>{title}</ReservationLabel>
      {children ? (
        isLabel && (
          <div className="flex flex-1 justify-end gap-4 text-small font-light">
            <div className="flex flex-row items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-light"></div>
              <div>예약 불가</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-light"></div>
              <div>예약 진행 중</div>
            </div>
          </div>
        )
      ) : (
        <div className="text-small text-red-light">{errorMessage}</div>
      )}
    </div>
    {children}
  </div>
);

const ReservationTabLayout = ({ children }: PropsWithRequiredChildren) => {
  const [leftChildren, rightChildren, bottomChildren] =
    Children.toArray(children);

  return (
    <div>
      <div className="flex h-96 border-b border-b-gray-middle">
        {leftChildren}
        {rightChildren}
      </div>
      {bottomChildren}
    </div>
  );
};

ReservationTabLayout.Right = Right;
ReservationTabLayout.Left = Left;
ReservationTabLayout.Bottom = Bottom;

export default ReservationTabLayout;
