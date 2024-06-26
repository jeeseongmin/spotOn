import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

import type { User } from "@/dummy/user";

interface ReservationFieldProps {
  label: string;
  value: string;
}

const ReservationField = ({ label, value }: ReservationFieldProps) => (
  <div className="flex border-b border-b-gray-middle p-4 text-base font-light">
    <div className="min-w-20 text-primary">{label}</div>
    <div>{value}</div>
  </div>
);

interface ReservationDetailsProps {
  user: User;
}

const ReservationDetails = ({ user }: ReservationDetailsProps) => {
  const { getValues } = useFormContext();
  const { name, phoneNumber, community } = user;

  const getTimeText = (time: number[]) => {
    const [start, end] = time.length === 1 ? [time[0], time[0]] : time;

    const formatNumberToTime = (number: number) =>
      number % 1 > 0 ? `${Math.floor(number)}:30` : `${number}:00`;

    return `${formatNumberToTime(start)} ~ ${formatNumberToTime(end + 0.5)}`;
  };
  const getPlaceText = (place: { id: number; name: string; floor: string }) => {
    const { name, floor } = place;

    return `[${floor}] ${name}`;
  };

  return (
    <>
      {/* TODO: 고정 예약 포맷에 맞춰 날짜 수정 */}
      <ReservationField
        label="날짜"
        value={dayjs(getValues("date"))
          .locale("ko")
          .format("YYYY년 MM월 DD일 (ddd요일)")}
      />
      <ReservationField label="시간" value={getTimeText(getValues("time"))} />
      <ReservationField label="장소" value={getPlaceText(getValues("place"))} />
      <ReservationField label="예약자" value={name} />
      <ReservationField label="연락처" value={phoneNumber} />
      <ReservationField label="부서" value={community} />
      <ReservationField label="사용목적" value={getValues("purpose")} />
    </>
  );
};

export default ReservationDetails;
