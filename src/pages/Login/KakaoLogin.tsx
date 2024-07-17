import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchAccessToken, login } from "@/apis/login";
import { HOME_MAIN_URL, LOGIN_SIGNUP_URL } from "@/constants/routes";

// kakao/callback
const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getAccessCode();
  }, []);

  useEffect(() => {
    if (accessCode.length > 0) {
      getAccessToken(accessCode);
    }
  }, [accessCode]);

  useEffect(() => {
    if (accessToken.length > 0) {
      loginCheck();
    }
  }, [accessToken]);

  const getAccessCode = () => {
    const code = searchParams.get("code");
    if (code && code.length > 0) {
      setAccessCode(code);
    }
  };

  /* Access Code로 Access Token 받아오는 Kakao  API */
  const getAccessToken = async (code: string) => {
    const accessToken = await fetchAccessToken(code);

    if (accessToken) {
      setAccessToken(accessToken);
      console.log("token : ", accessToken);
    }
  };

  const loginCheck = async () => {
    const status = await login(accessToken);
    if (status === 412) {
      navigate(LOGIN_SIGNUP_URL, { state: accessToken });
    } else if (status === 200) {
      // 승인 여부 isConfirm이 들어가야하는데, 현재는 일단 무조건 승인된 것으로
      navigate(HOME_MAIN_URL);
    }
  };

  return (
    <div className="spinner">
      <h2>
        잠시만 기다려 주세요!
        <br />
        로그인 중입니다.
      </h2>
    </div>
  );
};

export default KakaoLogin;
