import type { Dayjs } from "dayjs";

import Button from "@/components/Button";
import type { VehicleReservation } from "@/types/vehicleReservation";
import {
  VEHICLE_STATUS_COLOR,
  VEHICLE_STATUS_LABEL,
} from "@/types/vehicleReservation";
import { cn } from "@/utils/cn";

interface VehicleReservationDetailProps {
  date: Dayjs;
  reservation: VehicleReservation;
  isOwner: boolean;
  onCancel?: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2">
    <span className="min-w-[100px] text-gray-dull">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const VehicleReservationDetail = ({
  date,
  reservation,
  isOwner,
  onCancel,
}: VehicleReservationDetailProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Date header */}
      <div className="text-lg font-semibold text-primary">
        {date.format("YYYY년 M월 D일 (dd)")}
      </div>

      {/* Status badge */}
      <div>
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1 text-small font-medium",
            VEHICLE_STATUS_COLOR[reservation.status],
          )}
        >
          {VEHICLE_STATUS_LABEL[reservation.status]}
        </span>
      </div>

      {/* Reservation info */}
      <div className="flex flex-col gap-5 rounded-sm border border-gray-light bg-white-dull p-4">
        <div className="border-b border-gray-light pb-3">
          <p className="pb-2 text-small font-medium text-primary">신청 정보</p>
          <div className="flex flex-col gap-1.5 text-small">
            <InfoRow label="공동체" value={reservation.communityName} />
            <InfoRow label="신청자" value={reservation.applicantName} />
            <InfoRow label="연락처" value={reservation.applicantPhone} />
          </div>
        </div>

        <div className="border-b border-gray-light pb-3">
          <p className="pb-2 text-small font-medium text-primary">운행 정보</p>
          <div className="flex flex-col gap-1.5 text-small">
            <InfoRow label="운행시간" value={reservation.drivingTime} />
            <InfoRow label="운행목적" value={reservation.purpose} />
            <InfoRow label="목적지" value={reservation.destination} />
          </div>
        </div>

        <div>
          <p className="pb-2 text-small font-medium text-primary">운전자 정보</p>
          <div className="flex flex-col gap-1.5 text-small">
            <InfoRow label="운전자" value={reservation.driverName} />
            <InfoRow label="연락처" value={reservation.driverPhone} />
          </div>
        </div>

        {reservation.rejectReason && (
          <div className="border-t border-gray-light pt-3">
            <p className="pb-2 text-small font-medium text-red">반려 사유</p>
            <p className="text-small">{reservation.rejectReason}</p>
          </div>
        )}
      </div>

      {/* Cancel button for owner */}
      {isOwner &&
        (reservation.status === "pending" ||
          reservation.status === "approved") && (
          <div className="flex justify-center">
            <Button variant="outlined" className="text-red" onClick={onCancel}>
              예약 취소
            </Button>
          </div>
        )}
    </div>
  );
};

export default VehicleReservationDetail;
