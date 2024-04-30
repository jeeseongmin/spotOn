import { ComponentPropsWithoutRef } from "react";

import dayjs from "dayjs";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

const hours = Array.from({ length: 18 }, (_, index) => 6 + index);

const TimeTableHead = () => (
  <div className="h-full w-[5.56%] *:h-1/2">
    <div className="flex items-center justify-center bg-gray-middle text-black">
      시
    </div>
    <div className="flex w-full items-center justify-center border border-gray-middle bg-gray-light">
      분
    </div>
  </div>
);

interface TimeStatus {
  isPast: boolean;
  isReserved: boolean;
  isSelected: boolean;
}

interface TimeButtonProps extends ComponentPropsWithoutRef<"button"> {
  timeStatus: TimeStatus;
}

const TimeButton = ({ timeStatus, ...props }: TimeButtonProps) => {
  const { isPast, isReserved, isSelected } = timeStatus;

  return (
    <Button
      className={cn(
        "rounded-none",
        isPast && "bg-gray-light",
        isReserved && "bg-[#FF9A9A]",
        isSelected && "bg-primary",
      )}
      disabled={isPast || isReserved}
      {...props}
    ></Button>
  );
};

interface TimeSelectProps {
  selectedDate: Date;
  reservedTimes: number[];
  selectedTimes: number[];
  onChange: (newSelectedTimes: number[]) => void;
}

const TimeSelect = ({
  selectedDate,
  reservedTimes,
  selectedTimes,
  onChange,
}: TimeSelectProps) => {
  const [startTime, endTime] = [
    Math.min(...selectedTimes),
    Math.max(...selectedTimes),
  ];

  const handleClickTime = (selectedTime: number) => {
    // 최초 선택
    if (selectedTimes.length === 0) {
      onChange([selectedTime]);
      return;
    }

    // 선택 해제 불가
    if (startTime < selectedTime && selectedTime < endTime) {
      return alert("해제할 수 없는 시간대입니다.");
    }

    // 선택 해제
    if (selectedTimes.includes(selectedTime)) {
      onChange(selectedTimes.filter(time => time !== selectedTime));
      return;
    }

    // 2시간 초과
    if (selectedTimes.length === 4) {
      return alert("2시간까지 선택 가능합니다.");
    }

    // 선택
    if (startTime - selectedTime === 0.5 || selectedTime - endTime === 0.5) {
      onChange([...selectedTimes, selectedTime]);
      return;
    }

    alert("연속된 시간대만 선택 가능합니다.");
  };

  const getTimeStatus = (hour: number, isSecondHalfHour = false) => {
    const minute = isSecondHalfHour ? 30 : 0;
    const timeToNumber = isSecondHalfHour ? hour + 0.5 : hour;
    const timeToDayjs = dayjs(selectedDate)
      .set("hour", hour)
      .set("minute", minute);

    return {
      isPast: timeToDayjs.isBefore(dayjs(), "minute"),
      isReserved: reservedTimes.includes(timeToNumber),
      isSelected: startTime <= timeToNumber && endTime >= timeToNumber,
    };
  };

  return (
    <div className="flex h-16 w-full justify-between">
      <TimeTableHead />
      {hours.map(hour => {
        const firstHalfHourStatus = getTimeStatus(hour);
        const secondHalfHourStatus = getTimeStatus(hour, true);

        return (
          <div className="h-full w-[5.56%]">
            <div className="flex h-1/2 items-center justify-center border-l border-l-white bg-gray-middle text-black">
              {hour}
            </div>
            <div className="flex h-1/2 w-full *:w-1/2 *:border *:border-gray-middle">
              <TimeButton
                timeStatus={firstHalfHourStatus}
                onClick={() => handleClickTime(hour)}
              ></TimeButton>
              <TimeButton
                timeStatus={secondHalfHourStatus}
                onClick={() => handleClickTime(hour + 0.5)}
              ></TimeButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeSelect;
