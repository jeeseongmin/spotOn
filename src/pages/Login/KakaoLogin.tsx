import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { login } from "@/apis/test";
import { LOGIN_SIGNUP_URL } from "@/constants/routes";

// kakao/callback
const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const accessCode = searchParams.get("code"); // 인가 코드

  const getAccessToken = async (_accessCode: string) => {
    const accessToken = await login(_accessCode);
    console.log("accessCode : ", accessToken);
  };

  useEffect(() => {
    if (accessCode) {
      window.sessionStorage.setItem("code", accessCode);
      console.log("code : ", accessCode);
      getAccessToken(accessCode);
      navigate(LOGIN_SIGNUP_URL);
    }
  }, [accessCode]);

  // 백엔드 api를 호출

  // axios.post("/backend/gettoken")

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
