import { HiUserCircle } from "react-icons/hi2";

import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button";

const Header = () => {
  return (
    <nav className="flex h-16 flex-row items-center justify-between border-b border-gray-200 px-60 shadow-sm">
      <img src={Logo} className="h-10 object-contain" />

      <div className="flex flex-row items-center gap-10">
        <Button variant="menu" onClick={() => alert("예약하기로 이동")}>
          예약하기
        </Button>
        <Button variant="menu" onClick={() => alert("통합관리로 이동")}>
          통합관리
        </Button>
        <Button
          variant="menu"
          className="text-gray-400"
          onClick={() => alert("마이페이지로 이동")}
        >
          <HiUserCircle size={40} />
        </Button>
      </div>
    </nav>
  );
};

export default Header;
