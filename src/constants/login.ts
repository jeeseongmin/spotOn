import { FULL_REDIRECT_URL } from "@/constants/routes";

export const CLIENT_SECRET = "DJ3kdhVtRgFI3eM6TUE6of9WgzywL2Li";
export const CLIENT_ID = "ccecd1926b0cbc34014b07b46c03c29f";
// export const CLIENT_ID = "e05635b747b782eb822c4987aa5bcd7a";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${FULL_REDIRECT_URL}&response_type=code`;
