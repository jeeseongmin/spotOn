import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import LoginLayout from "@/pages/Login/components/LoginLayout";

const LoginMain = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login/signup");
  };

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-bold">Kakao</h1>
        <div className="text-center">
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
