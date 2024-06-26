import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { LOGIN_SIGNUP_URL } from "@/constants/routes";
import LoginLayout from "@/pages/Login/components/LoginLayout";

const LoginMain = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate(LOGIN_SIGNUP_URL);
  };

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center gap-[31px]">
        <h1 className="text-[32px] font-bold">Kakao</h1>
        <div className="text-center text-[15px]">
          <p>계정과 비밀번호 입력없이</p>
          <p>카카오톡으로 로그인 해보세요.</p>
        </div>
        {/* <Button
          variant="kakao"
          onClick={onLogin}
          text="카카오톡으로 로그인 / 회원가입"
        /> */}
        <Button variant="kakao" onClick={onLogin}>
          카카오톡으로 로그인 / 회원가입
        </Button>
      </div>
    </LoginLayout>
  );
};

export default LoginMain;
