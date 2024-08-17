import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchKakaoToken, spotOnLogin } from "@/apis/login";
import { getUserInfo } from "@/apis/user";
import {
  HOME_MAIN_URL,
  LOGIN_QR_URL,
  LOGIN_SIGNUP_URL,
} from "@/constants/routes";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";

// /kakao/auth
const KakaoLogin = () => {
  const { saveKakaoToken, saveSpotOnToken, saveTokenId } = useLoginStore();
  const { saveUserInfo } = useUserStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [kakaoToken, setKakaoToken] = useState("");

  useEffect(() => {
    getAccessCode();
  }, []);

  useEffect(() => {
    if (accessCode.length > 0) {
      getKakaoToken(accessCode);
    }
  }, [accessCode]);

  useEffect(() => {
    if (kakaoToken.length > 0) {
      loginCheck();
    }
  }, [kakaoToken]);

  const getAccessCode = () => {
    const code = searchParams.get("code");
    if (code && code.length > 0) {
      setAccessCode(code);
    }
  };

  /* Access Code로 Access Token 받아오는 Kakao  API */
  const getKakaoToken = async (code: string) => {
    const token = await fetchKakaoToken(code);

    if (token) {
      saveKakaoToken(token);
      setKakaoToken(token);
    }
  };

  /** 카카오 로그인이 된 이후에 spotOn 로그인 시도 */
  const loginCheck = async () => {
    // 추후 api에서 token 값 전달받을 예정
    const { status, token, tokenId } = await spotOnLogin(kakaoToken);

    // 회원가입이 안된 경우
    if (status === 412) {
      navigate(LOGIN_SIGNUP_URL, { state: kakaoToken });
    }
    // 회원가입이 된 경우 && 승인이 된 경우
    else if (status === 200) {
      const info = await getUserInfo(tokenId);
      saveSpotOnToken(token);
      saveTokenId(tokenId);
      saveUserInfo(info);
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
