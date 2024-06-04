import { ComponentPropsWithoutRef, useState } from "react";

import dayjs from "dayjs";

import Button from "@/components/Button";
import AlertModal from "@/components/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import { cn } from "@/utils/cn";

const hours = Array.from({ length: 18 }, (_, index) => 6 + index);

const alertMessage = {
  irrevocable: "해제할 수 없는 시간대입니다.",
  over: "2시간까지 선택 가능합니다.",
  disconnected: "연속된 시간대만 선택 가능합니다.",
};

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
        "rounded-none p-0 drop-shadow-none",
        isPast && "bg-gray-tinted",
        isReserved && "bg-red-light",
        isSelected && "bg-primary",
      )}
      disabled={isPast || isReserved}
      {...props}
    ></Button>
  );
};

interface TimeTablePickerProps {
  selectedDate: Date;
  reservedTimes: number[];
  selectedTimes: number[];
  onChange: (newSelectedTimes: number[]) => void;
}

const TimeTablePicker = ({
  selectedDate,
  reservedTimes,
  selectedTimes,
  onChange,
}: TimeTablePickerProps) => {
  const [startTime, endTime] = [
    Math.min(...selectedTimes),
    Math.max(...selectedTimes),
  ];
  const [alertType, setAlertType] = useState<
    "irrevocable" | "over" | "disconnected"
  >("disconnected");
  const alertModal = useModal();

  const handleClickTime = (selectedTime: number) => {
    const isSelectedNone = selectedTimes.length === 0;
    const isIrrevocable = startTime < selectedTime && selectedTime < endTime;
    const isSelectable =
      startTime - selectedTime === 0.5 || selectedTime - endTime === 0.5;
    const isSelected = selectedTimes.includes(selectedTime);
    const isOverTwoHours = selectedTimes.length === 4;

    if (isSelectedNone) {
      onChange([selectedTime]);
      return;
    }

    if (isIrrevocable) {
      setAlertType("irrevocable");
      alertModal.onOpen();
      return;
    }

    if (isSelected) {
      onChange(selectedTimes.filter(time => time !== selectedTime));
      return;
    }

    if (isOverTwoHours) {
      setAlertType("over");
      alertModal.onOpen();
      return;
    }

    if (isSelectable) {
      onChange([...selectedTimes, selectedTime]);
      return;
    }

    alertModal.onOpen();
    setAlertType("disconnected");
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
          <div key={hour} className="h-full w-[5.56%]">
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
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>
          {alertMessage[alertType]}
        </AlertModal>
      )}
    </div>
  );
};

export default TimeTablePicker;
