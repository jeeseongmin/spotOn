import { PropsWithChildren } from "react";

import { AiOutlineClose } from "react-icons/ai";

import Button from "@/components/Button";
import ModalLayout from "@/components/Layout/ModalLayout";

interface ConfirmModalProps extends PropsWithChildren {
  onClose: () => void;
}

const ConfirmModal = ({ children, onClose }: ConfirmModalProps) => {
  return (
    <ModalLayout variant="primary" onClose={onClose}>
      <div className="flex h-56 w-96 flex-col items-center justify-between px-8 py-6">
        <div className="flex w-full flex-row justify-end">
          <Button variant="icon">
            <AiOutlineClose size={22} onClick={onClose} />
          </Button>
        </div>
        <p className="text-xl text-blue-800">{children}</p>
        <Button variant="primary" onClick={onClose}>
          확인
        </Button>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
