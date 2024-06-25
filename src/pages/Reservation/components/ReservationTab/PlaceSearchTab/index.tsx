import { useEffect } from "react";

import type { Dayjs } from "dayjs";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import DatePicker from "@/components/DatePicker";
import { type SelectedPlace, placesByFloor } from "@/dummy/places";
import { reservedTimes } from "@/dummy/reservation";
import PlacePicker from "@/pages/Reservation/components/PlacePicker";
import TimeTablePicker from "@/pages/Reservation/components/ReservationTab/PlaceSearchTab/TimeTablePicker";
import ReservationTabLayout from "@/pages/Reservation/components/ReservationTab/ReservationTabLayout";
import useCalendarStore from "@/store/calendarStore";

const PlaceSearchTab = () => {
  const { control, getValues, reset, resetField } = useFormContext();
  useWatch({ name: "place" });
  const resetFirstDayOfMonth = useCalendarStore(
    state => state.resetFirstDayOfMonth,
  );

  const timeSelectErrorMessage = getValues("place")
    ? ""
    : "*날짜와 장소를 선택한 후 시간 선택이 가능합니다.";

  useEffect(() => {
    reset();
    resetFirstDayOfMonth();
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
      <ReservationTabLayout.Right title="장소 선택">
        <Controller
          name="place"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => {
            const handleChangePlace = (place: SelectedPlace) => {
              onChange(place);
              resetField("time");
              resetField("purpose");
            };

            return (
              <PlacePicker
                placesByFloor={placesByFloor}
                selectedPlace={value}
                onChange={handleChangePlace}
              />
            );
          }}
        />
      </ReservationTabLayout.Right>
      <ReservationTabLayout.Bottom
        title="예약 시간 선택"
        errorMessage={timeSelectErrorMessage}
      >
        {getValues("place") && (
          <Controller
            name="time"
            rules={{ required: true }}
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
