import dayjs from "dayjs";
import { ptonnuriPlace, ptonnuriPlaceByFloor } from "@/dummy/places";

// 데모 모드 체크
export const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

// 더미 유저 데이터
export const demoUsers = [
  {
    cmtCd: "PTK_UNI",
    cpsCd: "PTK",
    garCd: "PTK_UNI_01",
    leafCd: "PTK_UNI_01_01",
    cmtNm: "대학청년부",
    garNm: "1번 다락방",
    leafNm: "마태 1순",
    roleId: "ADMIN",
    userStateCode: "01",
    telNo: "010-1234-5678",
    userName: "김온누리",
  },
  {
    cmtCd: "PTK_UNI",
    cpsCd: "PTK",
    garCd: "PTK_UNI_02",
    leafCd: "PTK_UNI_02_01",
    cmtNm: "대학청년부",
    garNm: "2번 다락방",
    leafNm: "마가 1순",
    roleId: "USER",
    userStateCode: "01",
    telNo: "010-2345-6789",
    userName: "박지성",
  },
  {
    cmtCd: "PTK_UNI",
    cpsCd: "PTK",
    garCd: "PTK_UNI_01",
    leafCd: "PTK_UNI_01_02",
    cmtNm: "대학청년부",
    garNm: "1번 다락방",
    leafNm: "누가 1순",
    roleId: "USER",
    userStateCode: "00",
    telNo: "010-3456-7890",
    userName: "이영희",
  },
];

// 더미 공동체 데이터
export const demoCommunities = [
  { cmtCd: "PTK_UNI", cmtNm: "대학청년부", cpsCd: "PTK" },
  { cmtCd: "PTK_HOPE", cmtNm: "소망", cpsCd: "PTK" },
  { cmtCd: "PTK_FAITH", cmtNm: "믿음", cpsCd: "PTK" },
];

// 더미 다락방 데이터
export const demoGarrets = [
  { garCd: "PTK_UNI_01", garNm: "1번 다락방", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { garCd: "PTK_UNI_02", garNm: "2번 다락방", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { garCd: "PTK_HOPE_01", garNm: "3번 다락방", cmtCd: "PTK_HOPE", cpsCd: "PTK" },
  { garCd: "PTK_FAITH_01", garNm: "4번 다락방", cmtCd: "PTK_FAITH", cpsCd: "PTK" },
];

// 더미 순 데이터
export const demoLeafs = [
  { leafCd: "PTK_UNI_01_01", leafNm: "마태 1순", garCd: "PTK_UNI_01", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { leafCd: "PTK_UNI_01_02", leafNm: "누가 1순", garCd: "PTK_UNI_01", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { leafCd: "PTK_UNI_02_01", leafNm: "마가 1순", garCd: "PTK_UNI_02", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { leafCd: "PTK_HOPE_01_01", leafNm: "요셉 1순", garCd: "PTK_HOPE_01", cmtCd: "PTK_HOPE", cpsCd: "PTK" },
];

// 더미 건물 데이터
export const demoBuildings = [
  { bldCd: "PTK_PTK", bldNm: "평택온누리교회", cpsCd: "PTK" },
];

// 더미 예약 데이터 생성
const generateDemoReservations = () => {
  const today = dayjs();
  const result = [];
  const purposes = ["순모임", "예배팀 연습", "새가족 모임", "다락방 모임", "찬양팀 연습"];
  const statuses = ["request", "approve", "reject", "cancel"];

  for (let i = 0; i < 30; i++) {
    const date = today.add(Math.floor(Math.random() * 60) - 30, "day");
    const rsvtDt = date.format("YYYYMMDD");

    const place = ptonnuriPlace[Math.floor(Math.random() * ptonnuriPlace.length)];
    const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const startHour = 9 + Math.floor(Math.random() * 10);
    const endHour = startHour + 1 + Math.floor(Math.random() * 2);

    result.push({
      rsvtId: i + 1,
      useCnts: purposes[Math.floor(Math.random() * purposes.length)],
      plcCd: place.plcCd,
      plcNm: place.plcNm,
      rsvtDt,
      startTime: `${startHour.toString().padStart(2, "0")}0000`,
      endTime: `${endHour.toString().padStart(2, "0")}0000`,
      mbrId: String(demoUsers.indexOf(user) + 1),
      userName: user.userName,
      sttCd: status,
      telNo: user.telNo,
      cpsCd: "PTK",
      bldCd: "PTK_PTK",
    });
  }

  return result;
};

export const demoReservations = generateDemoReservations();

// 월별 예약 데이터 그룹화
export const getDemoMonthlyReservations = (yearMonth: string) => {
  const filtered = demoReservations.filter(r => r.rsvtDt.startsWith(yearMonth));

  const grouped: Record<string, typeof filtered> = {};
  filtered.forEach(r => {
    if (!grouped[r.rsvtDt]) {
      grouped[r.rsvtDt] = [];
    }
    grouped[r.rsvtDt].push(r);
  });

  return Object.entries(grouped).map(([day, data]) => ({ day, data }));
};

// 장소 데이터
export const getDemoPlaces = () => ptonnuriPlaceByFloor;
export const getDemoPlaceList = () => ptonnuriPlace;
