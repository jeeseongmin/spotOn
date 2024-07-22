import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchAccessToken, login } from "@/apis/login";
import {
  HOME_MAIN_URL,
  LOGIN_QR_URL,
  LOGIN_SIGNUP_URL,
} from "@/constants/routes";

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
    }
  };

  const loginCheck = async () => {
    // 추후 api에서 token 값 전달받을 예정
    const { status, token } = await login(accessToken);
    // 회원가입이 안된 경우
    if (status === 412) {
      navigate(LOGIN_SIGNUP_URL, { state: accessToken });
    }
    // 회원가입이 된 경우 && 승인이 된 경우
    else if (status === 200) {
      navigate(HOME_MAIN_URL);
    }
    // 회원가입이 된 경우 && 승인이 안된 경우
    else if (status === 400) {
      navigate(LOGIN_QR_URL);
    }
    // provider가 유효하지 않은 경우
    else if (status === 1000) {
      // 집사님께 요청드려야 함.
    }
    // 토큰이 유효하지 않은 경우
    else if (status === 403) {
      // 에러 창 필요
    }
  };

  return <div className="spinner">{/* spinner 추가 예정 (로딩창)  */}</div>;
};

export default KakaoLogin;
