import Tab from "@/components/Tab";
import ApproveReservationTable from "@/pages/Admin/components/ReservationInfo/ApproveReservationTable";
import RequestReservationTable from "@/pages/Admin/components/ReservationInfo/RequestReservationTable";

const ReservationInfo = () => {
  return (
    <div>
      <div className="relative flex p-4">
        <Tab variant="solid" className="mt-4 flex" querystringKey="subTab">
          <Tab.Item label="승인 요청" className="px-2 text-small">
            <RequestReservationTable />
          </Tab.Item>
          <Tab.Divider />
          <Tab.Item label="전체">
            <ApproveReservationTable />
          </Tab.Item>
          {/* <Tab.Item label="일반 예약" className="px-2 text-small"></Tab.Item>
          <Tab.Item label="반복 예약" className="px-2 text-small"></Tab.Item> */}
        </Tab>
      </div>
    </div>
  );
};

export default ReservationInfo;
