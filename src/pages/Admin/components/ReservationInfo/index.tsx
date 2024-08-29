import Tab from "@/components/Tab";
import ReservationTable from "@/pages/Admin/components/ReservationInfo/ReservationTable";

const ReservationInfo = () => {
  return (
    <div>
      <div className="relative flex p-4">
        <Tab variant="solid" className="mt-4 flex" querystringKey="subTab">
          <Tab.Item label="승인 요청" className="px-2 text-small"></Tab.Item>
          <Tab.Divider />
          <Tab.Item label="전체">
            <ReservationTable />
          </Tab.Item>
          <Tab.Item label="일반 예약" className="px-2 text-small"></Tab.Item>
          <Tab.Item label="반복 예약" className="px-2 text-small"></Tab.Item>
        </Tab>
      </div>
    </div>
  );
};

export default ReservationInfo;
