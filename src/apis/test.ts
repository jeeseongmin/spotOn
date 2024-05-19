import axios from "axios";

import { METHOD, doFetch } from "@/lib/api/helper";

axios.defaults.baseURL = "http://talkingclass.iptime.org:9000";
axios.defaults.withCredentials = true;

// Kakao login 후에 유저 정보에 token 값을 담아 서버에 호출
export async function login(token: string) {
  try {
    const res = await doFetch(METHOD.POST, "/user-service/login", {
      email: "1@gmail.com",
      password: "test1234!",
      provider: "email",
      token,
    });

    return res;
  } catch (e) {
    console.log(e);
  }
}
