import dayjs from "dayjs";
import { RiDeleteBin6Line } from "react-icons/ri";

import { RESERVATION_STATE } from "@/constants/common";
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
  stateCode: ReservationStateCode,
  detailsMethod?: () => void,
  approveMethod?: () => void,
  rejectMethod?: () => void,
) => {
  const {
    rsvtDt,
    startTime,
    endTime,
    plcCd,
    plcNm,
    userName,
    sttCd,
    useCnts,
    cmtNm,
  } = reservation;

  const methodColumn =
    stateCode === "approve"
      ? [
          { data: "상세", method: detailsMethod },
          {
            data: <RiDeleteBin6Line size={16} className="text-red" />,
            method: rejectMethod,
          },
        ]
      : [
          { data: "승인", method: approveMethod },
          { data: "거절", method: rejectMethod },
        ];

  return [
    { data: dayjs(rsvtDt).locale("ko").format("YYYY / MM / DD (ddd)") },
    { data: convertTimeRangeToHHMM(startTime, endTime) },
    { data: formatLocationWithFloor(plcCd, plcNm) },
    { data: cmtNm },
    { data: userName },
    { data: RESERVATION_STATE[sttCd] },
    { data: useCnts },
    ...methodColumn,
  ];
};