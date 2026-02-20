import { HttpResponse, http } from "msw";
import { ptonnuriPlace } from "@/dummy/places";

// 더미 유저 데이터
const dummyUsers = [
  {
    userId: "1",
    userName: "김온누리",
    telNo: "010-1234-5678",
    cpsCd: "PTK",
    cmtCd: "PTK_UNI",
    cmtNm: "대학청년부",
    garCd: "PTK_UNI_01",
    garNm: "1번 다락방",
    leafCd: "PTK_UNI_01_01",
    leafNm: "마태 1순",
    roleCd: "ADMIN",
    userStateCode: "active",
    crtDt: "2024-01-01",
  },
  {
    userId: "2",
    userName: "박지성",
    telNo: "010-2345-6789",
    cpsCd: "PTK",
    cmtCd: "PTK_UNI",
    cmtNm: "대학청년부",
    garCd: "PTK_UNI_02",
    garNm: "2번 다락방",
    leafCd: "PTK_UNI_02_01",
    leafNm: "마가 1순",
    roleCd: "USER",
    userStateCode: "active",
    crtDt: "2024-01-15",
  },
  {
    userId: "3",
    userName: "이영희",
    telNo: "010-3456-7890",
    cpsCd: "PTK",
    cmtCd: "PTK_UNI",
    cmtNm: "대학청년부",
    garCd: "PTK_UNI_01",
    garNm: "1번 다락방",
    leafCd: "PTK_UNI_01_02",
    leafNm: "누가 1순",
    roleCd: "USER",
    userStateCode: "request",
    crtDt: "2024-02-01",
  },
  {
    userId: "4",
    userName: "최민수",
    telNo: "010-4567-8901",
    cpsCd: "PTK",
    cmtCd: "PTK_HOPE",
    cmtNm: "소망",
    garCd: "PTK_HOPE_01",
    garNm: "3번 다락방",
    leafCd: "PTK_HOPE_01_01",
    leafNm: "요셉 1순",
    roleCd: "USER",
    userStateCode: "active",
    crtDt: "2024-02-10",
  },
  {
    userId: "5",
    userName: "정수진",
    telNo: "010-5678-9012",
    cpsCd: "PTK",
    cmtCd: "PTK_FAITH",
    cmtNm: "믿음",
    garCd: "PTK_FAITH_01",
    garNm: "4번 다락방",
    leafCd: "PTK_FAITH_01_01",
    leafNm: "서영순",
    roleCd: "USER",
    userStateCode: "reject",
    crtDt: "2024-02-15",
  },
];

// 더미 공동체 데이터
const dummyCommunities = [
  { cmtCd: "PTK_UNI", cmtNm: "대학청년부", cpsCd: "PTK" },
  { cmtCd: "PTK_HOPE", cmtNm: "소망", cpsCd: "PTK" },
  { cmtCd: "PTK_FAITH", cmtNm: "믿음", cpsCd: "PTK" },
];

