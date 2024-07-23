import axios from "axios";

import { ReservationRequest } from "@/types/reservation";

export const fetchReservation = async (date: string, place: string) => {
  try {
    const res =
      await axios.get(`/talkingclass/portal-service/api/v1/reservation/list?cpsCd=PTK&rsvtDt=${date}&plcCd=${place}
`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const reservation = async (reservationRequest: ReservationRequest) => {
  try {
    const res = await axios.post(
      `/talkingclass/portal-service/api/v1/reservation/insert`,
      reservationRequest,
    );

    console.log("reservation : ", res);
  } catch (error) {
    console.log(error);
  }
};
