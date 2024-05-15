import { daysOfTheWeek } from "@/constants/calendar";
import ReservationCard from "@/pages/Home/components/ReservationCard";
import useCalendarStore from "@/store/calendarStore";

const MyReservation = () => {
  const { date } = useCalendarStore(state => state);

  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-8">
      <ReservationCard
        date={`${date.format("MM / DD")} (${daysOfTheWeek[date.day()]})`}
        list={[]}
      />
    </div>
  );
};

export default MyReservation;
