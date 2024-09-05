import Tab from "@/components/Tab";
import DailyReservationList from "@/pages/Home/components/DailyReservationList";

const RightPanel = () => {
  return (
    <div className="h-[622px] w-[345px] rounded-[2px] bg-white-dull px-4 drop-shadow-base">
      <Tab variant="underlined">
        <Tab.Item label="예약 현황">
          <DailyReservationList />
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default RightPanel;
