import { Children, ComponentPropsWithoutRef, ReactNode } from "react";

import ModalLayout from "@/components/Layout/ModalLayout";
import { cn } from "@/utils/cn";

type PropsWithRequiredChildren<P = unknown> = P & {
  children: ReactNode;
};

interface ModalContentProps extends ComponentPropsWithoutRef<"div"> {}

interface ReservationModalProps extends PropsWithRequiredChildren {
  onClose: () => void;
}

const Header = ({ children }: PropsWithRequiredChildren) => (
  <div className="flex h-32 flex-col justify-center gap-2 rounded-sm bg-primary px-8 text-xl font-light text-white">
    {children}
  </div>
);

const Content = ({ children, className }: ModalContentProps) => (
  <div className={cn("p-4", className)}>{children}</div>
);

const Footer = ({ children }: PropsWithRequiredChildren) => (
  <div className="flex items-center justify-center gap-4 pb-8">{children}</div>
);

const ReservationModal = ({ children, onClose }: ReservationModalProps) => {
  const [headerChildren, contentChildren, footerChildren] =
    Children.toArray(children);

  return (
    <ModalLayout variant="primary" onClose={onClose}>
      <div className="w-[507px]">
        {headerChildren}
        {contentChildren}
        {footerChildren}
      </div>
    </ModalLayout>
  );
};

ReservationModal.Header = Header;
ReservationModal.Content = Content;
ReservationModal.Footer = Footer;

export default ReservationModal;
