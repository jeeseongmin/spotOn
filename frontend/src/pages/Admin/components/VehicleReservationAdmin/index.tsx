import { MouseEvent, useMemo, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/ko";

import { vehicleDummyData } from "@/data/vehicleDummyData";
import TableFilterButton from "@/pages/Admin/components/TableFilterButton";
import type {
  VehicleReservation,
  VehicleReservationStatus,
} from "@/types/vehicleReservation";

import VehicleReservationTable from "./VehicleReservationTable";

type VehicleFilterType = "all" | "pending" | "approved";

const filterButtons: { name: string; type: VehicleFilterType }[] = [
  { name: "승인 요청", type: "pending" },
  { name: "처리 완료", type: "approved" },
];

dayjs.locale("ko");

const VehicleReservationAdmin = () => {
  const [reservations, setReservations] =
    useState<VehicleReservation[]>(vehicleDummyData);
  const [selectedFilter, setSelectedFilter] = useState<VehicleFilterType>("all");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

  // Count pending requests for badge
  const pendingCount = reservations.filter(r => r.status === "pending").length;

  // Filter reservations
  const filteredReservations = useMemo(() => {
    return reservations
      .filter(r => {
        // Month filter
        if (!r.reservationDate.startsWith(selectedMonth)) return false;
        // Status filter
        if (selectedFilter === "all") return true;
        if (selectedFilter === "pending") return r.status === "pending";
        if (selectedFilter === "approved")
          return (
            r.status === "approved" ||
            r.status === "rejected" ||
            r.status === "cancelled"
          );
        return true;
      })
      .sort(
        (a, b) =>
          new Date(a.reservationDate).getTime() -
          new Date(b.reservationDate).getTime(),
      );
  }, [reservations, selectedFilter, selectedMonth]);

  const handleUpdateStatus = (
    id: number,
    status: VehicleReservationStatus,
    reason?: string,
  ) => {
    setReservations(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, status, ...(reason ? { rejectReason: reason } : {}) }
          : r,
      ),
    );
  };

  const handleClickFilterButton = (e: MouseEvent<HTMLButtonElement>) => {
    const filterType = e.currentTarget.dataset.filter as VehicleFilterType;
    setSelectedFilter(filterType);
  };

  // Generate month options (current month + next month)
  const monthOptions = useMemo(() => {
    const now = dayjs();
    return [now.format("YYYY-MM"), now.add(1, "month").format("YYYY-MM")];
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Filters */}
      <div className="flex flex-row justify-between">
        <div className="relative flex gap-2">
          <TableFilterButton
            data-filter="all"
            isActive={selectedFilter === "all"}
            onClick={handleClickFilterButton}
          >
            전체
          </TableFilterButton>
          <div className="mx-1 border-r border-gray-dull"></div>
          {filterButtons.map(({ name, type }) => (
            <TableFilterButton
              key={type}
              data-filter={type}
              className="px-2 text-small"
              isActive={selectedFilter === type}
              isNew={type === "pending" && pendingCount > 0}
              onClick={handleClickFilterButton}
            >
              {name}
            </TableFilterButton>
          ))}
        </div>
      </div>

      {/* Month selector */}
      <div className="flex flex-1 flex-row flex-wrap items-center gap-2">
        <select
          className="rounded-sm border border-gray-dull px-3 py-1.5 text-small"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
        >
          {monthOptions.map(m => (
            <option key={m} value={m}>
              {dayjs(m).format("YYYY년 M월")}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <VehicleReservationTable
        reservations={filteredReservations}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default VehicleReservationAdmin;
