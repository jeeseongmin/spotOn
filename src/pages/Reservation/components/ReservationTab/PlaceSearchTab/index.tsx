import { Controller, useFormContext, useWatch } from "react-hook-form";

import DatePicker from "@/components/DatePicker";
import { placesByFloor } from "@/dummy/places";
import { reservedTimes } from "@/dummy/reservation";
import { ReservationLabel } from "@/pages/Reservation";

import PlaceSelect from "../../PlacePicker";
import TimeSelect from "./TimeSelect";

const PlaceSearchTab = () => {
  const { control, getValues } = useFormContext();
  useWatch({ name: "place" });

  return (
    <div>
      <div className="flex h-[432px] border-b border-b-gray-middle">
        <div className="flex flex-col gap-2 border-r border-r-gray-middle px-12 py-4">
          <ReservationLabel>날짜 선택</ReservationLabel>
          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker date={value} onChange={onChange} />
            )}
          />
        </div>
        <div className="flex flex-col gap-2 px-8 py-4">
          <ReservationLabel>장소 선택</ReservationLabel>
          <Controller
            name="place"
            control={control}
            render={({ field: { value, onChange } }) => (
              <PlaceSelect
                placesByFloor={placesByFloor}
                selectedPlace={value}
                onChange={onChange}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-12 py-4">
        <div className="flex gap-10">
          <ReservationLabel>예약 시간 선택</ReservationLabel>
          {!getValues("place") && (
            <div className="text-small text-[#FF8080]">
              *날짜와 장소를 선택한 후 시간 선택이 가능합니다.
            </div>
          )}
        </div>
        {getValues("place") && (
          <Controller
            name="time"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TimeSelect
                selectedDate={getValues("date")}
                reservedTimes={reservedTimes}
                selectedTimes={value}
                onChange={onChange}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default PlaceSearchTab;
