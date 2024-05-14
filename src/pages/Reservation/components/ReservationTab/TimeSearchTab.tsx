import { Controller, useFormContext } from "react-hook-form";

import DatePicker from "@/components/DatePicker";
import { placesByFloor } from "@/dummy/places";

import PlacePicker from "../PlacePicker";
import ReservationTabLayout from "./ReservationTabLayout";

const TimeSearchTab = () => {
  const { control } = useFormContext();

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
        <div></div>
      </ReservationTabLayout.Right>
      <ReservationTabLayout.Bottom title="장소 선택">
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
      </ReservationTabLayout.Bottom>
    </ReservationTabLayout>
  );
};

export default TimeSearchTab;
