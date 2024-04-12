import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import dayjs, { type Dayjs } from "dayjs";

import { cn } from "@/utils/cn";

interface CalendarItemProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"div"> {
  dayOfTheWeek: number;
  inactive?: boolean;
  selected?: boolean;
}

const CalendarItem = ({
  children,
  dayOfTheWeek,
  inactive = false,
  selected = false,
  className,
  ...props
}: CalendarItemProps) => {
  return (
    <div
      className={cn(
        "flex min-h-9 min-w-9 cursor-pointer items-center justify-center border border-transparent font-light",
        inactive && "opacity-50",
        dayOfTheWeek === 6 && "text-saturday",
        dayOfTheWeek === 0 && "text-sunday",
        selected && "border-primary bg-primary-lighten/[.34] rounded-[5px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const daysOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarHead = () => (
  <div className="flex items-center justify-around">
    {daysOfTheWeek.map((dayOfTheWeek, i) => (
      <CalendarItem key={dayOfTheWeek} dayOfTheWeek={i} className="font-medium">
        {dayOfTheWeek}
      </CalendarItem>
    ))}
  </div>
);

interface CalendarProps {
  firstDayOfMonth: Dayjs;
  selectedDate?: Date;
  onChange: (day: Date) => void;
}

const Calendar = ({
  firstDayOfMonth,
  selectedDate,
  onChange,
}: CalendarProps) => {
  const getWeeks = () => {
    const days: Dayjs[] = [];
    const daysInMonth = firstDayOfMonth.daysInMonth();
    const lastDayOfMonth = firstDayOfMonth.date(daysInMonth);

    if (firstDayOfMonth.day() !== 0) {
      const previousMonthDays = Array.from(
        { length: firstDayOfMonth.day() },
        (_, i) => firstDayOfMonth.date(firstDayOfMonth.day() * -1 + i + 1),
      );

      days.push(...previousMonthDays);
    }

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) =>
      firstDayOfMonth.date(i + 1),
    );

    days.push(...currentMonthDays);

    if (lastDayOfMonth.day() !== 6) {
      const nextMonthDays = Array.from(
        { length: 6 - lastDayOfMonth.day() },
        (_, i) => firstDayOfMonth.date(daysInMonth + i + 1),
      );

      days.push(...nextMonthDays);
    }

    const weeks = Array.from({ length: days.length / 7 }, (_, i) => [
      ...days.slice(i * 7, (i + 1) * 7),
    ]);

    return weeks;
  };

  return (
    <div className="flex w-full flex-col gap-2 text-black">
      <CalendarHead />
      {getWeeks().map(week => (
        <div
          key={week[0].valueOf()}
          className="flex items-center justify-around"
        >
          {week.map(day => (
            <CalendarItem
              key={day.valueOf()}
              dayOfTheWeek={day.day()}
              inactive={day.month() !== firstDayOfMonth.month()}
              selected={dayjs(selectedDate)?.isSame(day)}
              onClick={() => onChange(day.toDate())}
            >
              {day.date()}
            </CalendarItem>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
