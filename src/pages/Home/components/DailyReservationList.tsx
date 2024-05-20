import { useEffect, useState } from "react";

import { daysOfTheWeek } from "@/constants/calendar";
import { TempType, reservations } from "@/dummy/reservation";
import ReservationCard from "@/pages/Home/components/ReservationCard";
import useCalendarStore from "@/store/calendarStore";

const DailyReservationList = () => {
  const { date } = useCalendarStore(state => state);

  const [reservationList, setReservationList] = useState(
    reservations.filter((reservation: TempType) => {
      return date.date() === reservation.day.date();
    }),
  );

  useEffect(() => {
    setReservationList(
      reservations.filter((reservation: TempType) => {
        return date.date() === reservation.day.date();
      }),
    );
  }, [date]);

  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-8">
      {reservationList &&
        reservationList.map(element => {
          return (
            <ReservationCard
              date={`${element.day.format("MM / DD")} (${daysOfTheWeek[element.day.day()]})`}
              list={element.data}
            />
          );
        })}
    </div>
  );
};

export default DailyReservationList;
