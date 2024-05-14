import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import Button from "@/components/Button";
import Reservation from "@/components/Schedule/Reservation";
import Calendar from "@/pages/Home/components/Calendar";

const Schedule = () => {
  const [date, setDate] = useState(dayjs(new Date()));
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(dayjs(date).date(1));

  const goPreviousMonth = () => {
    setFirstDayOfMonth(prevState => prevState.date(0).date(1));
    setDate(prevState => prevState.date(0).date(1));
  };

  const goNextMonth = () => {
    setFirstDayOfMonth(prevState =>
      prevState.date(prevState.daysInMonth() + 1),
    );
    setDate(prevState => prevState.date(prevState.daysInMonth() + 1));
  };

  const reset = () => {
    setDate(dayjs(new Date()));
    setFirstDayOfMonth(dayjs(new Date()).date(1));
  };

  const onChange = (day: Dayjs) => {
    setDate(day);
  };

  return (
    <div className="border-gray-white h-[622px] flex-1 overflow-hidden rounded-[2px] border px-4 py-6">
      <div className="relative flex h-full w-full flex-col gap-6">
        {/* Date Select Action */}
        <div className="flex h-8 items-center justify-center gap-12">
          <Button variant="custom" onClick={goPreviousMonth}>
            <SlArrowLeft size={13} />
          </Button>
          <div className="flex text-xl font-light leading-5">
            {firstDayOfMonth.format("YYYY. MM")}
          </div>
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
        <Calendar
          firstDayOfMonth={firstDayOfMonth}
          selectedDate={date}
          onChangeSelectedDate={onChange}
          onChangeFirstDayOfMonth={setFirstDayOfMonth}
        />
      </div>
    </div>
  );
};

export default Schedule;
