import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { HOME_MAIN_URL, LOGIN_MAIN_URL } from "@/constants/routes";
import LoginLayout from "@/pages/Login/components/LoginLayout";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";
import { isValidLogin } from "@/utils/login";

declare global {
  interface Window {
    Kakao: any;
  }
}

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL;
const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

const LoginMain = () => {
  const navigate = useNavigate();
  const { kakaoToken, expiredAt, saveKakaoToken, saveSpotOnToken, saveTokenId } =
    useLoginStore();
  const { saveUserInfo } = useUserStore();

  useEffect(() => {
    // 데모 모드에서는 로그인 체크 안함
    if (!IS_DEMO_MODE) {
      loginCheck();
    }
  }, []);

  /**
   * 현재 가지고 있는 토큰의 유효성을 체크하는 함수
   */
  const loginCheck = async () => {
    const isValid = await isValidLogin(kakaoToken, expiredAt);
    if (isValid) {
      navigate(HOME_MAIN_URL);
    } else {
      navigate(LOGIN_MAIN_URL);
    }
  };

  useEffect(() => {
    // Initialize Kakao SDK (데모 모드가 아닐 때만)
    if (!IS_DEMO_MODE && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_JAVASCRIPT_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  // 데모 모드용 로그인 - API 호출 없이 바로 더미 데이터로 로그인
  const handleDemoLogin = () => {
    // 더미 유저 정보 (관리자)
    const demoUserInfo = {
      userName: "김온누리",
      telNo: "010-1234-5678",
      cpsCd: "PTK",
      cmtCd: "PTK_UNI",
      cmtNm: "대학청년부",
      garCd: "PTK_UNI_01",
      garNm: "1번 다락방",
      leafCd: "PTK_UNI_01_01",
      leafNm: "마태 1순",
      roleId: "ADMIN",
      userStateCode: "01",
    };

    saveUserInfo(demoUserInfo);
    saveKakaoToken("demo-token");
    saveSpotOnToken("demo-spoton-token");
    saveTokenId("1");
    navigate(HOME_MAIN_URL);
  };

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center gap-[31px]">
        <h1 className="text-[32px] font-bold">
          {IS_DEMO_MODE ? "Demo Mode" : "Kakao"}
        </h1>
        <div className="text-center text-[15px]">
          <p className="block lg:hidden">평택온누리교회 장소예약 시스템을</p>
          {IS_DEMO_MODE ? (
            <>
              <p>데모 모드로 실행 중입니다.</p>
              <p>아래 버튼을 클릭하여 체험해보세요.</p>
            </>
          ) : (
            <>
              <p>계정과 비밀번호 입력없이</p>
              <p>카카오톡으로 로그인 해보세요.</p>
            </>
          )}
        </div>
        {IS_DEMO_MODE ? (
          <Button variant="primary" onClick={handleDemoLogin}>
            데모 로그인 (관리자 계정)
          </Button>
        ) : (
          <Button variant="kakao" onClick={handleKakaoLogin}>
            카카오톡으로 로그인 / 회원가입
          </Button>
        )}
      </div>
    </LoginLayout>
  );
};

export default LoginMain;
