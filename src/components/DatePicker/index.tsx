import { useEffect, useState } from "react";

import dayjs from "dayjs";

import LeftArrow from "@/assets/icons/teenyicons_left-outline.svg";
import RightArrow from "@/assets/icons/teenyicons_right-outline.svg";

import Calendar from "./Calendar";

interface DatePickerProps {
  date?: Date | undefined;
  onChange: (day: Date) => void;
}

const DatePicker = ({ date, onChange }: DatePickerProps) => {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(dayjs().date(1));

  const goPreviousMonth = () =>
    setFirstDayOfMonth(prevState => prevState.date(0).date(1));
  const goNextMonth = () =>
    setFirstDayOfMonth(prevState =>
      prevState.date(prevState.daysInMonth() + 1),
    );

  useEffect(() => {
    setFirstDayOfMonth(dayjs(date).date(1));
  }, [date]);

  return (
    <div className="flex w-full flex-col gap-2 text-small">
      <div className="flex items-center justify-center gap-2">
        <img
          src={LeftArrow}
          alt="이전 월로 이동"
          onClick={goPreviousMonth}
          className="cursor-pointer"
        />
        <div className="flex font-light">
          {firstDayOfMonth.format("YYYY. MM")}
        </div>
        <img
          src={RightArrow}
          alt="다음 월로 이동"
          onClick={goNextMonth}
          className="cursor-pointer"
        />
      </div>
      <Calendar
        firstDayOfMonth={firstDayOfMonth}
        selectedDate={date}
        onChange={onChange}
      />
    </div>
  );
};

export default DatePicker;
