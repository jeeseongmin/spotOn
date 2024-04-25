import { useState } from "react";

import dayjs from "dayjs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import Button from "../Button";
import Calendar from "./Calendar";

interface DatePickerProps {
  date?: Date;
  limit?: number;
  onChange: (day: Date) => void;
}

const DatePicker = ({
  date = new Date(),
  limit,
  onChange,
}: DatePickerProps) => {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(dayjs(date).date(1));

  const goPreviousMonth = () =>
    setFirstDayOfMonth(prevState => prevState.date(0).date(1));
  const goNextMonth = () =>
    setFirstDayOfMonth(prevState =>
      prevState.date(prevState.daysInMonth() + 1),
    );

  return (
    <div className="flex w-full select-none flex-col gap-2 text-small">
      <div className="flex items-center justify-center gap-2">
        <Button variant="custom" onClick={goPreviousMonth}>
          <SlArrowLeft size={10} />
        </Button>
        <div className="flex font-light">
          {firstDayOfMonth.format("YYYY. MM")}
        </div>
        <Button variant="custom" onClick={goNextMonth}>
          <SlArrowRight size={10} />
        </Button>
      </div>
      <Calendar
        firstDayOfMonth={firstDayOfMonth}
        selectedDate={date}
        limit={limit}
        onChangeSelectedDate={onChange}
        onChangeFirstDayOfMonth={setFirstDayOfMonth}
      />
    </div>
  );
};

export default DatePicker;
