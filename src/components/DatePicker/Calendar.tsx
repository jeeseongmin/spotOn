import dayjs, { type Dayjs } from "dayjs";

import {
  CalendarItemProps,
  CalendarProps,
  daysOfTheWeek,
} from "@/constants/calendar";
import useCalendarStore from "@/store/calendarStore";
import { getWeeks } from "@/utils/calendar";
import { cn } from "@/utils/cn";

const CalendarItem = ({
  children,
  dayOfTheWeek,
  isInactive = false,
  isSelected = false,
  className,
  ...props
}: CalendarItemProps) => {
  return (
    <div
      className={cn(
        "flex min-h-9 min-w-9 cursor-pointer items-center justify-center border font-light",
        isInactive && "cursor-auto opacity-50",
        dayOfTheWeek === 6 && "text-saturday",
        dayOfTheWeek === 0 && "text-red",
        isSelected
          ? "rounded-[5px] border-primary bg-primary-light/[.34]"
          : "border-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CalendarHead = () => (
  <div className="flex items-center justify-around">
    {daysOfTheWeek.map((dayOfTheWeek, i) => (
      <CalendarItem
        key={dayOfTheWeek}
        dayOfTheWeek={i}
        className="cursor-default font-medium"
      >
        {dayOfTheWeek}
      </CalendarItem>
    ))}
  </div>
);

const Calendar = ({
  selectedDate,
  limit,
  onChangeSelectedDate,
}: CalendarProps) => {
  const { firstDayOfMonth, setFirstDayOfMonth } = useCalendarStore();

  const handleClickDate = (day: Dayjs, isInactive: boolean) => {
    if (isInactive) return;

    if (!day.isSame(firstDayOfMonth, "month")) {
      setFirstDayOfMonth(day.date(1));
    }

    onChangeSelectedDate(day);
  };

  return (
    <div className="flex w-full flex-col gap-2 text-black">
      <CalendarHead />
      {getWeeks(firstDayOfMonth).map(week => (
        <div
          key={week[0].valueOf()}
          className="flex items-center justify-around"
        >
          {week.map(day => {
            const today = dayjs();
            const isBefore = day.isBefore(today, "day");
            const isLimitPassed = limit
              ? day.isAfter(today.add(limit, "day"), "day")
              : false;
            const isInactive = isBefore || isLimitPassed;

            return (
              <CalendarItem
                key={day.valueOf()}
                dayOfTheWeek={day.day()}
                isInactive={isInactive}
                isSelected={dayjs(selectedDate)?.isSame(day, "day")}
                onClick={() => handleClickDate(day, isInactive)}
              >
                {day.date()}
              </CalendarItem>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
