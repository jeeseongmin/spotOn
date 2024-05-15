import dayjs from "dayjs";
import "dayjs/locale/ko";

import ReservationCard from "@/pages/Home/components/ReservationCard";
import useCalendarStore from "@/store/calendarStore";

dayjs.locale("ko");

const MyReservation = () => {
  const { date } = useCalendarStore(state => state);

  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-8">
      <ReservationCard date={date.format("YYYY-MM-DD (dddd)")} list={[]} />
    </div>
  );
};

export default MyReservation;
