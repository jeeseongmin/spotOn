import { IoChatbubbleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { LOGIN_SIGNUP_URL } from "@/constants/routes";
import LoginLayout from "@/pages/Login/components/LoginLayout";

const LoginMain = () => {
  const KakaoButton = () => {
    return (
      <Link to={LOGIN_SIGNUP_URL}>
        <button className="flex w-full flex-row items-center justify-center gap-2 rounded-sm bg-yellow-300 py-3 font-bold">
          <span>
            <IoChatbubbleSharp size={20} />
          </span>
          카카오톡으로 로그인 / 회원가입
        </button>
      </Link>
    );
  };

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-bold">Kakao</h1>
        <div className="text-center">
          <p>계정과 비밀번호 입력없이</p>
          <p>카카오톡으로 로그인 해보세요.</p>
        </div>
        <div className="w-60 lg:w-72 xl:w-96 ">
          <KakaoButton />
        </div>
      </div>
    </LoginLayout>
  );
};

export default LoginMain;
