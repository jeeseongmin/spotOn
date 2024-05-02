import { HiUserCircle } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button";
import { MYPAGE_MAIN_URL } from "@/constants/routes";

type HeaderProps = {
  onOpen: () => void;
};

const Header = ({ onOpen }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <nav className="flex h-16 flex-row items-center justify-between border-b border-gray-200 px-12 shadow-sm md:px-20 lg:px-32 xl:px-60 2xl:px-96">
      <Button variant="custom">
        <img src={Logo} className="h-10 w-10 object-contain" />
      </Button>

      <div className="hidden flex-row items-center gap-10 md:flex">
        <Button
          variant="custom"
          className="text-gray-500"
          onClick={() => alert("예약하기로 이동")}
        >
          예약하기
        </Button>
        <Button
          variant="custom"
          className="text-gray-500"
          onClick={() => alert("통합관리로 이동")}
        >
          통합관리
        </Button>
        <Button
          variant="custom"
          className="text-gray-400"
          onClick={() => navigate(MYPAGE_MAIN_URL)}
        >
          <HiUserCircle size={40} />
        </Button>
      </div>

      <div className="flex md:hidden">
        <Button variant="custom" onClick={onOpen}>
          <RxHamburgerMenu size={26} />
        </Button>
      </div>
    </nav>
  );
};

export default Header;
