import Tab from "@/components/Tab";

import PlaceSearchTab from "./PlaceSearchTab";
import RecurringReservationTab from "./RecurringReservationTab";
import TimeSearchTab from "./TimeSearchTab";

const ReservationTab = () => {
  return (
    <Tab variant="enclosed">
      <Tab.Item label="장소로 예약">
        <PlaceSearchTab />
      </Tab.Item>
      <Tab.Item label="시간으로 예약">
        <TimeSearchTab />
      </Tab.Item>
      <Tab.Item label="반복 예약">
        <RecurringReservationTab />
      </Tab.Item>
    </Tab>
  );
};

export default ReservationTab;