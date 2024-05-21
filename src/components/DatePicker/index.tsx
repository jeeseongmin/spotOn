import dayjs, { Dayjs } from "dayjs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import useCalendarStore from "@/store/calendarStore";

import Button from "../Button";
import Calendar from "./Calendar";

interface DatePickerProps {
  date?: Dayjs;
  limit?: number;
  onChange: (day: Dayjs) => void;
}

const DatePicker = ({ date = dayjs(), limit, onChange }: DatePickerProps) => {
  const { firstDayOfMonth, setFirstDayOfMonth } = useCalendarStore();

  const goPreviousMonth = () =>
    setFirstDayOfMonth(firstDayOfMonth.date(0).date(1));
  const goNextMonth = () =>
    setFirstDayOfMonth(firstDayOfMonth.date(firstDayOfMonth.daysInMonth() + 1));

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
        selectedDate={date}
        limit={limit}
        onChangeSelectedDate={onChange}
      />
    </div>
  );
};

export default DatePicker;
