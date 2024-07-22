import { ReservationResponse } from "@/types/reservation";

// 해당 시간대가 어떤 예약 상태를 가지고 있는지 체크해주는 함수
export const checkStatus = ({
  time,
  reservationList,
  status,
}: {
  time: number;
  reservationList: ReservationResponse[];
  status: string;
}) => {
  try {
    let isTrue: boolean = false;
    const thisTime = convertToTimeFormat(time);

    if (status === "isReserved") {
      reservationList.map(reservation => {
        if (
          Number(reservation.startTime) <= Number(thisTime) &&
          Number(thisTime) < Number(reservation.endTime) &&
          reservation.sttId === "예약완료"
        ) {
          isTrue = true;
          throw isTrue;
        }
      });

      return isTrue;
    } else if (status === "isWaiting") {
      reservationList.map(reservation => {
        if (
          Number(reservation.startTime) <= Number(thisTime) &&
          Number(thisTime) < Number(reservation.endTime) &&
          reservation.sttId === "예약대기"
        ) {
          isTrue = true;
          throw isTrue;
        }
      });

      return isTrue;
    } else return false;
  } catch (e: any) {
    return e;
  }
};

/**
 * 예약 시 startTime, endTime의 형태가 "hhmmss"이므로 포맷 형태 맞추는 함수
 */
export const getTime = ({ times, type }: { times: number[]; type: string }) => {
  let time = 0;
  times.sort((a, b) => {
    return a - b;
  });

  if (type === "startTime") {
    time = times[0];

    return convertToTimeFormat(time);
  } else if (type === "endTime") {
    time = times[times.length - 1] + 0.5;

    return convertToTimeFormat(time);
  } else return "000000";
};

// 일반 시간 변수를 hhmmss의 time format을 변환시키는 함수
export const convertToTimeFormat = (time: number) => {
  const hour = String(Math.floor(time));
  const minute = Number(time) > Number(hour) ? "30" : "00";
  const second = "00";

  return `${hour}${minute}${second}`;
};
