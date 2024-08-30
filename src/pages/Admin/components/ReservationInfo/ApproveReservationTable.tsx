import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { postReservationsByState } from "@/apis/reservation";
import Button from "@/components/Button";
import ReservationModal from "@/components/Modal/ReservationModal";
import Table from "@/components/Table";
import { MYPAGE_MAIN_URL } from "@/constants/routes";
import { RESERVATION_TABLE_HEADER } from "@/constants/table";
import useModal from "@/hooks/useModal";
import ReservationDetails from "@/pages/Admin/components/ReservationInfo/ReservationDetails";
import type { ReservationByState } from "@/types/reservation";
import type { CellInfo } from "@/types/table";
import {
  getReservationBodyData,
  getTableBody,
  getTableHeader,
} from "@/utils/table";

const header = getTableHeader(RESERVATION_TABLE_HEADER);

const ApproveReservationTable = () => {
  const [reservations, setReservations] = useState<ReservationByState[]>([]);
  const [reservationBody, setReservationBody] = useState<CellInfo[][]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationByState | null>(null);
  const reservationModal = useModal();

  const getReservations = async () => {
    const { content } = await postReservationsByState(0, 10, "approve");
    setReservations(content);
  };

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => {
    if (reservations.length === 0) return;

    const reservationTableBody = reservations.map(reservation => {
      const showReservationModal = () => {
        setSelectedReservation(reservation);
        reservationModal.onOpen();
      };

      return getReservationBodyData(
        reservation,
        "approve",
        showReservationModal,
        () => alert("삭제"),
      );
    });

    setReservationBody(
      getTableBody(RESERVATION_TABLE_HEADER, reservationTableBody),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);

  return (
    <>
      <Table header={header} body={reservationBody} />
      {reservationModal.isOpen && (
        <ReservationModal onClose={reservationModal.onClose}>
          <ReservationModal.Header>예약 상세 정보</ReservationModal.Header>
          <ReservationModal.Content>
            {selectedReservation && (
              <ReservationDetails reservation={selectedReservation} />
            )}
          </ReservationModal.Content>
          <ReservationModal.Footer>
            <Link to={`${MYPAGE_MAIN_URL}?tab=1`}>
              <Button variant="outlined">나의 예약</Button>
            </Link>
            <Button variant="primary" onClick={reservationModal.onClose}>
              확인
            </Button>
          </ReservationModal.Footer>
        </ReservationModal>
      )}
    </>
  );
};

export default ApproveReservationTable;
