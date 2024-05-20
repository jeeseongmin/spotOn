import { useState } from "react";

import { daysOfTheWeek } from "@/constants/calendar";
import { TempType, myReservations } from "@/dummy/reservation";
import ReservationCard from "@/pages/Home/components/ReservationCard";
import useCalendarStore from "@/store/calendarStore";

const MyReservationList = () => {
  const { date } = useCalendarStore(state => state);
  const [myReservationList, setMyReservationList] = useState(myReservations);

  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-8">
      {myReservationList.map(element => {
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

export default MyReservationList;
