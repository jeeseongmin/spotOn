import { useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useSearchParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { getMonthlyReservation } from "@/apis/reservation";
import { fetchPlace } from "@/apis/place";
import Button from "@/components/Button";
import DropdownYearMonthPicker from "@/components/DatePicker/DropdownYearMonthPicker";
import Dropdown from "@/components/Dropdown/Dropdown";
import Reservation from "@/components/Schedule/Reservation";
import { scheduleYears } from "@/constants/calendar";
import { vehicleDummyData } from "@/data/vehicleDummyData";
import Calendar from "@/pages/Home/components/Calendar";
import useCalendarStore from "@/store/calendarStore";
import type { DailyReservation, DailyReservationData, ReservationStateCode } from "@/types/reservation";
import type { VehicleReservationStatus } from "@/types/vehicleReservation";
import { Controller, useForm, useWatch } from "react-hook-form";

const vehicleStatusToSttCd: Record<VehicleReservationStatus, ReservationStateCode> = {
  pending: "request",
  approved: "approve",
  rejected: "reject",
  cancelled: "cancel",
};

const convertVehicleToMonthly = (month: dayjs.Dayjs): DailyReservation[] => {
  const filtered = vehicleDummyData.filter(r =>
    dayjs(r.reservationDate).isSame(month, "month"),
  );

  const grouped = new Map<string, DailyReservationData[]>();
  filtered.forEach(r => {
    const [start, end] = r.drivingTime.split(" ~ ");
    const data: DailyReservationData = {
      rsvtId: r.id,
      useCnts: r.purpose,
      plcCd: "",
      plcNm: r.destination,
      rsvtDt: dayjs(r.reservationDate).format("YYYYMMDD"),
      startTime: start.replace(":", "") + "00",
      endTime: end.replace(":", "") + "00",
      mbrId: "",
      userName: r.applicantName,
      sttCd: vehicleStatusToSttCd[r.status],
      telNo: r.applicantPhone,
    };
    const day = r.reservationDate;
    if (!grouped.has(day)) grouped.set(day, []);
    grouped.get(day)!.push(data);
  });

  return Array.from(grouped.entries()).map(([day, data]) => ({ day, data }));
};

const Schedule = () => {
  const [searchParams] = useSearchParams();
  const activeTab = Number(searchParams.get("tab")) || 0;
  const isVehicleTab = activeTab === 1;

  const { control } =
    useForm({
      defaultValues: {
        plcCd: {
          id: "all",
          name: "장소 선택",
        },
      },
    });

  const watchedPlcCd = useWatch({
    control,
    name: "plcCd",
  });

  const [placeList, setPlaceList] = useState<any[]>([]);

  useEffect(() => {
    getPlaceList();
  }, []);

  const getPlaceList = async () => {
    const bldCd ='all';
    const res = await fetchPlace(bldCd);
    const list = res.flatMap(elem => elem.places);

    const _placeList = list.map((place: any) => {
      return {
        id: place.plcCd,
        name: place.plcNm,
      };
    });
    setPlaceList([{ id: "all", name: "전체" }, ..._placeList]);
  };

  useEffect(() => {
    if (isVehicleTab) return;
    if (!watchedPlcCd) return;
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedPlcCd]);

  const [
    date,
    setDate,
    firstDayOfMonth,
    setFirstDayOfMonth,
    resetCalendar,
    setMonthlyReservations,
    monthlyReservations,
  ] = useCalendarStore(
    useShallow(state => [
      state.date,
      state.setDate,
      state.firstDayOfMonth,
      state.setFirstDayOfMonth,
      state.resetCalendar,
      state.setMonthlyReservations,
      state.monthlyReservations,
    ]),
  );

  const [totalCount, setTotalCount] = useState(0);

  // 차량 예약 탭: 더미 데이터를 monthlyReservations 형식으로 변환
  const vehicleMonthlyReservations = useMemo(
    () => convertVehicleToMonthly(firstDayOfMonth),
    [firstDayOfMonth],
  );

  // 탭 전환 시 캘린더 데이터 교체
  useEffect(() => {
    if (isVehicleTab) {
      setMonthlyReservations(vehicleMonthlyReservations);
    } else {
      getReservations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVehicleTab, vehicleMonthlyReservations]);

  useEffect(() => {
    if (monthlyReservations.length > 0) {
      let sum = 0;
      monthlyReservations.map(elem => {
        sum += elem.data.length;
      });
      setTotalCount(sum);
    } else {
      setTotalCount(0);
    }
  }, [monthlyReservations]);

  const goPreviousMonth = () => {
    setMonthlyReservations([]);
    setFirstDayOfMonth(date.date(0).date(1));
    setDate(date.date(0).date(1));
  };

  const goNextMonth = () => {
    setMonthlyReservations([]);
    setFirstDayOfMonth(date.date(date.daysInMonth() + 1));
    setDate(date.date(date.daysInMonth() + 1));
  };

  const getReservations = async () => {
    if (isVehicleTab) return;
    const plcCd = watchedPlcCd?.id ?? "all";
    const reservations = await getMonthlyReservation(
      date.format("YYYYMM"),
      plcCd,
    );
    setMonthlyReservations(reservations);
  };

  useEffect(() => {
    if (isVehicleTab) return;
    if (!watchedPlcCd) return;
        getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedPlcCd,firstDayOfMonth]);

  // 차량 탭에서 월 이동 시 차량 데이터 재설정
  useEffect(() => {
    if (isVehicleTab) {
      setMonthlyReservations(vehicleMonthlyReservations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDayOfMonth]);

  return (
    <div className="h-[622px] rounded-[2px] border border-gray-light px-4 py-3 md:flex-1 md:py-6">
      <div className="relative flex h-full w-full flex-col gap-3 md:gap-6">

        <div className="flex h-8 items-center justify-center gap-2 lg:gap-12">
          <div className="absolute left-0 top-0 h-10">
            <Button
              variant="custom"
              onClick={resetCalendar}
              className="h-8 border border-primary px-2 text-small text-primary drop-shadow-none hover:bg-primary hover:text-white md:text-base lg:px-4"
            >
              오늘
            </Button>
          </div>

          {/* Date Select Action */}
          <Button variant="custom" onClick={goPreviousMonth}>
            <SlArrowLeft className="text-xs md:text-small" />
          </Button>
          <DropdownYearMonthPicker
            years={scheduleYears}
            className="flex text-base font-light leading-5 md:text-xl"
            onClick={setDate}
          />
          <Button variant="custom" onClick={goNextMonth}>
            <SlArrowRight size={13} />
          </Button>

          {!isVehicleTab && (
            <div className="absolute right-0 top-0 h-8 w-full max-w-[6rem] sm:max-w-[8rem] md:max-w-[9rem] lg:max-w-[10rem] z-50">
              <Controller
                control={control}
                name="plcCd"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="plcCd"
                    options={placeList}
                    disabled={placeList.length === 0}
                    onChangeOption={onChange}
                    selectedOption={value?.name || ""}
                  />
                )}
              />
            </div>
          )}

        </div>
        {/* tip */}
        <div className="flex w-full justify-between">
          <Reservation>{isVehicleTab ? "차량 예약건" : "장소 예약건"}</Reservation>
          {totalCount !== 0 && <p className="text-small">총 {totalCount}건</p>}
        </div>

        {/* Calendar */}
        <Calendar />
      </div>
    </div>
  );
};

export default Schedule;