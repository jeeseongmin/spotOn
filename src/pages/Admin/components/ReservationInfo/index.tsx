import { MouseEvent, useState } from "react";

import ReservationTable from "@/pages/Admin/components/ReservationInfo/ReservationTable";
import TableFilterButton from "@/pages/Admin/components/TableFilterButton";
import { ReservationStateCode } from "@/types/reservation";

const filterButtons = [
  { name: "승인 요청", type: "request" },
  { name: "승인 완료", type: "approve" },
  { name: "승인 반려", type: "reject" },
  { name: "예약 취소", type: "cancel" },
];

const ReservationInfo = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    ReservationStateCode | "all"
  >("all");

  const handleClickFilterButton = (e: MouseEvent<HTMLButtonElement>) => {
    const filterType = e.currentTarget.dataset.filter as
      | ReservationStateCode
      | "all";

    setSelectedFilter(filterType);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4 text-base text-black">
      <div className="relative flex gap-2">
        <TableFilterButton
          data-filter="all"
          active={selectedFilter === "all"}
          onClick={handleClickFilterButton}
        >
          전체
        </TableFilterButton>
        <div className="mx-1 border-r border-gray-dull"></div>
        {filterButtons.map(({ name, type }) => (
          <TableFilterButton
            data-filter={type}
            className="px-2 text-small"
            active={selectedFilter === type}
            onClick={handleClickFilterButton}
          >
            {name}
          </TableFilterButton>
        ))}
      </div>
      <div className="bg-white px-3 py-4">
        <ReservationTable type={selectedFilter} />
      </div>
    </div>
  );
};

export default ReservationInfo;
