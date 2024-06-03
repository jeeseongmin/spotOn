import { Dayjs } from "dayjs";

import Button from "@/components/Button";
import { daysOfTheWeek, orderText } from "@/constants/calendar";
import { getWeekOrder } from "@/utils/calendar";
import { cn } from "@/utils/cn";

interface SelectRepeatTypeProps {
  typeObj: TypeObj;
  selectedDate: Dayjs;
  onChange: (typeObj: TypeObj) => void;
}

type TypeObj = {
  type: string;
  option: string;
};

const SelectRepeatType = ({
  typeObj,
  selectedDate,
  onChange,
}: SelectRepeatTypeProps) => {
  const selectedStyle = "bg-primary text-white border-primary";
  const customButtonStyle = "border border-gray-middle drop-shadow-none";
  const customDayButtonStyle = "px-[10px]";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <Button
          variant="outlined"
          className={cn(
            customButtonStyle,
            `${typeObj.type === "daily" && selectedStyle}`,
          )}
          onClick={() => onChange({ ...typeObj, type: "daily" })}
        >
          매일
        </Button>
        <Button
          variant="outlined"
          className={cn(
            customButtonStyle,
            `${typeObj.type === "weekly" && selectedStyle}`,
          )}
          onClick={() => onChange({ ...typeObj, type: "weekly" })}
        >
          매주
        </Button>
        <Button
          variant="outlined"
          className={cn(
            customButtonStyle,
            `${typeObj.type === "monthly" && selectedStyle}`,
          )}
          onClick={() => onChange({ ...typeObj, type: "monthly" })}
        >
          매월
        </Button>
      </div>
      {typeObj.type === "weekly" && (
        <div className="flex flex-row flex-wrap gap-2">
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === "sunday" && selectedStyle}`,
            )}
            onClick={() => onChange({ ...typeObj, option: "sunday" })}
          >
            일
          </Button>
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === "monday" && selectedStyle}`,
            )}
            onClick={() => onChange({ ...typeObj, option: "monday" })}
          >
            월
          </Button>
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === "tuesday" && selectedStyle}`,
            )}
            onClick={() => onChange({ ...typeObj, option: "tuesday" })}
          >
            화
          </Button>

          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === "wednesday" && selectedStyle}`,
            )}
            onClick={() => onChange({ ...typeObj, option: "wednesday" })}
          >
            수
          </Button>

          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === "thursday" && selectedStyle}`,
            )}
            onClick={() => onChange({ ...typeObj, option: "thursday" })}
          >
            목
          </Button>
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === "friday" && selectedStyle}`,
            )}
            onClick={() => onChange({ ...typeObj, option: "friday" })}
          >
            금
          </Button>
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === "saturday" && selectedStyle}`,
            )}
            onClick={() => onChange({ ...typeObj, option: "saturday" })}
          >
            토
          </Button>
        </div>
      )}
      {typeObj.type === "monthly" && (
        <div className="flex flex-row flex-wrap gap-2">
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === String(selectedDate.date()) && selectedStyle}`,
            )}
            onClick={() =>
              onChange({ ...typeObj, option: String(selectedDate.date()) })
            }
          >
            {selectedDate.date()}일
          </Button>
          <Button
            variant="outlined"
            className={cn(
              customButtonStyle,
              customDayButtonStyle,
              `${typeObj.option === getWeekOrder(selectedDate) + "-" + selectedDate.day() && selectedStyle}`,
            )}
            onClick={() =>
              onChange({
                ...typeObj,
                option: getWeekOrder(selectedDate) + "-" + selectedDate.day(),
              })
            }
          >
            {/* {weekInfoText} */}
            {`${orderText[getWeekOrder(selectedDate) as number]} ${daysOfTheWeek[selectedDate.day()]}요일`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectRepeatType;
