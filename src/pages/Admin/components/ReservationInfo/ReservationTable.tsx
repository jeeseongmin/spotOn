import { useEffect, useState } from "react";

import { postReservationsByState } from "@/apis/reservation";
import Table from "@/components/Table";
import { ReservationByState } from "@/types/reservation";
import type { CellInfo } from "@/types/table";
import {
  getReservationBodyData,
  getTableBody,
  getTableHeader,
} from "@/utils/table";

const header = ["날짜", "시간", "장소", "공동체", "예약자", "사용목적", "", ""];
const tempHeader = getTableHeader(header);

const ReservationTable = () => {
  const [reservations, setReservations] = useState<ReservationByState[]>([]);
  const [reservationBody, setReservationBody] = useState<CellInfo[][]>([]);

  const getReservations = async () => {
    const { content } = await postReservationsByState(0, 10, "");
    setReservations(content);
  };

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => {
    if (reservations.length === 0) return;
    const reservationTableBody = getReservationBodyData(reservations);
    setReservationBody(getTableBody(header, reservationTableBody));
  }, [reservations]);

  return <Table header={tempHeader} body={reservationBody} />;
};

export default ReservationTable;
