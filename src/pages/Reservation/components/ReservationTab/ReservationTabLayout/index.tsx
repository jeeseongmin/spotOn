import { Children, ReactNode } from "react";

import { ReservationLabel } from "@/pages/Reservation";

type PropsWithRequiredChildren<P = unknown> = P & {
  children: ReactNode;
};

interface LayoutProps extends PropsWithRequiredChildren {
  title: string;
  errorMessage?: string;
}

const Left = ({ children, title }: LayoutProps) => (
  <div className="flex flex-col gap-2 border-r border-r-gray-middle px-12 py-4">
    <ReservationLabel>{title}</ReservationLabel>
    {children}
  </div>
);

const Right = ({ children, title }: LayoutProps) => (
  <div className="flex w-full flex-col gap-2 px-8 py-4">
    <ReservationLabel>{title}</ReservationLabel>
    {children}
  </div>
);

const Bottom = ({ children, title, errorMessage }: LayoutProps) => (
  <div className="flex flex-col gap-2 px-12 py-4">
    <div className="flex gap-6">
      <ReservationLabel>{title}</ReservationLabel>
      <div className="text-small text-red-light">{errorMessage}</div>
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
