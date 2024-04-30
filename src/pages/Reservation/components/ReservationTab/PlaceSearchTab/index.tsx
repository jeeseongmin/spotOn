import { useState } from "react";

import DatePicker from "@/components/DatePicker";
import { placesByFloor } from "@/dummy/places";
import { ReservationLabel } from "@/pages/Reservation";

import PlaceSelect from "../../PlaceSelect";
import TimeSelect from "./TimeSelect";

const PlaceSearchTab = () => {
  const [date, setDate] = useState(new Date());
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

  return (
    <div>
      <div className="flex h-[432px] border-b border-b-gray-middle">
        <div className="flex flex-col gap-2 border-r border-r-gray-middle px-12 py-4">
          <ReservationLabel>날짜 선택</ReservationLabel>
          <DatePicker date={date} onChange={setDate} />
        </div>
        <div className="flex flex-col gap-2 px-8 py-4">
          <ReservationLabel>장소 선택</ReservationLabel>
          <PlaceSelect
            placesByFloor={placesByFloor}
            selectedPlace={selectedPlace}
            onChange={setSelectedPlace}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-12 py-4">
        <ReservationLabel>예약 시간 선택</ReservationLabel>
        <TimeSelect
          selectedDate={new Date()}
          reservedTimes={[19, 19.5, 20]}
          selectedTimes={selectedTimes}
          onChange={setSelectedTimes}
        />
      </div>
    </div>
  );
};

export default PlaceSearchTab;
