import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import dayjs, { type Dayjs } from "dayjs";

import { cn } from "@/utils/cn";

interface CalendarItemProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"div"> {
  dayOfTheWeek: number;
  isInactive?: boolean;
  isSelected?: boolean;
}

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
        dayOfTheWeek === 0 && "text-sunday",
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

const daysOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];

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

interface CalendarProps {
  firstDayOfMonth: Dayjs;
  selectedDate?: Date;
  limit?: number;
  onChangeSelectedDate: (day: Date) => void;
  onChangeFirstDayOfMonth: (day: Dayjs) => void;
}

const Calendar = ({
  firstDayOfMonth,
  selectedDate,
  limit,
  onChangeSelectedDate,
  onChangeFirstDayOfMonth,
}: CalendarProps) => {
  const getWeeks = () => {
    const daysInMonth = firstDayOfMonth.daysInMonth();
    const lastDayOfMonth = firstDayOfMonth.date(daysInMonth);

    const previousMonthDays = Array.from(
      { length: firstDayOfMonth.day() },
      (_, i) => firstDayOfMonth.date(firstDayOfMonth.day() * -1 + i + 1),
    );

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) =>
      firstDayOfMonth.date(i + 1),
    );

    const nextMonthDays = Array.from(
      { length: 6 - lastDayOfMonth.day() },
      (_, i) => firstDayOfMonth.date(daysInMonth + i + 1),
    );

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

    const weeks = Array.from({ length: days.length / 7 }, (_, i) => [
      ...days.slice(i * 7, (i + 1) * 7),
    ]);

    return weeks;
  };

  const handleClickDate = (day: Dayjs, isInactive: boolean) => {
    if (isInactive) return;

    if (!day.isSame(firstDayOfMonth, "month")) {
      onChangeFirstDayOfMonth(day.date(1));
    }

    onChangeSelectedDate(day.toDate());
  };

  return (
    <div className="flex w-full flex-col gap-2 text-black">
      <CalendarHead />
      {getWeeks().map(week => (
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
