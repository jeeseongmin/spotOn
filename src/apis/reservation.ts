import { axiosInstance } from "@/apis/core";
import {
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
    const res = await axiosInstance.post(
      `/portal-service/api/v1/reservation/insert`,
      reservationRequest,
    );

    console.log("reservation : ", res);
  } catch (error) {
    console.log(error);
  }
};

export const putReservationState = async ({
  rsvtId,
  sttCd,
}: ReservationStateRequest) => {
  try {
    await axiosInstance.put(`/portal-service/api/v1/reservation/${sttCd}`, {
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

export const getMonthlyReservation = async (date: string) => {
  try {
    const res = await axiosInstance.get(
      "/portal-service/api/v1/reservation/list/month",
      {
        params: {
          cpsCd: "PTK",
          rsvtDt: date,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};