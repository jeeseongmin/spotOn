import { useState } from "react";

import dayjs from "dayjs";

import Button from "@/components/Button";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import ReservationModal from "@/components/Modal/ReservationModal";
import Table from "@/components/Table";
import useModal from "@/hooks/useModal";
import type {
  VehicleReservation,
  VehicleReservationStatus,
} from "@/types/vehicleReservation";
import {
  VEHICLE_STATUS_COLOR,
  VEHICLE_STATUS_LABEL,
} from "@/types/vehicleReservation";
import type { CellInfo } from "@/types/table";
import { cn } from "@/utils/cn";

interface VehicleReservationTableProps {
  reservations: VehicleReservation[];
  onUpdateStatus: (
    id: number,
    status: VehicleReservationStatus,
    reason?: string,
  ) => void;
}

const VehicleReservationTable = ({
  reservations,
  onUpdateStatus,
}: VehicleReservationTableProps) => {
  const detailModal = useModal();
  const approveModal = useModal();
  const rejectModal = useModal();
  const alertModal = useModal();

  const [selected, setSelected] = useState<VehicleReservation | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  // Table header
  const header: CellInfo[] = [
    { type: "header", name: "운행일" },
    { type: "header", name: "공동체" },
    { type: "header", name: "신청자" },
    { type: "header", name: "운전자" },
    { type: "header", name: "목적지" },
    { type: "header", name: "상태" },
    { type: "header", name: "" },
    { type: "header", name: "" },
  ];

  // Table body
  const body: CellInfo[][] = reservations.map((r) => {
    const showDetail = () => {
      setSelected(r);
      detailModal.onOpen();
    };
    const showApprove = () => {
      setSelected(r);
      approveModal.onOpen();
    };
    const showReject = () => {
      setSelected(r);
      setRejectReason("");
      rejectModal.onOpen();
    };

    const actionCells = (): CellInfo[] => {
      if (r.status === "pending") {
        return [
          { data: "승인", method: showApprove },
          { data: "반려", method: showReject },
        ];
      }
      if (r.status === "approved") {
        return [
          { data: "상세", method: showDetail },
          { data: "취소", method: showReject },
        ];
      }
      return [{ data: "상세", method: showDetail }, { data: "" }];
    };

    return [
      {
        name: "운행일",
        data: dayjs(r.reservationDate).format("MM/DD (dd)"),
      },
      { name: "공동체", data: r.communityName },
      { name: "신청자", data: r.applicantName },
      { name: "운전자", data: r.driverName },
      { name: "목적지", data: r.destination },
      {
        name: "상태",
        data: (
          <span
            className={cn(
              "inline-block rounded-full px-2 py-0.5 text-xs",
              VEHICLE_STATUS_COLOR[r.status],
            )}
          >
            {VEHICLE_STATUS_LABEL[r.status]}
          </span>
        ),
      },
      ...actionCells(),
    ];
  });

  const handleApprove = () => {
    if (selected) {
      onUpdateStatus(selected.id, "approved");
      setAlertMessage("예약이 승인되었습니다.");
      alertModal.onOpen();
    }
    approveModal.onClose();
  };

  const handleReject = () => {
    if (selected) {
      const newStatus: VehicleReservationStatus =
        selected.status === "approved" ? "cancelled" : "rejected";
      onUpdateStatus(selected.id, newStatus, rejectReason || undefined);
      setAlertMessage(
        newStatus === "cancelled"
          ? "예약이 취소되었습니다."
          : "예약이 반려되었습니다.",
      );
      alertModal.onOpen();
    }
    rejectModal.onClose();
  };

  return (
    <>
      <Table header={header} body={body} />

      {/* Detail modal */}
      {detailModal.isOpen && selected && (
        <ReservationModal onClose={detailModal.onClose}>
          <ReservationModal.Header>차량 예약 상세 정보</ReservationModal.Header>
          <ReservationModal.Content>
            <div className="flex flex-col gap-3 p-2 text-small">
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">신청일</span>
                <span>{selected.createdAt}</span>
              </div>
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">운행날짜</span>
                <span>
                  {dayjs(selected.reservationDate).format(
                    "YYYY년 M월 D일 (dd)",
                  )}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">운행시간</span>
                <span>{selected.drivingTime}</span>
              </div>
              <hr className="my-1 border-gray-light" />
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">공동체</span>
                <span>{selected.communityName}</span>
              </div>
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">신청자</span>
                <span>{selected.applicantName}</span>
              </div>
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">
                  신청자 연락처
                </span>
                <span>{selected.applicantPhone}</span>
              </div>
              <hr className="my-1 border-gray-light" />
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">운행목적</span>
                <span>{selected.purpose}</span>
              </div>
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">목적지</span>
                <span>{selected.destination}</span>
              </div>
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">운전자</span>
                <span>{selected.driverName}</span>
              </div>
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">
                  운전자 연락처
                </span>
                <span>{selected.driverPhone}</span>
              </div>
              <hr className="my-1 border-gray-light" />
              <div className="flex gap-2">
                <span className="min-w-[100px] text-gray-dull">상태</span>
                <span
                  className={cn(
                    "inline-block rounded-full px-2 py-0.5 text-xs",
                    VEHICLE_STATUS_COLOR[selected.status],
                  )}
                >
                  {VEHICLE_STATUS_LABEL[selected.status]}
                </span>
              </div>
              {selected.rejectReason && (
                <div className="flex gap-2">
                  <span className="min-w-[100px] text-red">반려사유</span>
                  <span>{selected.rejectReason}</span>
                </div>
              )}
            </div>
          </ReservationModal.Content>
          <ReservationModal.Footer>
            <Button variant="primary" onClick={detailModal.onClose}>
              확인
            </Button>
          </ReservationModal.Footer>
        </ReservationModal>
      )}

      {/* Approve confirm modal */}
      {approveModal.isOpen && (
        <ConfirmModal
          title="예약 승인"
          onConfirm={handleApprove}
          onClose={approveModal.onClose}
        >
          이 차량 예약을 승인하시겠습니까?
        </ConfirmModal>
      )}

      {/* Reject modal with reason input */}
      {rejectModal.isOpen && (
        <ReservationModal onClose={rejectModal.onClose}>
          <ReservationModal.Header>
            {selected?.status === "approved" ? "예약 취소" : "예약 반려"}
          </ReservationModal.Header>
          <ReservationModal.Content>
            <div className="flex flex-col gap-3 p-2">
              <p className="text-small">
                {selected?.status === "approved"
                  ? "이 예약을 취소하시겠습니까?"
                  : "이 예약을 반려하시겠습니까?"}
              </p>
              <div className="flex flex-col gap-1">
                <label className="text-small font-medium text-gray-dull">
                  사유 (선택)
                </label>
                <textarea
                  className="min-h-[80px] w-full rounded-sm border border-gray-dull p-2 text-small"
                  placeholder="반려/취소 사유를 입력하세요"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
            </div>
          </ReservationModal.Content>
          <ReservationModal.Footer>
            <Button variant="outlined" onClick={rejectModal.onClose}>
              취소
            </Button>
            <Button variant="primary" onClick={handleReject}>
              {selected?.status === "approved" ? "취소하기" : "반려하기"}
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

export default VehicleReservationTable;
