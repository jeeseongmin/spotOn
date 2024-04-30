import { PropsWithChildren } from "react";

import { AiOutlineClose } from "react-icons/ai";

import Button from "@/components/Button";
import ModalLayout from "@/components/Layout/ModalLayout";

interface ConfirmModalProps extends PropsWithChildren {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({
  children,
  title,
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  return (
    <ModalLayout variant="primary" onClose={onClose}>
      <div className="flex h-60 w-96 flex-col items-center justify-between px-8 py-6">
        <div className="flex w-full flex-row justify-end">
          <Button variant="icon">
            <AiOutlineClose size={22} onClick={onClose} />
          </Button>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-xl text-blue-800">{title}</p>
          <p>{children}</p>
        </div>

        <div className="flex flex-row gap-4">
          <Button variant="outlined" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
