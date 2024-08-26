export interface User {
  id: string;
  userName: string;
  telNo: string;
  cmtNm: string;
  garNm: string;
  leafNm: string;
  cmtCd: string;
  garCd: string;
  leafCd: string;
}

/**
 * 사용자 상태 코드
 *
 * 00: 대기
 * 01: 정상
 * 07: 정지
 * 08: 탈퇴
 * 09: 삭제
 */
export interface UserStateRequest {
  userId: string;
  userStateCode: "00" | "01" | "07" | "08" | "09";
}
