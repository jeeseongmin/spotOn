import { Controller, useFormContext, useWatch } from "react-hook-form";

import DatePicker from "@/components/DatePicker";
import { placesByFloor } from "@/dummy/places";
import { reservedTimes } from "@/dummy/reservation";
import PlacePicker from "@/pages/Reservation/components/PlacePicker";

import ReservationTabLayout from "../ReservationTabLayout";
import TimeTablePicker from "./TimeTablePicker";

const PlaceSearchTab = () => {
  const { control, getValues } = useFormContext();
  useWatch({ name: "place" });

  const timeSelectErrorMessage = getValues("place")
    ? ""
    : "*날짜와 장소를 선택한 후 시간 선택이 가능합니다.";

  return (
    <ReservationTabLayout>
      <ReservationTabLayout.Left title="날짜 선택">
        <Controller
          name="date"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker date={value} onChange={onChange} />
          )}
        />
      </ReservationTabLayout.Left>
      <ReservationTabLayout.Right title="장소 선택">
        <Controller
          name="place"
          control={control}
          render={({ field: { value, onChange } }) => (
            <PlacePicker
              placesByFloor={placesByFloor}
              selectedPlace={value}
              onChange={onChange}
            />
          )}
        />
      </ReservationTabLayout.Right>
      <ReservationTabLayout.Bottom
        title="예약 시간 선택"
        errorMessage={timeSelectErrorMessage}
      >
        {getValues("place") && (
          <Controller
            name="time"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TimeTablePicker
                selectedDate={getValues("date")}
                reservedTimes={reservedTimes}
                selectedTimes={value}
                onChange={onChange}
              />
            )}
          />
        )}
      </ReservationTabLayout.Bottom>
    </ReservationTabLayout>
  );
};

export default PlaceSearchTab;
