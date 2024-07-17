import { useEffect, useState } from "react";

import { daysOfTheWeek } from "@/constants/calendar";
import { TempType, reservations } from "@/dummy/reservation";
import ReservationCard from "@/pages/Home/components/ReservationCard";
import useCalendarStore from "@/store/calendarStore";

const DailyReservationList = () => {
  const date = useCalendarStore(state => state.date);

  const [dailyReservations, setDailyReservations] = useState(
    reservations.filter((reservation: TempType) => {
      return date.date() === reservation.day.date();
    })[0],
  );

  useEffect(() => {
    setDailyReservations(
      reservations.filter((reservation: TempType) => {
        return date.date() === reservation.day.date();
      })[0],
    );
  }, [date]);

  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-8">
      <ReservationCard
        key={date.format("MM / DD")}
        date={`${date.format("MM / DD")} (${daysOfTheWeek[date.day()]})`}
        reservationList={
          dailyReservations && dailyReservations.data
            ? dailyReservations.data
            : []
        }
      />
    </div>
  );
};

export default DailyReservationList;