// 더미 다락방 데이터
const dummyGarrets = [
  { garCd: "PTK_UNI_01", garNm: "1번 다락방", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { garCd: "PTK_UNI_02", garNm: "2번 다락방", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { garCd: "PTK_HOPE_01", garNm: "3번 다락방", cmtCd: "PTK_HOPE", cpsCd: "PTK" },
  { garCd: "PTK_FAITH_01", garNm: "4번 다락방", cmtCd: "PTK_FAITH", cpsCd: "PTK" },
  { garCd: "PTK_FAITH_02", garNm: "5번 다락방", cmtCd: "PTK_FAITH", cpsCd: "PTK" },
];

// 더미 순 데이터
const dummyLeafs = [
  { leafCd: "PTK_UNI_01_01", leafNm: "마태 1순", garCd: "PTK_UNI_01", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { leafCd: "PTK_UNI_01_02", leafNm: "누가 1순", garCd: "PTK_UNI_01", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { leafCd: "PTK_UNI_02_01", leafNm: "마가 1순", garCd: "PTK_UNI_02", cmtCd: "PTK_UNI", cpsCd: "PTK" },
  { leafCd: "PTK_HOPE_01_01", leafNm: "요셉 1순", garCd: "PTK_HOPE_01", cmtCd: "PTK_HOPE", cpsCd: "PTK" },
  { leafCd: "PTK_FAITH_01_01", leafNm: "서영순", garCd: "PTK_FAITH_01", cmtCd: "PTK_FAITH", cpsCd: "PTK" },
  { leafCd: "PTK_FAITH_01_02", leafNm: "길동순", garCd: "PTK_FAITH_01", cmtCd: "PTK_FAITH", cpsCd: "PTK" },
  { leafCd: "PTK_FAITH_02_01", leafNm: "성민순", garCd: "PTK_FAITH_02", cmtCd: "PTK_FAITH", cpsCd: "PTK" },
  { leafCd: "PTK_FAITH_02_02", leafNm: "희라순", garCd: "PTK_FAITH_02", cmtCd: "PTK_FAITH", cpsCd: "PTK" },
];

// 더미 건물 데이터
const dummyBuildings = [
  { bldCd: "PTK_PTK", bldNm: "평택온누리교회", cpsCd: "PTK" },
];

// 더미 예약 데이터 (상태별)
const generateReservations = () => {
  const today = new Date();
  const result = [];

  for (let i = 0; i < 20; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + Math.floor(Math.random() * 30) - 15);
    const rsvtDt = date.toISOString().slice(0, 10).replace(/-/g, "");

    const places = ptonnuriPlace;
    const place = places[Math.floor(Math.random() * places.length)];
    const user = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
    const statuses = ["request", "approve", "reject", "cancel"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const startHour = 9 + Math.floor(Math.random() * 12);
    const endHour = startHour + 1 + Math.floor(Math.random() * 3);

    result.push({
      rsvtId: i + 1,
      useCnts: ["순모임", "예배팀 연습", "새가족 모임", "다락방 모임", "찬양팀 연습"][Math.floor(Math.random() * 5)],
      plcCd: place.plcCd,
      plcNm: place.plcNm,
      rsvtDt,
      startTime: `${startHour.toString().padStart(2, "0")}0000`,
      endTime: `${endHour.toString().padStart(2, "0")}0000`,
      mbrId: user.userId,
      userName: user.userName,
      sttCd: status,
      telNo: user.telNo,
      cpsCd: "PTK",
      bldCd: "PTK_PTK",
    });
  }

  return result;
};

const allReservations = generateReservations();

// ============ 로그인 관련 핸들러 ============
export const loginHandler = http.post("/user-service/login", async () => {
  // 더미 로그인 성공 응답
  return HttpResponse.json({
    accessToken: "mock-access-token-12345",
    tokenId: "1", // 첫번째 유저 (김온누리, ADMIN)
  });
});

export const joinHandler = http.post("/user-service/api/v1/users/join", async () => {
  return HttpResponse.json({
    success: true,
    message: "회원가입이 완료되었습니다.",
  });
});

// ============ 유저 관련 핸들러 ============
export const getUserInfoHandler = http.get("/user-service/api/v1/users/info/:userId", ({ params }) => {
  const { userId } = params;
  const user = dummyUsers.find((u) => u.userId === userId);

  if (user) {
    return HttpResponse.json(user);
  }

  // 기본 유저 (로그인용)
  return HttpResponse.json(dummyUsers[0]);
});

export const updateUserInfoHandler = http.put("/user-service/api/v1/users/info/:userId", async () => {
  return HttpResponse.json({
    success: true,
    message: "회원정보가 수정되었습니다.",
  });
});

export const getUsersListHandler = http.post("/user-service/api/v1/users/list/page", async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const size = parseInt(url.searchParams.get("size") || "10");
  const body = await request.json() as { userStateCode?: string };
  const userStateCode = body?.userStateCode || "";

  let filteredUsers = dummyUsers;
  if (userStateCode && userStateCode !== "all") {
    filteredUsers = dummyUsers.filter((u) => u.userStateCode === userStateCode);
  }

  const start = page * size;
  const end = start + size;
  const content = filteredUsers.slice(start, end);

  return HttpResponse.json({
    content,
    numberOfElements: content.length,
    totalPages: Math.ceil(filteredUsers.length / size),
    totalElements: filteredUsers.length,
    size,
    number: page,
  });
});

export const putUserStateHandler = http.put("/user-service/api/v1/users/state/change", async () => {
  return HttpResponse.json({
    success: true,
    message: "회원 상태가 변경되었습니다.",
  });
});

// ============ 조직 관련 핸들러 ============
export const getCommunityHandler = http.get("/user-service/api/v1/community/list", () => {
  return HttpResponse.json(dummyCommunities);
});

export const getGarretHandler = http.get("/user-service/api/v1/garret/list", ({ request }) => {
  const url = new URL(request.url);
  const cmtCd = url.searchParams.get("cmtCd");

  if (cmtCd) {
    const filtered = dummyGarrets.filter((g) => g.cmtCd === cmtCd);
    return HttpResponse.json(filtered);
  }

  return HttpResponse.json(dummyGarrets);
});

export const getLeafHandler = http.get("/user-service/api/v1/leaf/list", ({ request }) => {
  const url = new URL(request.url);
  const cmtCd = url.searchParams.get("cmtCd");
  const garCd = url.searchParams.get("garCd");

  let filtered = dummyLeafs;
  if (cmtCd) {
    filtered = filtered.filter((l) => l.cmtCd === cmtCd);
  }
  if (garCd) {
    filtered = filtered.filter((l) => l.garCd === garCd);
  }

  return HttpResponse.json(filtered);
});

// ============ 장소 관련 핸들러 ============
export const getBuildingHandler = http.get("/portal-service/api/v1/building/list", () => {
  return HttpResponse.json(dummyBuildings);
});

export const getPlaceHandler = http.get("/portal-service/api/v1/place/list", () => {
  return HttpResponse.json(ptonnuriPlace);
});

export const getReservedPlacesHandler = http.get("/portal-service/api/v1/place/reserved/list", ({ request }) => {
  const url = new URL(request.url);
  const rsvtDt = url.searchParams.get("rsvtDt");
  const startTime = url.searchParams.get("startTime");
  const endTime = url.searchParams.get("endTime");

  // 해당 시간대에 예약된 장소 반환
  const reserved = allReservations
    .filter((r) => {
      if (r.rsvtDt !== rsvtDt) return false;
      if (r.sttCd !== "approve") return false;
      // 시간 겹침 체크 (간소화)
      return r.startTime < (endTime || "240000") && r.endTime > (startTime || "000000");
    })
    .map((r) => ({
      plcCd: r.plcCd,
      plcNm: r.plcNm,
      plcF: ptonnuriPlace.find((p) => p.plcCd === r.plcCd)?.plcF || 1,
      cpsCd: "PTK",
      bldCd: "PTK_PTK",
    }));

  return HttpResponse.json(reserved);
});

// ============ 예약 관련 핸들러 ============
export const getReservationListHandler = http.get("/portal-service/api/v1/reservation/list", ({ request }) => {
  const url = new URL(request.url);
  const rsvtDt = url.searchParams.get("rsvtDt");
  const plcCd = url.searchParams.get("plcCd");

  let filtered = allReservations;
  if (rsvtDt) {
    filtered = filtered.filter((r) => r.rsvtDt === rsvtDt);
  }
  if (plcCd && plcCd !== "all") {
    filtered = filtered.filter((r) => r.plcCd === plcCd);
  }

  return HttpResponse.json(filtered);
});

export const getMonthlyReservationHandler = http.get("/portal-service/api/v1/reservation/list/month", ({ request }) => {
  const url = new URL(request.url);
  const rsvtDt = url.searchParams.get("rsvtDt"); // YYYYMM 형식
  const plcCd = url.searchParams.get("plcCd");

  let filtered = allReservations;
  if (rsvtDt) {
    const yearMonth = rsvtDt.slice(0, 6);
    filtered = filtered.filter((r) => r.rsvtDt.slice(0, 6) === yearMonth);
  }
  if (plcCd && plcCd !== "all") {
    filtered = filtered.filter((r) => r.plcCd === plcCd);
  }

  // 기존 더미 데이터 형식에 맞춰 그룹화
  const grouped: Record<string, typeof filtered> = {};
  filtered.forEach((r) => {
    if (!grouped[r.rsvtDt]) {
      grouped[r.rsvtDt] = [];
    }
    grouped[r.rsvtDt].push(r);
  });

  return HttpResponse.json(
    Object.entries(grouped).map(([day, data]) => ({ day, data }))
  );
});

export const postReservationListPageHandler = http.post("/portal-service/api/v1/reservation/list/page", async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const size = parseInt(url.searchParams.get("size") || "10");
  const body = await request.json() as { sttCd?: string; plcCd?: string; userId?: string };

  let filtered = allReservations;

  if (body?.sttCd && body.sttCd !== "all") {
    filtered = filtered.filter((r) => r.sttCd === body.sttCd);
  }
  if (body?.plcCd && body.plcCd !== "all") {
    filtered = filtered.filter((r) => r.plcCd === body.plcCd);
  }
  if (body?.userId && body.userId !== "all") {
    filtered = filtered.filter((r) => r.mbrId === body.userId);
  }

  const start = page * size;
  const end = start + size;
  const content = filtered.slice(start, end);

  return HttpResponse.json({
    content,
    numberOfElements: content.length,
    totalPages: Math.ceil(filtered.length / size),
    totalElements: filtered.length,
    size,
    number: page,
  });
});

export const insertReservationHandler = http.post("/portal-service/api/v1/reservation/insert", async () => {
  return HttpResponse.json({
    success: true,
    message: "예약이 완료되었습니다.",
    rsvtId: Math.floor(Math.random() * 1000) + 100,
  });
});

export const approveReservationHandler = http.put("/portal-service/api/v1/reservation/approve", async () => {
  return HttpResponse.json({
    success: true,
    message: "예약이 승인되었습니다.",
  });
});

export const cancelReservationHandler = http.put("/portal-service/api/v1/reservation/cancel", async () => {
  return HttpResponse.json({
    success: true,
    message: "예약이 취소되었습니다.",
  });
});

// 모든 핸들러 export
export const handlers = [
  // 로그인
  loginHandler,
  joinHandler,
  // 유저
  getUserInfoHandler,
  updateUserInfoHandler,
  getUsersListHandler,
  putUserStateHandler,
  // 조직
  getCommunityHandler,
  getGarretHandler,
  getLeafHandler,
  // 장소
  getBuildingHandler,
  getPlaceHandler,
  getReservedPlacesHandler,
  // 예약
  getReservationListHandler,
  getMonthlyReservationHandler,
  postReservationListPageHandler,
  insertReservationHandler,
  approveReservationHandler,
  cancelReservationHandler,
];
