// 예약 요청 시 request Type
export type ReservationRequest = {
  useCnts: string; // 사용 목적
  cpsCd: string; // 캠퍼스 별 code : "PTK"로 고정
  bldCd: string; // 빌딩 별 code : "PTK_PTK"로 고정
  plcCd: string; // 장소 별 code
  rsvtDt: string; // 예약 일자 : format("YYYYMMDD")
  startTime: string; // 시작 시간 : format("hhmmss");
  endTime: string; // 종료 시간 : format("hhmmss");
  mbrId: string; // 멤버 ID
};

// 예약 요청 시 response Type
export type ReservationResponse = {
  rsvtId: number; // 1;
  useCnts: string; // "마태1순 순모임";
  cpsCd: string; // "PTK";
  bldCd: string; // "PTK_PTK";
  plcCd: string; // "PTK_PTK_0303";
  rsvtDt: string; // "20240907";
  startTime: string; // "190000";
  endTime: string; // "210000";
  mbrId: string; // "11";
  sttId: string; // "예약완료";
  crtId: string; // "11";
  crDt: string; // "2024-07-20T06:15:57";
  updId: string; // "11";
  updDt: string; // "2024-07-20T06:15:57";
};