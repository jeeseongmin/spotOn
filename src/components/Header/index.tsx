import { HiUserCircle } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button";
import {
  ADMIN_MAIN_URL,
  HOME_MAIN_URL,
  MYPAGE_MAIN_URL,
  RESERVATION_MAIN_URL,
} from "@/constants/routes";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";

type HeaderProps = {
  onOpen: () => void;
};

const Header = ({ onOpen }: HeaderProps) => {
  const navigate = useNavigate();

  const { logout } = useLoginStore();
  const { resetUserInfo } = useUserStore();

  const spotOnLogout = () => {
    // 나중에 팝업 만들기
    alert("로그아웃됩니다.");
    // 유저 정보 지우기
    resetUserInfo();
    // 서비스 로그아웃
    logout();
  };

  return (
    <nav className="flex h-20 flex-row items-center justify-between border-b border-gray-middle px-12 shadow-sm md:px-20 lg:px-32 xl:px-60 2xl:px-96">
      <Button
        variant="custom"
        className="h-[45px] w-[96px]"
        onClick={() => navigate(HOME_MAIN_URL)}
      >
        <img src={Logo} className="h-full w-full object-contain" />
      </Button>

      <div className="hidden flex-row items-center gap-10 md:flex">
        <Button
          variant="custom"
          className="text-gray-500"
          onClick={() => navigate(RESERVATION_MAIN_URL)}
        >
          예약하기
        </Button>
        <Button
          variant="custom"
          className="text-gray-500"
          onClick={() => navigate(ADMIN_MAIN_URL)}
        >
          통합관리
        </Button>
        <Button
          variant="custom"
          className="text-gray-500"
          onClick={() => spotOnLogout()}
        >
          로그아웃
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
