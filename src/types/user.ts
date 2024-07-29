export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  community: string;
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
