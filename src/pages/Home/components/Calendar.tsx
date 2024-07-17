import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import Reservation from "@/components/Schedule/Reservation";
import { CalendarItemProps, daysOfTheWeek } from "@/constants/calendar";
import { TempType, reservations } from "@/dummy/reservation";
import useCalendarStore from "@/store/calendarStore";
import { getWeeks } from "@/utils/calendar";
import { cn } from "@/utils/cn";

const CalendarHead = () => (
  <thead className="flex items-center justify-around border-b border-gray-light">
    {daysOfTheWeek.map((dayOfTheWeek, i) => (
      <CalendarItem
        key={dayOfTheWeek}
        type="header"
        dayOfTheWeek={i}
        className="cursor-default font-medium"
      >
        {dayOfTheWeek}
      </CalendarItem>
    ))}
  </thead>
);

const CalendarItem = ({
  children,
  type,
  dayOfTheWeek,
  dayData,
  isInactive = false,
  isSelected = false,
  className,
  ...props
}: CalendarItemProps) => {
  const isHeader = type === "header";
  const isBody = type === "body";
  const isToday = dayData?.isSame(dayjs(), "day");
  const dailyReservation = reservations.filter((reservationList: TempType) => {
    return children === reservationList.day.date() && !isInactive;
  });

  return (
    <div
      className={cn(
        `relative flex w-full cursor-pointer flex-col items-center justify-start gap-1 border-r border-gray-light px-1 text-[15px] font-light text-black last-of-type:border-none`,
        isHeader && "h-10 items-center",
        isBody && "pt-1",
        isInactive && "text-opacity-30",
        // isSelected && "border border-primary",
        dayOfTheWeek === 6 && "text-saturday",
        dayOfTheWeek === 0 && "text-sunday",
        className,
      )}
      {...props}
    >
      {
        <div
          className={`z-40 flex h-[31px] w-[31px] items-center justify-center ${isToday && "rounded-full bg-primary text-white"}`}
        >
          {children}
        </div>
      }

      {isBody && (
        <div className="z-40 h-4 w-full">
          {dailyReservation.length > 0 && (
            <Reservation reservations={dailyReservation}>
              {dailyReservation[0].data[0].place}
            </Reservation>
          )}
        </div>
      )}

      <div
        className={`absolute left-0 top-0 h-full w-full ${isSelected && "rounded-sm border border-primary bg-primary-light bg-opacity-30 text-black"}`}
      ></div>
    </div>
  );
};

const Calendar = () => {
  const [date, setDate, firstDayOfMonth, setFirstDayOfMonth] = useCalendarStore(
    useShallow(state => [
      state.date,
      state.setDate,
      state.firstDayOfMonth,
      state.setFirstDayOfMonth,
    ]),
  );

  return (
    <table className="flex h-full w-full border-collapse flex-col">
      <CalendarHead />
      <div className="flex flex-1 flex-col">
        {getWeeks(firstDayOfMonth).map(week => (
          <div
            key={week[0].valueOf()}
            className="flex grow border-b border-gray-light last-of-type:border-none"
          >
            {week.map(day => {
              const isCurrentMonth = dayjs(date).month() === day.month();
              const isInactive = !isCurrentMonth;

              return (
                <CalendarItem
                  key={day.valueOf()}
                  type="body"
                  dayOfTheWeek={day.day()}
                  dayData={day}
                  isInactive={isInactive}
                  isSelected={dayjs(date)?.isSame(day, "day")}
                  onClick={() => {
                    setDate(day);
                    if (isInactive) setFirstDayOfMonth(day.date(1));
                  }}
                >
                  {day.date()}
                </CalendarItem>
              );
            })}
          </div>
        ))}
      </div>
    </table>
  );
};

export default Calendar;
