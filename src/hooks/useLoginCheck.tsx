import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { spotOnLogin } from "@/apis/login";
import { getUserInfo } from "@/apis/user";
import {
  HOME_MAIN_URL,
  LOGIN_QR_URL,
  LOGIN_SIGNUP_URL,
} from "@/constants/routes";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";

const useLoginCheck = (kakaoToken: string) => {
  const navigate = useNavigate();
  const { saveSpotOnToken, saveTokenId } = useLoginStore();
  const { saveUserInfo } = useUserStore();

  useEffect(() => {
    if (kakaoToken.length > 0) {
      loginCheck();
    }
  }, [kakaoToken]);

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

  return <div></div>;
};

export default useLoginCheck;
