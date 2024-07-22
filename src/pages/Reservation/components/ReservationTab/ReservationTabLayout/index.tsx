import { Children, ReactNode } from "react";

import { ReservationLabel } from "@/pages/Reservation";
import { cn } from "@/utils/cn";

type PropsWithRequiredChildren<P = unknown> = P & {
  children: ReactNode;
};

interface LayoutProps extends PropsWithRequiredChildren {
  title: string;
  errorMessage?: string;
  type?: string;
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

const Bottom = ({ children, title, errorMessage }: LayoutProps) => (
  <div className="flex flex-col gap-2 px-12 py-4">
    <div className="flex gap-6">
      <ReservationLabel>{title}</ReservationLabel>
      {children ? (
        <div className="flex flex-1 justify-end gap-4 text-small font-light">
          <div className="flex flex-row items-center gap-2">
            <div className="bg-red-light h-2 w-2 rounded-full"></div>
            <div>예약 불가</div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="bg-yellow-light h-2 w-2 rounded-full"></div>
            <div>예약 진행 중</div>
          </div>
        </div>
      ) : (
        <div className="text-red-light text-small">{errorMessage}</div>
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
