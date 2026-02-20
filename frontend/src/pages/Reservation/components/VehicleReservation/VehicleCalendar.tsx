import { useState } from "react";

import dayjs, { type Dayjs } from "dayjs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import Button from "@/components/Button";
import { daysOfTheWeek } from "@/constants/calendar";
import type { VehicleReservation } from "@/types/vehicleReservation";
import { getWeeks } from "@/utils/calendar";
import { cn } from "@/utils/cn";

interface VehicleCalendarProps {
  reservations: VehicleReservation[];
  selectedDate: Dayjs | null;
  onSelectDate: (date: Dayjs) => void;
}

const CalendarHead = () => (
  <div className="grid grid-cols-7 text-center text-small font-medium">
    {daysOfTheWeek.map((day, i) => (
      <div
        key={day}
        className={cn(
          "py-2",
          i === 0 && "text-red",
          i === 6 && "text-saturday",
        )}
      >
        {day}
      </div>
    ))}
  </div>
);

const VehicleCalendar = ({
  reservations,
  selectedDate,
  onSelectDate,
}: VehicleCalendarProps) => {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    dayjs().date(1),
  );

  const today = dayjs();
  const maxDate = today.add(2, "month").date(0); // 다음달 말일

  const goPreviousMonth = () =>
    setFirstDayOfMonth(firstDayOfMonth.subtract(1, "month").date(1));
  const goNextMonth = () =>
    setFirstDayOfMonth(firstDayOfMonth.add(1, "month").date(1));

  const getReservationForDate = (date: Dayjs) =>
    reservations.find(
      (r) =>
        r.reservationDate === date.format("YYYY-MM-DD") &&
        r.status !== "rejected" &&
        r.status !== "cancelled",
    );

  const isBooked = (date: Dayjs) => {
    const r = getReservationForDate(date);
    return r?.status === "approved" || r?.status === "pending";
  };

  const isSelectable = (date: Dayjs) => {
    if (date.isBefore(today, "day")) return false;
    if (date.isAfter(maxDate, "day")) return false;
    return true;
  };

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Header - month navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="custom" onClick={goPreviousMonth}>
          <SlArrowLeft size={10} />
        </Button>
        <span className="min-w-[120px] text-center text-base font-medium">
          {firstDayOfMonth.format("YYYY. MM")}
        </span>
        <Button variant="custom" onClick={goNextMonth}>
          <SlArrowRight size={10} />
        </Button>
      </div>

      {/* Calendar grid */}
      <CalendarHead />
      {getWeeks(firstDayOfMonth).map((week) => (
        <div key={week[0].valueOf()} className="grid grid-cols-7 text-center">
          {week.map((day) => {
            const isCurrentMonth = day.isSame(firstDayOfMonth, "month");
            const reservation = getReservationForDate(day);
            const booked = isBooked(day);
            const selectable = isSelectable(day) && isCurrentMonth;
            const isSelected =
              selectedDate && day.isSame(selectedDate, "day");
            const isToday = day.isSame(today, "day");

            return (
              <div
                key={day.valueOf()}
                className={cn(
                  "relative flex flex-col items-center justify-center py-1.5 text-small",
                  !isCurrentMonth && "opacity-30",
                  // Approved: red background
                  reservation?.status === "approved" && isCurrentMonth && "cursor-pointer rounded-[5px] bg-red/10",
                  // Pending: yellow background
                  reservation?.status === "pending" && isCurrentMonth && "cursor-pointer rounded-[5px] bg-yellow-400/15",
                  // Available selectable dates
                  !booked && selectable
                    ? "cursor-pointer hover:bg-gray-light/50"
                    : !booked && "cursor-default text-gray-dull",
                  // Selected state
                  isSelected &&
                    "rounded-[5px] border-2 border-primary bg-primary-light/[.34]",
                  !isSelected && "border border-transparent",
                  // Today highlight
                  isToday && !isSelected && !booked && "font-bold text-primary",
                  // Weekend colors (only for non-booked selectable dates)
                  day.day() === 0 && isCurrentMonth && !booked && selectable && "text-red",
                  day.day() === 6 && isCurrentMonth && !booked && selectable && "text-saturday",
                )}
                onClick={() => {
                  if (selectable || (booked && isCurrentMonth)) onSelectDate(day);
                }}
              >
                <span className={cn(
                  reservation?.status === "approved" && isCurrentMonth && "font-semibold text-red",
                  reservation?.status === "pending" && isCurrentMonth && "font-semibold text-yellow-600",
                )}>
                  {day.date()}
                </span>
                {/* Reservation status indicator */}
                {reservation && isCurrentMonth && (
                  <span
                    className={cn(
                      "mt-0.5 text-[9px] font-medium leading-none",
                      reservation.status === "approved" && "text-red",
                      reservation.status === "pending" && "text-yellow-600",
                    )}
                  >
                    {reservation.status === "approved" ? "예약불가" : "대기중"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-2 text-small text-gray-dull">
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-red/10 px-1 text-[9px] font-semibold text-red">예약불가</span>
          <span>승인 완료</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-yellow-100 px-1 text-[9px] font-semibold text-yellow-600">대기중</span>
          <span>승인 대기</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full border border-gray-middle bg-white" />
          <span>예약 가능</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCalendar;
