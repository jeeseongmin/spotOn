export type VehicleReservationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

export interface VehicleReservation {
  id: number;
  applicantName: string;
  applicantPhone: string;
  communityName: string;
  reservationDate: string; // YYYY-MM-DD
  drivingTime: string; // "09:00 ~ 18:00"
  purpose: string;
  destination: string;
  driverName: string;
  driverPhone: string;
  status: VehicleReservationStatus;
  rejectReason?: string;
  createdAt: string; // YYYY-MM-DD
}

export const VEHICLE_STATUS_LABEL: Record<VehicleReservationStatus, string> = {
  pending: "대기",
  approved: "승인",
  rejected: "반려",
  cancelled: "취소",
};

export const VEHICLE_STATUS_COLOR: Record<VehicleReservationStatus, string> = {
  pending: "bg-yellow-400 text-white",
  approved: "bg-green-500 text-white",
  rejected: "bg-red text-white",
  cancelled: "bg-gray-dull text-white",
};

export const VEHICLE_STATUS_DOT_COLOR: Record<
  VehicleReservationStatus,
  string
> = {
  pending: "bg-yellow-400",
  approved: "bg-green-500",
  rejected: "bg-red",
  cancelled: "bg-gray-dull",
};
