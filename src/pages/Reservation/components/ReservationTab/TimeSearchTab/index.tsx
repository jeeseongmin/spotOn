import { useEffect } from "react";

import type { Dayjs } from "dayjs";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import DatePicker from "@/components/DatePicker";
import { availablePlaces, placesByFloor } from "@/dummy/places";
import DropdownTimePicker from "@/pages/Reservation/components/DropdownTimePicker";
import PlacePicker from "@/pages/Reservation/components/PlacePicker";
import ReservationTabLayout from "@/pages/Reservation/components/ReservationTab/ReservationTabLayout";

const TimeSearchTab = () => {
  const { control, getValues, reset, resetField } = useFormContext();
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
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => {
            const handleChangeDate = (date: Dayjs) => {
              onChange(date);
              resetField("place");
              resetField("time");
              resetField("purpose");
            };

            return <DatePicker date={value} onChange={handleChangeDate} />;
          }}
        />
      </ReservationTabLayout.Left>
      <ReservationTabLayout.Right title="시간 선택">
        <Controller
          name="time"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => {
            const handleChangeTime = (time: number[]) => {
              onChange(time);
              resetField("place");
              resetField("purpose");
            };

            return (
              <DropdownTimePicker
                selectedDate={getValues("date")}
                selectedTimes={value}
                onChange={handleChangeTime}
                limitTime={2}
              />
            );
          }}
        />
      </ReservationTabLayout.Right>
      <ReservationTabLayout.Bottom
        title="장소 선택"
        errorMessage={placeSelectErrorMessage}
      >
        {isSelectedTime && (
          <Controller
            name="place"
            rules={{ required: true }}
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
