export type UserState = {
  cmtCd: string; // 공동체명
  cpsCd: string; // 캠퍼스명
  email?: string; // 이메일
  garCd: string; // 다락방명
  leafCd: string; // 순명
  roleId: string; // 역할명
  telNo: string; // 전화번호
  userName: string; // 사용자 이름
};

export type UserAction = {
  saveUserInfo: (userInfo: UserState) => void;
  resetUserInfo: () => void;
};
