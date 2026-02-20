import { useState } from "react";

import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ko";

import AlertModal from "@/components/Modal/AlertModal";
import ReservationModal from "@/components/Modal/ReservationModal";
import Button from "@/components/Button";
import { vehicleDummyData } from "@/data/vehicleDummyData";
import useModal from "@/hooks/useModal";
import useUserStore from "@/store/userStore";
import type { VehicleReservation as VehicleReservationType } from "@/types/vehicleReservation";

import VehicleCalendar from "./VehicleCalendar";
import VehicleReservationDetail from "./VehicleReservationDetail";
import VehicleReservationForm, {
  type VehicleFormValues,
} from "./VehicleReservationForm";

dayjs.locale("ko");

const LEADER_ROLES = ["LEADER", "MINISTRY", "ADMIN"];

const VehicleReservation = () => {
  const { roleId, userName, telNo, cmtNm } = useUserStore();
  const isLeaderOrAbove = LEADER_ROLES.includes(roleId);

  const [reservations, setReservations] =
    useState<VehicleReservationType[]>(vehicleDummyData);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const successModal = useModal();
  const cancelConfirmModal = useModal();
  const alertModal = useModal();
  const [alertMessage, setAlertMessage] = useState("");

  // Find reservation for selected date (active ones only)
  const activeReservation = selectedDate
    ? reservations.find(
        (r) =>
          r.reservationDate === selectedDate.format("YYYY-MM-DD") &&
          r.status !== "rejected" &&
          r.status !== "cancelled",
      )
    : null;

  const handleSelectDate = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const handleSubmitReservation = (data: VehicleFormValues) => {
    if (!selectedDate) return;

    const newReservation: VehicleReservationType = {
      id: reservations.length + 1,
      applicantName: userName,
      applicantPhone: telNo || "010-0000-0000",
      communityName: cmtNm || "-",
      reservationDate: selectedDate.format("YYYY-MM-DD"),
      drivingTime: data.drivingTime,
      purpose: data.purpose,
      destination: data.destination,
      driverName: data.driverName,
      driverPhone: data.driverPhone,
      status: "pending",
      createdAt: dayjs().format("YYYY-MM-DD"),
    };

    setReservations((prev) => [...prev, newReservation]);
    successModal.onOpen();
  };

  const handleCancelReservation = () => {
    if (!activeReservation) return;

    setReservations((prev) =>
      prev.map((r) =>
        r.id === activeReservation.id ? { ...r, status: "cancelled" as const } : r,
      ),
    );
    cancelConfirmModal.onClose();
    setAlertMessage("예약이 취소되었습니다.");
    alertModal.onOpen();
    setSelectedDate(null);
  };

  // Render right panel content
  const renderRightPanel = () => {
    // No date selected
    if (!selectedDate) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-gray-dull">
          <p className="text-lg font-medium">날짜를 선택해주세요.</p>
          <div className="text-small">
            <p>예약된 날짜: 상세정보 확인</p>
            <p>빈 날짜: 예약 신청 가능</p>
          </div>
        </div>
      );
    }

    // Date has active reservation
    if (activeReservation) {
      return (
        <VehicleReservationDetail
          date={selectedDate}
          reservation={activeReservation}
          isOwner={activeReservation.applicantName === userName}
          onCancel={cancelConfirmModal.onOpen}
        />
      );
    }

    // Empty date - check permission
    if (!isLeaderOrAbove) {
      return (
        <div className="flex flex-col gap-3">
          <div className="text-lg font-semibold text-primary">
            {selectedDate.format("YYYY년 M월 D일 (dd)")}
          </div>
          <div>
            <span className="inline-block rounded-full border border-green-500 px-3 py-1 text-small font-medium text-green-500">
              예약 가능
            </span>
          </div>
          <div className="rounded-sm border border-yellow-light bg-yellow-light/20 p-4 text-small">
            <p className="font-medium">
              차량 예약은 리더(순장) 이상만 신청 가능합니다.
            </p>
            <p className="mt-1 text-gray-dull">
              예약이 필요하시면 소속 공동체 리더에게 문의해주세요.
            </p>
          </div>
        </div>
      );
    }

    // Empty date - leader can book
    return (
      <VehicleReservationForm
        date={selectedDate}
        onSubmit={handleSubmitReservation}
      />
    );
  };

  return (
    <>
      <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8">
        {/* Left: Calendar */}
        <div className="w-full md:w-[340px] md:min-w-[340px]">
          <div className="rounded-sm border border-gray-light p-4">
            <p className="pb-3 text-center text-base font-medium">날짜 선택</p>
            <VehicleCalendar
              reservations={reservations}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </div>
        </div>

        {/* Right: Info panel */}
        <div className="min-h-[400px] w-full rounded-sm border border-gray-light p-5">
          <p className="pb-4 text-base font-medium text-primary">예약 정보</p>
          {renderRightPanel()}
        </div>
      </div>

      {/* Success modal */}
      {successModal.isOpen && (
        <ReservationModal onClose={successModal.onClose}>
          <ReservationModal.Header>
            차량 예약이 신청되었습니다.
          </ReservationModal.Header>
          <ReservationModal.Content>
            <div className="flex flex-col gap-2 p-4 text-small">
              <p>관리자 승인 후 예약이 확정됩니다.</p>
              <p className="text-gray-dull">
                승인 현황은 예약 페이지에서 확인하실 수 있습니다.
              </p>
            </div>
          </ReservationModal.Content>
          <ReservationModal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                successModal.onClose();
                setSelectedDate(null);
              }}
            >
              확인
            </Button>
          </ReservationModal.Footer>
        </ReservationModal>
      )}

      {/* Cancel confirm modal */}
      {cancelConfirmModal.isOpen && (
        <ReservationModal onClose={cancelConfirmModal.onClose}>
          <ReservationModal.Header>예약 취소</ReservationModal.Header>
          <ReservationModal.Content>
            <div className="flex flex-col gap-2 p-4 text-small">
              <p>정말로 이 예약을 취소하시겠습니까?</p>
              <p className="text-gray-dull">취소된 예약은 복구할 수 없습니다.</p>
            </div>
          </ReservationModal.Content>
          <ReservationModal.Footer>
            <Button variant="outlined" onClick={cancelConfirmModal.onClose}>
              돌아가기
            </Button>
            <Button variant="primary" onClick={handleCancelReservation}>
              취소하기
            </Button>
          </ReservationModal.Footer>
        </ReservationModal>
      )}

      {/* Alert modal */}
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>{alertMessage}</AlertModal>
      )}
    </>
  );
};

export default VehicleReservation;
