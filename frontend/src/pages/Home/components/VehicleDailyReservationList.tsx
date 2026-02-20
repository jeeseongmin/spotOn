import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { daysOfTheWeek } from "@/constants/calendar";
import { vehicleDummyData } from "@/data/vehicleDummyData";
import VehicleReservationCard from "@/pages/Home/components/VehicleReservationCard";
import useCalendarStore from "@/store/calendarStore";

const VehicleDailyReservationList = () => {
  const [date] = useCalendarStore(
    useShallow(state => [state.date]),
  );

  const dailyReservations = vehicleDummyData.filter(
    reservation => dayjs(reservation.reservationDate).isSame(date, "day"),
  );

  return (
    <div className="flex h-fit max-h-[225px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-4 md:h-[540px] md:max-h-full md:py-8">
      <VehicleReservationCard
        key={date.format("MM / DD")}
        date={`${date.format("MM / DD")} (${daysOfTheWeek[date.day()]})`}
        reservationList={dailyReservations}
      />
    </div>
  );
};

export default VehicleDailyReservationList;
