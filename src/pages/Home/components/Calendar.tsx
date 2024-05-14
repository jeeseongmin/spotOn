import dayjs from "dayjs";

import Reservation from "@/components/Schedule/Reservation";
import {
  CalendarItemProps,
  CalendarProps,
  daysOfTheWeek,
} from "@/constants/calendar";
import { TempType, reservations } from "@/dummy/reservation";
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
  isInactive = false,
  isSelected = false,
  className,
  ...props
}: CalendarItemProps) => {
  const isHeader = type === "header";
  const isBody = type === "body";
  const dailyReservation = reservations.filter((reservationList: TempType) => {
    return children === reservationList.day.date() && !isInactive;
  });

  return (
    <div
      className={cn(
        `flex w-full cursor-pointer flex-col items-center justify-start gap-1 border-r border-gray-light px-1 text-[15px] font-light text-black last-of-type:border-none`,
        isHeader && "h-10 items-center",
        isBody && "pt-1",
        isInactive && "text-opacity-30",
        dayOfTheWeek === 6 && "text-saturday",
        dayOfTheWeek === 0 && "text-sunday",
        className,
      )}
      {...props}
    >
      {isBody && isSelected ? (
        <div className="flex h-[31px] w-[31px] items-center justify-center rounded-full bg-primary text-white">
          {children}
        </div>
      ) : (
        <div className="flex h-[31px] w-[31px] items-center justify-center ">
          {children}
        </div>
      )}

      {isBody && (
        <div className="h-4 w-full">
          {dailyReservation.length > 0 && (
            <Reservation reservations={dailyReservation}>
              {dailyReservation[0].data[0].place}
            </Reservation>
          )}
        </div>
      )}
    </div>
  );
};

const Calendar = ({
  firstDayOfMonth,
  selectedDate,
  onChangeSelectedDate,
  onChangeFirstDayOfMonth,
}: CalendarProps) => {
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
              const isCurrentMonth =
                dayjs(selectedDate).month() === day.month();
              const isInactive = !isCurrentMonth;

              return (
                <CalendarItem
                  key={day.valueOf()}
                  type="body"
                  dayOfTheWeek={day.day()}
                  isInactive={isInactive}
                  isSelected={dayjs(selectedDate)?.isSame(day, "day")}
                  onClick={() => {
                    onChangeSelectedDate(day);
                    if (isInactive) onChangeFirstDayOfMonth(day.date(1));
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
