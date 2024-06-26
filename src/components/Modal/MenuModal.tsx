import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import ModalLayout from "@/components/Layout/ModalLayout";
import { MYPAGE_MAIN_URL } from "@/constants/routes";

type MenuModalProps = {
  onClose: () => void;
};
const MenuModal = ({ onClose }: MenuModalProps) => {
  const navigate = useNavigate();

  return (
    <ModalLayout variant="sidebar" onClose={onClose}>
      {/* Close Section */}
      <div className="flex h-16 w-full flex-row items-center justify-end border-b border-gray-200 px-12 py-4 text-right shadow-sm md:px-20">
        <Button variant="icon" onClick={onClose}>
          <TfiClose size={20} />
        </Button>
      </div>

      {/* Button Section */}
      <Button
        variant="custom"
        onClick={() => alert("예약하기로 이동")}
        className="delay-50 h-14 w-full border-b border-gray-200 px-4 text-left text-gray-500 transition ease-in-out hover:bg-gray-300 hover:text-white"
      >
        예약하기
      </Button>
      <Button
        variant="custom"
        onClick={() => alert("통합 관리로 이동")}
        className="delay-50 h-14 w-full border-b border-gray-200 px-4 text-left text-gray-500 transition ease-in-out hover:bg-gray-300 hover:text-white"
      >
        통합 관리
      </Button>
      <Button
        variant="custom"
        onClick={() => {
          navigate(MYPAGE_MAIN_URL);
          onClose();
        }}
        className="delay-50 h-14 w-full border-b border-gray-200 px-4 text-left text-gray-500 transition ease-in-out hover:bg-gray-300 hover:text-white"
      >
        마이페이지
      </Button>
    </ModalLayout>
  );
};

export default MenuModal;
