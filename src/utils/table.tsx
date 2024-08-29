import dayjs from "dayjs";
import { RiDeleteBin6Line } from "react-icons/ri";

import { ReservationByState } from "@/types/reservation";
import { CellInfo } from "@/types/table";
import {
  convertTimeRangeToHHMM,
  formatLocationWithFloor,
} from "@/utils/reservation";

export const getTableHeader = (headerList: string[]) => {
  return headerList.map((item: string) => {
    return {
      type: "header",
      name: item,
    };
  });
};

export const getTableBody = (
  titleList: string[],
  contentList: CellInfo[][],
) => {
  return contentList.map(items => {
    return items.map((item, index) => {
      return {
        ...item,
        name: titleList[index],
        type: "body",
      };
    });
  });
};

export const getReservationBodyData = (reservations: ReservationByState[]) =>
  reservations.map(reservation => {
    const {
      rsvtId,
      rsvtDt,
      startTime,
      endTime,
      plcCd,
      plcNm,
      userName,
      useCnts,
      telNo,
      cmtNm,
      garNm,
      leafNm,
    } = reservation;

    return [
      { data: dayjs(rsvtDt).locale("ko").format("YYYY / MM / DD (ddd)") },
      { data: convertTimeRangeToHHMM(startTime, endTime) },
      { data: formatLocationWithFloor(plcCd, plcNm) },
      { data: cmtNm },
      { data: userName },
      { data: useCnts },
      { data: "상세", method: () => alert("예약 상세 Modal") },
      {
        data: <RiDeleteBin6Line size={16} className="text-red" />,
        method: () => alert("삭제"),
      },
    ];
  });
