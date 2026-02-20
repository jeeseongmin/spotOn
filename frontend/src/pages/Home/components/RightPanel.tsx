import Tab from "@/components/Tab";
import DailyReservationList from "@/pages/Home/components/DailyReservationList";
import VehicleDailyReservationList from "@/pages/Home/components/VehicleDailyReservationList";

const RightPanel = () => {
  return (
    <div className="h-fit w-full rounded-sm bg-white-dull px-4 pb-4 drop-shadow-base md:h-[622px] md:w-[345px]">
      <Tab variant="underlined">
        <Tab.Item label="장소 예약">
          <DailyReservationList />
        </Tab.Item>
        <Tab.Item label="차량 예약">
          <VehicleDailyReservationList />
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default RightPanel;
