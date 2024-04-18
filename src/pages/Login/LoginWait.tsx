import { useNavigate } from "react-router-dom";

import qr from "@/assets/images/qr.png";
import Button from "@/components/Button";
import LoginLayout from "@/pages/Login/components/LoginLayout";

const LoginWait = () => {
  const navigate = useNavigate();

  return (
    <LoginLayout>
      <div className="flex h-full flex-col items-center justify-between py-20">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-2xl font-bold">회원가입 승인 대기 중</h1>
          <div className="flex flex-col">
            <span>회원가입 승인요청 중입니다.</span>
            <span>승인 완료까지 1~3일 소요될 수 있습니다.</span>
          </div>
        </div>
        <div>
          <img src={qr} />
        </div>
        <p>승인 관련 문의는 평택온누리 카카오 채널을 이용해주세요.</p>
        <Button
          onClick={() => {
            navigate("/login/main");
          }}
          variant="primary"
        >
          뒤로가기
        </Button>
      </div>
    </LoginLayout>
  );
};

export default LoginWait;
