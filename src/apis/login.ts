import axios from "axios";

/**
 *
 * @param accessCode 카카오 로그인을 통해 얻어온 accessCode
 * @returns
 * 카카오 로그인 정보를 다룰 수 있는 accessToken return
 */
export const fetchAccessToken = async (accessCode: string) => {
  try {
    const res = await axios.post("/kauth/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_REST_API_KEY,
        redirect_uri: import.meta.env.VITE_REDIRECT_URL,
        client_secret: import.meta.env.VITE_CLIENT_SECRET_KEY,
        code: accessCode,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    });

    return res.data.access_token;
  } catch (error) {
    console.error("Error : ", error);
  }
};

/**
 *
 * @param accessToken 카카오 로그인을 통해 얻은 accessCode로 발급받은 accessToken
 * @returns
 * 1. 회원가입이 안되어있는 경우 412 (error) return
 * 2. 회원가입이 되어있는 경우 200 (success) return
 * 3. 회원가입이 되어있는 경우 + 승인 여부 관련 플래그가 추가되어야 함
 */
export const login = async (accessToken: string) => {
  try {
    const res = await axios.post("/talkingclass/user-service/login", {
      email: "1@gmail.com", // 의미없는 email 값
      password: "test1234!", // 의미없는 password 값
      provider: "kakao",
      token: accessToken,
    });

    return { status: res.status, token: res.headers["access-token"] };
  } catch (error: unknown) {
    console.log("error : ", error);
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response?.status;

      return { status };
    }
  }
};

type JoinRequestParam = {
  token: string;
  provider: string;
  userName: string;
  telNo: string;
  cpsCD: string;
  cmtCD: string;
  garCD: string;
  leafCD: string;
};

/**
 * 회원가입
 */
export const join = async (joinInfo: JoinRequestParam) => {
  const res = await axios.post(
    "/talkingclass/user-service/api/v1/users/join",
    joinInfo,
  );

  return res.data;
};
