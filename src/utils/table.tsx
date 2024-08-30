import dayjs from "dayjs";
import { RiDeleteBin6Line } from "react-icons/ri";

import type {
  ReservationByState,
  ReservationStateCode,
} from "@/types/reservation";
import type { CellInfo } from "@/types/table";
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

export const getReservationBodyData = (
  reservation: ReservationByState,
  type: ReservationStateCode,
  method1: () => void,
  method2: () => void,
) => {
  const { rsvtDt, startTime, endTime, plcCd, plcNm, userName, useCnts, cmtNm } =
    reservation;
  const methodColumn =
    type === "request"
      ? [
          { data: "승인", method: method1 },
          { data: "거절", method: method2 },
        ]
      : [
          { data: "상세", method: method1 },
          {
            data: <RiDeleteBin6Line size={16} className="text-red" />,
            method: method2,
          },
        ];

  return [
    { data: dayjs(rsvtDt).locale("ko").format("YYYY / MM / DD (ddd)") },
    { data: convertTimeRangeToHHMM(startTime, endTime) },
    { data: formatLocationWithFloor(plcCd, plcNm) },
    { data: cmtNm },
    { data: userName },
    { data: useCnts },
    ...methodColumn,
  ];
};
