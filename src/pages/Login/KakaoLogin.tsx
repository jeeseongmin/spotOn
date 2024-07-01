import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { login } from "@/apis/test";
import { LOGIN_SIGNUP_URL } from "@/constants/routes";

const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get("code"); // 인가 코드

  const getAccessCode = async (code: string) => {
    const accessCode = await login(code);
    console.log("accessCode : ", accessCode);
  };

  useEffect(() => {
    if (code) {
      window.sessionStorage.setItem("code", code);
      console.log("code : ", code);
      getAccessCode(code);
      navigate(LOGIN_SIGNUP_URL);
    }
  }, [code]);

  return (
    <div className="spinner">
      {/* <Image src={Spinner} alt="로딩중" /> */}
      <h2>
        잠시만 기다려 주세요!
        <br />
        로그인 중입니다.
      </h2>
    </div>
  );
};

export default KakaoLogin;
