import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { login } from "@/apis/test";
import { LOGIN_SIGNUP_URL } from "@/constants/routes";

const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("code");

  const getAccessToken = async (token: string) => {
    const accessToken = await login(token);
    console.log("accessToken : ", accessToken);
  };

  useEffect(() => {
    if (token) {
      window.sessionStorage.setItem("token", token);
      getAccessToken(token);
      navigate(LOGIN_SIGNUP_URL);
    }
  }, [token]);

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
