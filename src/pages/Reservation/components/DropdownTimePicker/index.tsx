import { useEffect } from "react";

import dayjs from "dayjs";

import Dropdown from "@/pages/Reservation/components/DropdownTimePicker/Dropdown";

interface DropdownTimePickerProps {
  selectedDate: Date;
  selectedTimes: number[];
  onChange: (newSelectedTimes: number[]) => void;
  limitTime?: number;
}

const DropdownTimePicker = ({
  selectedDate,
  selectedTimes,
  onChange,
  limitTime,
}: DropdownTimePickerProps) => {
  const [startTime, endTime] = selectedTimes;
  const getStartTime = () => {
    const isToday = dayjs(selectedDate).isSame(dayjs(), "day");

    return isToday ? Math.max(dayjs().hour() + 1, 6) : 6;
  };

  const handleChangeStartTime = (time: number) => {
    const newEndTime = time + endTime - startTime;

    onChange([time, newEndTime > 24 ? 24 : newEndTime]);
  };

  const handleChangeEndTime = (time: number) => {
    if (limitTime && time - startTime > limitTime) {
      alert(`${limitTime}시간까지 선택 가능합니다.`);
      return;
    }

    onChange([startTime, time]);
  };

  useEffect(() => {
    onChange([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div className="mt-6 flex flex-col gap-10">
      <div className="flex w-full items-center gap-10">
        <div>시작 시간</div>
        <Dropdown
          selectedOption={selectedTimes[0]}
          onChangeOption={handleChangeStartTime}
          startTime={getStartTime()}
          endTime={23}
        />
      </div>
      <div className="flex w-full items-center gap-10">
        <div>종료 시간</div>
        <Dropdown
          selectedOption={selectedTimes[1]}
          onChangeOption={handleChangeEndTime}
          startTime={Math.round(startTime)}
          endTime={24}
          totalTime={endTime - startTime}
        />
      </div>
    </div>
  );
};

export default DropdownTimePicker;