import { useEffect, useState } from "react";

import {
  postReservationsByState,
  putReservationState,
} from "@/apis/reservation";
import Table from "@/components/Table";
import { RESERVATION_TABLE_HEADER } from "@/constants/table";
import type {
  ReservationByState,
  ReservationStateCode,
} from "@/types/reservation";
import type { CellInfo } from "@/types/table";
import {
  getReservationBodyData,
  getTableBody,
  getTableHeader,
} from "@/utils/table";

const header = getTableHeader(RESERVATION_TABLE_HEADER);

const RequestReservationTable = () => {
  const [reservations, setReservations] = useState<ReservationByState[]>([]);
  const [reservationBody, setReservationBody] = useState<CellInfo[][]>([]);

  const changeReservationState = async (
    rsvtId: number,
    sttCd: ReservationStateCode,
  ) => {
    await putReservationState({ rsvtId, sttCd });
  };

  const getReservations = async () => {
    const { content } = await postReservationsByState(0, 10, "request");
    setReservations(content);
  };

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => {
    if (reservations.length === 0) return;

    const reservationTableBody = reservations.map(reservation => {
      const approveReservation = () =>
        changeReservationState(reservation.rsvtId, "approve");
      const rejectReservation = () =>
        changeReservationState(reservation.rsvtId, "reject");

      return getReservationBodyData(
        reservation,
        "request",
        approveReservation,
        rejectReservation,
      );
    });

    setReservationBody(
      getTableBody(RESERVATION_TABLE_HEADER, reservationTableBody),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);

  return <Table header={header} body={reservationBody} />;
};

export default RequestReservationTable;
