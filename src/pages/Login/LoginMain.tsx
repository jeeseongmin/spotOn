import { useEffect } from "react";

import Button from "@/components/Button";
import { KAKAO_AUTH_URL } from "@/constants/login";
import LoginLayout from "@/pages/Login/components/LoginLayout";

const LoginMain = () => {
  useEffect(() => {
    resetToken();
  }, []);

  const resetToken = () => {
    window.sessionStorage.setItem("token", "");
  };

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center gap-[31px]">
        <h1 className="text-[32px] font-bold">Kakao</h1>
        <div className="text-center text-[15px]">
          <p>계정과 비밀번호 입력없이</p>
          <p>카카오톡으로 로그인 해보세요.</p>
        </div>
        <Button variant="kakao">
          <a href={KAKAO_AUTH_URL}>카카오톡으로 로그인 / 회원가입</a>
        </Button>
      </div>
    </LoginLayout>
  );
};

export default LoginMain;
