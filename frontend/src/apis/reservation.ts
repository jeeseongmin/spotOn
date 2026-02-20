import dayjs from "dayjs";

import { axiosInstance } from "@/apis/core";
import type {
  ReservationRequest,
  ReservationStateRequest,
  ReservedPlacesRequest,
} from "@/types/reservation";

export const fetchReservation = async (date: string, place: string) => {
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
  // console.log("plcCd=====>",plcCd); // 2025.05.26 로그확인
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
  try {
    const res = await axiosInstance.post(
      "/portal-service/api/v1/reservation/list/page",
      {
        cpsCd: "PTK",
        sttCd,
        userId: "all", //   2025.05.16 추가
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
  try {
    const res = await axiosInstance.post(
      `/portal-service/api/v1/reservation/list/page?page=${page}&size=${size}`,
      {
        cpsCd: "PTK",
        sttCd: "all", //   2025.05.16 추가
        userId,
      },
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
