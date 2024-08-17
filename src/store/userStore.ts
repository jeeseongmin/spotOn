import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserAction, UserState } from "@/types/store/userStore";

const initialState: UserState = {
  cmtCd: "", // 공동체명
  cpsCd: "", // 캠퍼스명
  garCd: "", // 다락방명
  leafCd: "", // 순명
  roleId: "", // 역할명
  telNo: "", // 전화번호
  userName: "", // 사용자 이름
};

const useUserStore = create(
  persist<UserState & UserAction>(
    set => ({
      ...initialState,
      saveUserInfo: (userInfo: UserState) =>
        set({
          cmtCd: userInfo.cmtCd, // 공동체명
          cpsCd: userInfo.cpsCd, // 캠퍼스명
          garCd: userInfo.garCd, // 다락방명
          leafCd: userInfo.leafCd, // 순명
          roleId: userInfo.roleId, // 역할명
          telNo: userInfo.telNo, // 전화번호
          userName: userInfo.userName, // 사용자 이름
        }),
      resetUserInfo: () =>
        set({
          cmtCd: "",
          cpsCd: "",
          garCd: "",
          leafCd: "",
          roleId: "",
          telNo: "",
          userName: "",
        }),
    }),
    {
      name: "userStorage",
    },
  ),
);

export default useUserStore;
