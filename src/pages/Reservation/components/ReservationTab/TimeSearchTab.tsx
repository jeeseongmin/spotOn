import { useEffect } from "react";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import DatePicker from "@/components/DatePicker";
import { availablePlaces, placesByFloor } from "@/dummy/places";

import DropdownTimePicker from "../DropdownTimePicker";
import PlacePicker from "../PlacePicker";
import ReservationTabLayout from "./ReservationTabLayout";

const TimeSearchTab = () => {
  const { control, getValues, reset } = useFormContext();
  useWatch({ name: ["date", "time"] });

  const isSelectedTime =
    getValues("time").length > 0 &&
    getValues("time").every((value: number) => !Number.isNaN(value));

  const placeSelectErrorMessage = isSelectedTime
    ? ""
    : "*날짜와 시간을 선택한 후 장소 선택이 가능합니다.";

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <ReservationTabLayout.Right title="시간 선택">
        <Controller
          name="time"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DropdownTimePicker
              selectedDate={getValues("date")}
              selectedTimes={value}
              onChange={onChange}
            />
          )}
        />
      </ReservationTabLayout.Right>
      <ReservationTabLayout.Bottom
        title="장소 선택"
        errorMessage={placeSelectErrorMessage}
      >
        {isSelectedTime && (
          <Controller
            name="place"
            control={control}
            render={({ field: { value, onChange } }) => (
              <PlacePicker
                placesByFloor={placesByFloor}
                selectedPlace={value}
                onChange={onChange}
                availablePlaces={availablePlaces}
              />
            )}
          />
        )}
      </ReservationTabLayout.Bottom>
    </ReservationTabLayout>
  );
};

export default TimeSearchTab;
