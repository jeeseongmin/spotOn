import { MouseEvent, useEffect, useState } from "react";

import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";

import { fetchPlace } from "@/apis/place";
import { postReservationsByState } from "@/apis/reservation";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Pagination from "@/components/Pagination";
import ReservationTable from "@/pages/Admin/components/ReservationInfo/ReservationTable";
import TableFilterButton from "@/pages/Admin/components/TableFilterButton";
import DatePickerButton from "@/pages/Reservation/components/DropdownDatePicker";
import { ReservationByState, ReservationStateCode } from "@/types/reservation";

const filterButtons = [
  { name: "승인 요청", type: "request" },
  { name: "승인 완료", type: "approve" },
  { name: "승인 반려", type: "reject" },
  { name: "예약 취소", type: "cancel" },
];

const today = dayjs();

const ReservationInfo = () => {
  const { control, getValues, setValue } =
    useForm({
      defaultValues: {
        plcCd: {
          id: "all",
          name: "장소 선택",
        },
        fromDate: today,
        toDate: today.add(30, "day"),
      },
    });

  const [placeList, setPlaceList] = useState<any[]>([]);

  const [reservations, setReservations] = useState<ReservationByState[]>([]);
  const [selectedSttCd, setSelectedSttCd] = useState<
    ReservationStateCode | "all"
  >("all");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  // 예약 내역 리스트 가져오는 API
  const getReservations = async () => {
    const plcCd = getValues("plcCd").id;
    const fromDate = getValues("fromDate").format("YYYYMMDD");
    const toDate = getValues("toDate").format("YYYYMMDD");

    const { content, totalElements, totalPages } =
      await postReservationsByState(
        page,
        10,
        selectedSttCd,
        plcCd,
        fromDate,
        toDate,
      );
    setReservations(content);
    setPageCount(totalPages);
    selectedSttCd === "request" && setRequestCount(totalElements);
  };

  useEffect(() => {
    getPlaceList();
  }, []);

  const getPlaceList = async () => {
    const bldCd ='all';
    const res = await fetchPlace(bldCd);
    let list: any = [];
    res.map(elem => {
      list.push(...elem.places);
    });
    const _placeList = list.map((place: any) => {
      return {
        id: place.plcCd,
        name: place.plcNm,
      };
    });
    setPlaceList([{ id: "all", name: "전체" }, ..._placeList]);
  };

  const getRequestCount = async () => {
    const { totalElements } = await postReservationsByState(
      page,
      10,
      "request",
    );
    setRequestCount(totalElements);
  };

  const handleClickFilterButton = (e: MouseEvent<HTMLButtonElement>) => {
    const filterType = e.currentTarget.dataset.filter as
      | ReservationStateCode
      | "all";

    setSelectedSttCd(filterType);
    setValue("plcCd", { id: "all", name: "전체" });
    setValue("fromDate", dayjs());
    setValue("toDate", dayjs().add(30, "day"));
    setPage(0);
  };

  const updateReservations = () => {
    getReservations();
  };

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSttCd, page]);

  useEffect(() => {
    getRequestCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 p-4 text-base text-black">
      <div className="flex flex-row justify-between">
        <div className="relative flex gap-2">
          <TableFilterButton
            data-filter="all"
            isActive={selectedSttCd === "all"}
            onClick={handleClickFilterButton}
          >
            전체
          </TableFilterButton>
          <div className="mx-1 border-r border-gray-dull"></div>
          {filterButtons.map(({ name, type }) => (
            <TableFilterButton
              data-filter={type}
              className="px-2 text-small"
              isActive={selectedSttCd === type}
              isNew={type === "request" && requestCount > 0}
              onClick={handleClickFilterButton}
            >
              {name}
            </TableFilterButton>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-row flex-wrap items-center gap-2">
        <div className="w-40">
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
                disabled={false || placeList.length === 0}
                onChangeOption={onChange}
                selectedOption={value.name}
              />
            )}
          />
        </div>
        
        <div className="w-40">
          <Controller
            name="fromDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePickerButton
                date={value}
                onChange={e => {
                  onChange(e);
                }}
              />
            )}
          />
        </div>
        <div className="w-40">
          <Controller
            name="toDate"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <DatePickerButton
                  date={value}
                  startDate={value}
                  onChange={e => {
                    onChange(e);
                  }}
                />
              );
            }}
          />
        </div>

        <div className="">
          <Button variant="outlined" onClick={() => getReservations()}>
            조회
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 bg-white px-3 py-4">
        <ReservationTable
          reservations={reservations}
          updateReservations={updateReservations}
        />
        {pageCount > 0 && (
          <Pagination count={pageCount} page={page} onChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default ReservationInfo;
