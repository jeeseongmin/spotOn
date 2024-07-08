import axios from "axios";

import { CLIENT_ID } from "@/constants/login";
import { METHOD, doFetch } from "@/lib/api/helper";

axios.defaults.withCredentials = true;

// Kakao login 후에 유저 정보에 코드 값을 담아 서버에 호출
export async function login(code: string) {
  try {
    const res = await doFetch(
      METHOD.POST,
      "http://localhost:8000/user-service/login",
      {
        email: "1@gmail.com",
        password: "test1234!",
        // provider: "email",
        provider: "kakao",
        token: code,
      },
    );

    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function getToken(code: string) {
  try {
    const res = await doFetch(
      METHOD.POST,
      "http://localhost:8000/user-service/api/v1/users/kakaoAccessToken",
      {
        accessCode: code,
        clientId: CLIENT_ID,
        redirectUri: "",
      },
    );

    return res;
  } catch (e) {
    console.log(e);
  }
}
