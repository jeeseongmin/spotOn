import dayjs from "dayjs";

import { axiosInstance } from "@/apis/core";
import { IS_DEMO_MODE, getDemoMonthlyReservations, demoReservations } from "@/dummy/demo";
import type {
  ReservationRequest,
  ReservationStateRequest,
  ReservedPlacesRequest,
} from "@/types/reservation";

export const fetchReservation = async (date: string, place: string) => {
  if (IS_DEMO_MODE) {
    return demoReservations.filter(r => {
      const matchDate = r.rsvtDt === date;
      const matchPlace = place === "all" || r.plcCd === place;
      return matchDate && matchPlace;
    });
  }

  try {
    const res =
      await axiosInstance.get(`/portal-service/api/v1/reservation/list?cpsCd=PTK&rsvtDt=${date}&plcCd=${place}
`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const reservation = async (reservationRequest: ReservationRequest) => {
  if (IS_DEMO_MODE) {
    console.log("Demo mode: reservation request", reservationRequest);
    return { success: true };
  }

  try {
    await axiosInstance.post(
      `/portal-service/api/v1/reservation/insert`,
      reservationRequest,
    );
  } catch (error) {
    console.log(error);
  }
};

export const putReservationState = async ({
  rsvtId,
  sttCd,
}: ReservationStateRequest) => {
  if (IS_DEMO_MODE) {
    console.log("Demo mode: putReservationState", { rsvtId, sttCd });
    return { success: true };
  }

  const endPoint = sttCd === "approve" ? "approve" : "cancel";

  try {
    await axiosInstance.put(`/portal-service/api/v1/reservation/${endPoint}`, {
      rsvtId,
      sttCd,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getReservedPlaces = async ({
  rsvtDt,
  startTime,
  endTime,
}: ReservedPlacesRequest) => {
  if (IS_DEMO_MODE) {
    return [];
  }

  try {
    const res = await axiosInstance.get(
      "/portal-service/api/v1/place/reserved/list",
      {
        params: {
          cpsCd: "PTK",
          rsvtDt,
          startTime,
          endTime,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMonthlyReservation = async (date: string, plcCd: string) => {
  if (IS_DEMO_MODE) {
    const yearMonth = date.slice(0, 6);
    let result = getDemoMonthlyReservations(yearMonth);
    if (plcCd && plcCd !== "all") {
      result = result.map(day => ({
        ...day,
        data: day.data.filter(r => r.plcCd === plcCd),
      })).filter(day => day.data.length > 0);
    }
    return result;
  }

  try {
    const res = await axiosInstance.get(
      "/portal-service/api/v1/reservation/list/month",
      {
        params: {
          cpsCd: "PTK",
          rsvtDt: date,
          plcCd,
        },
      },
    );

    return res.data === "" ? [] : res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postReservationsByState = async (
  page: number = 0,
  size: number = 10,
  sttCd: string = "all",
  plcCd: string = "all",
  fromDate: string = dayjs().format("YYYYMMDD"),
  toDate: string = dayjs().add(30, "day").format("YYYYMMDD"),
) => {
  if (IS_DEMO_MODE) {
    let filtered = demoReservations;
    if (sttCd && sttCd !== "all") {
      filtered = filtered.filter(r => r.sttCd === sttCd);
    }
    if (plcCd && plcCd !== "all") {
      filtered = filtered.filter(r => r.plcCd === plcCd);
    }
    filtered = filtered.filter(r => r.rsvtDt >= fromDate && r.rsvtDt <= toDate);

    const start = page * size;
    const content = filtered.slice(start, start + size);
    return {
      content,
      numberOfElements: content.length,
      totalPages: Math.ceil(filtered.length / size),
      totalElements: filtered.length,
    };
  }

  try {
    const res = await axiosInstance.post(
      "/portal-service/api/v1/reservation/list/page",
      {
        cpsCd: "PTK",
        sttCd,
        userId: "all",
        plcCd,
        fromDate,
        toDate,
      },
      {
        params: {
          page,
          size,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// 사용자 별 예약 목록 가져오기
export const getReservationByUsers = async (
  page: number = 0,
  size: number = 10,
  userId: string = "",
) => {
  if (IS_DEMO_MODE) {
    let filtered = demoReservations;
    if (userId) {
      filtered = filtered.filter(r => r.mbrId === userId);
    }
    const start = page * size;
    const content = filtered.slice(start, start + size);
    return {
      content,
      numberOfElements: content.length,
      totalPages: Math.ceil(filtered.length / size),
      totalElements: filtered.length,
    };
  }

  try {
    const res = await axiosInstance.post(
      `/portal-service/api/v1/reservation/list/page?page=${page}&size=${size}`,
      {
        cpsCd: "PTK",
        sttCd: "all",
        userId,
      },
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
