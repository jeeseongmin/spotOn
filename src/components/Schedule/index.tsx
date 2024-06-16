import dayjs from "dayjs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import Button from "@/components/Button";
import DropdownYearMonthPicker from "@/components/DatePicker/DropdownYearMonthPicker";
import Reservation from "@/components/Schedule/Reservation";
import Calendar from "@/pages/Home/components/Calendar";
import useCalendarStore from "@/store/calendarStore";

const Schedule = () => {
  const { date, setDate, setFirstDayOfMonth } = useCalendarStore(
    state => state,
  );

  const goPreviousMonth = () => {
    setFirstDayOfMonth(date.date(0).date(1));
    setDate(date.date(0).date(1));
  };

  const goNextMonth = () => {
    setFirstDayOfMonth(date.date(date.daysInMonth() + 1));
    setDate(date.date(date.daysInMonth() + 1));
  };

  const reset = () => {
    setDate(dayjs(new Date()));
    setFirstDayOfMonth(dayjs(new Date()).date(1));
  };

  return (
    <div className="h-[622px] flex-1 overflow-hidden rounded-[2px] border border-gray-light px-4 py-6">
      <div className="relative flex h-full w-full flex-col gap-6">
        {/* Date Select Action */}
        <div className="flex h-8 items-center justify-center gap-12">
          <Button variant="custom" onClick={goPreviousMonth}>
            <SlArrowLeft size={13} />
          </Button>
          <DropdownYearMonthPicker
            className="flex text-xl font-light leading-5"
            onClick={setDate}
          />
          <Button variant="custom" onClick={goNextMonth}>
            <SlArrowRight size={13} />
          </Button>

          <div className="absolute right-0 top-0 h-10">
            <Button
              variant="custom"
              onClick={reset}
              className="h-8 border border-primary px-4 text-primary drop-shadow-none hover:bg-primary hover:text-white"
            >
              오늘
            </Button>
          </div>
        </div>
        {/* tip */}
        <div className="flex w-full justify-end">
          <Reservation>장소 예약건</Reservation>
        </div>

        {/* Calendar */}
        <Calendar />
      </div>
    </div>
  );
};

export default Schedule;
