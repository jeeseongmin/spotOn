export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  community: string;
}

export type UserResponse = {
  cmtCd: string;
  cmtNm: string;
  cpsCd: string;
  createdDate: string;
  email: string;
  garCd: string;
  garNm: string;
  lastLoginDate: string;
  laefCd: string;
  leafNm: string;
  loginFailCount: number;
  roleId: string;
  roleName: string;
  telNo: string;
  userId: string;
  userName: string;
  userStateCode: string;
  userStateCodeName: string;
};

/**
 * 사용자 상태 코드
 *
 * 00: 대기
 * 01: 정상
 * 07: 정지
 * 08: 탈퇴
 * 09: 삭제
 */
export type UserStateCode = "00" | "01" | "07" | "08" | "09";
export interface UserStateRequest {
  userId: string;
  userStateCode: string;
}

export interface UserByState
  extends Omit<UserResponse, "bldCd" | "crtId" | "crDt" | "updId" | "updDt"> {
  userName: string;
  telNo: string;
  cmtCd: string;
  cmtNm: string;
  garCd: string;
  garNm: string;
  leafCd: string;
  leafNm: string;
}
