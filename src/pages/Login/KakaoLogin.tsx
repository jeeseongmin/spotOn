import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

import { LOGIN_SIGNUP_URL } from "@/constants/routes";

// kakao/callback
const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getAccessCode();
    navigate(LOGIN_SIGNUP_URL);
  }, []);

  useEffect(() => {
    if (accessCode.length > 0) getAccessToken(accessCode);
  }, [accessCode]);

  useEffect(() => {
    if (accessToken.length > 0) {
      getKakaoUser();
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
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_REST_API_KEY,
            redirect_uri: import.meta.env.VITE_REDIRECT_URL,
            client_secret: import.meta.env.VITE_CLIENT_SECRET_KEY,
            code,
          },
          headers: {
            "Content-type": "application/x-www-form-unlencoded;charset=utf-8",
          },
        },
      );
      if (res.data.access_token) {
        setAccessToken(res.data.access_token);
        console.log("token : ", res.data.access_token);
      }

      return res;
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const getKakaoUser = async () => {
    try {
      const res = await axios.post(
        "https://kapi.kakao.com/v2/user/me",
        {
          property_key: ["properties.nickname", "kakao_account.email"],
        },
        {
          headers: {
            "Content-type": "application/x-www-form-unlencoded;charset=utf-8",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log("res : ", res);
      return res;
    } catch (error) {
      console.error("Error : ", error);
    }
  };

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
