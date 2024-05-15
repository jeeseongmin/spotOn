import {
  ComponentPropsWithoutRef,
  MouseEvent,
  MouseEventHandler,
  useRef,
} from "react";

import { MdAccessTime } from "react-icons/md";

import useModal from "@/hooks/useModal";
import { useOutSideClick } from "@/hooks/useOutSideClick";
import { cn } from "@/utils/cn";

interface OptionProps extends ComponentPropsWithoutRef<"button"> {
  option: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Option = ({
  option,
  isSelected,
  isDisabled = false,
  onClick,
  ...props
}: OptionProps) => {
  const selectedStyle = "bg-primary text-white border border-primary";
  const nonSelectedStyle = "bg-white text-black";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "z-20 flex w-full select-none items-center justify-center rounded-sm py-2.5 text-small font-light",
        isSelected ? selectedStyle : nonSelectedStyle,
        isDisabled && "text-gray-middle",
      )}
      disabled={isDisabled}
      {...props}
    >
      {option}
    </button>
  );
};

interface DropdownProps {
  selectedOption: number;
  onChangeOption: (option: number) => void;
  startTime: number;
  endTime: number;
  totalTime?: number;
}

const Dropdown = ({
  selectedOption,
  onChangeOption,
  startTime,
  endTime,
  totalTime,
}: DropdownProps) => {
  const placeholder = "-- --:--";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsModal = useModal();
  useOutSideClick(dropdownRef, () => optionsModal.onClose());

  const hour = Math.floor(selectedOption);
  const convertHourToText = (hour: number) =>
    hour < 10 ? `0${hour}` : String(hour);
  const hourOptions = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => {
      const hourOption = index + startTime;

      return convertHourToText(hourOption);
    },
  );
  const minuteOptions = ["00", "30"];

  const getMinuteToNumber = (time: number) => (time % 1 > 0 ? 0.5 : 0);
  const getMinuteToString = (time: number) => {
    if (!time) return;

    return time % 1 > 0 ? "30" : "00";
  };

  const convertTimeToText = (time: number) => {
    const totalHour = Math.floor(time);

    if (time % 1 > 0) {
      return totalHour > 0 ? `(${totalHour}시간 30분)` : "(30분)";
    }

    return `(${totalHour}시간)`;
  };
  const getIsDisabledOption = (option: string) => {
    const isSameStartTime =
      totalTime !== undefined && hour === startTime && option === "00";
    const isMidnight =
      totalTime !== undefined && hour === 24 && option === "30";

    if (isSameStartTime) return true;
    if (isMidnight) return true;

    return false;
  };

  const timeText = totalTime ? convertTimeToText(totalTime) : "";

  const onClickOption = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const value = target.innerText;

    if (target.name === "hour") {
      const isSameStartTime =
        totalTime !== undefined &&
        parseInt(value) === startTime &&
        getMinuteToNumber(selectedOption) === 0;
      const isMidnight = !!(
        totalTime !== undefined &&
        parseInt(value) === 24 &&
        getMinuteToNumber(selectedOption) === 0.5
      );
      const minute = isSameStartTime
        ? 0.5
        : isMidnight
          ? 0
          : getMinuteToNumber(selectedOption);

      onChangeOption(parseInt(value) + minute);
    } else {
      const newMinute = value === "00" ? 0 : 0.5;

      onChangeOption(hour + newMinute);
    }
  };

  return (
    <div ref={dropdownRef} className="relative h-10">
      <div className="absolute left-0 top-11 z-50 flex h-auto w-fit flex-col overflow-hidden">
        <div
          className={cn(
            "hidden max-h-[245px] w-[97px] animate-dropdown-open bg-white drop-shadow-lg *:grow",
            optionsModal.isOpen && "flex",
          )}
        >
          <div className={cn("flex-col overflow-y-scroll scrollbar-hide")}>
            {hourOptions.map(option => (
              <Option
                key={option}
                name="hour"
                option={String(option)}
                isSelected={convertHourToText(hour) === option}
                onClick={onClickOption}
              />
            ))}
          </div>
          <div className="flex-col overflow-y-scroll scrollbar-hide">
            {minuteOptions.map(option => (
              <Option
                key={option}
                name="minute"
                option={String(option)}
                isSelected={getMinuteToString(selectedOption) === option}
                isDisabled={getIsDisabledOption(option)}
                onClick={onClickOption}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={cn(
          "absolute top-0 z-40 flex h-10 w-[223px] select-none items-center justify-between gap-4 rounded-sm border border-gray-middle bg-white px-3 py-2.5 text-small",
          selectedOption ? "text-black" : "text-gray-dull",
        )}
        onClick={() => {
          if (!startTime) {
            alert("시작 시간을 선택하세요.");
            return;
          }

          optionsModal.onToggle();
        }}
      >
        <div>
          <span>
            {selectedOption
              ? `${hour} : ${getMinuteToString(selectedOption)}`
              : placeholder}
          </span>
          <span className="mx-5 text-gray-dark">{timeText}</span>
        </div>
        <MdAccessTime size={14} className="text-black" />
      </button>
    </div>
  );
};

export default Dropdown;
