import dayjs, { Dayjs } from "dayjs";

export const reservedTimes = [19, 19.5, 20];

export type TempListType = TempType[];

export type TempType = {
  day: Dayjs;
  data: {
    place: string;
    time: string;
    description: string;
    name: string;
    phone: string;
  }[];
};

export const reservations: TempListType = [
  {
    day: dayjs().date(2),
    data: [
      {
        place: "성가대실",
        time: "19:00 ~ 21:00",
        description: "대학청년부 모임",
        name: "박OO",
        phone: "010-1234-1234",
      },
    ],
  },
  {
    day: dayjs().date(15),
    data: [
      {
        place: "샤이닝글로리",
        time: "19:00 ~ 21:00",
        description: "대학청년부 모임",
        name: "박OO",
        phone: "010-1234-1234",
      },
      {
        place: "성가대실",
        time: "20:00 ~ 20:30",
        description: "성가대 연습",
        name: "박OO",
        phone: "010-1234-1234",
      },
    ],
  },
  {
    day: dayjs().date(20),
    data: [
      {
        place: "자모실",
        time: "19:00 ~ 21:00",
        description: "대학청년부 모임",
        name: "박OO",
        phone: "010-1234-1234",
      },
      {
        place: "샤이닝글로리",
        time: "19:00 ~ 21:00",
        description: "새가족 모임",
        name: "박OO",
        phone: "010-1234-1234",
      },
      {
        place: "성가대실",
        time: "19:00 ~ 21:00",
        description: "대학청년부 찬양팀 연습",
        name: "박OO",
        phone: "010-1234-1234",
      },
      {
        place: "파워웨이브실",
        time: "19:00 ~ 21:00",
        description: "중고등부 찬양팀 연습",
        name: "박OO",
        phone: "010-1234-1234",
      },
    ],
  },
  {
    day: dayjs().date(22),
    data: [
      {
        place: "꿈땅",
        time: "19:00 ~ 21:00",
        description: "꿈땅 모임",
        name: "이OO",
        phone: "010-1234-1234",
      },
      {
        place: "샤이닝글로리",
        time: "19:00 ~ 21:00",
        description: "개발팀 모임",
        name: "박OO",
        phone: "010-1234-1234",
      },
      {
        place: "샤이닝글로리",
        time: "19:00 ~ 21:00",
        description: "대학청년부 모임",
        name: "박OO",
        phone: "010-1234-1234",
      },
      {
        place: "샤이닝글로리",
        time: "19:00 ~ 21:00",
        description: "성인부 모임",
        name: "박OO",
        phone: "010-1234-1234",
      },
      {
        place: "성가대실",
        time: "19:00 ~ 21:00",
        description: "대학청년부 순모임",
        name: "박OO",
        phone: "010-1234-1234",
      },
    ],
  },
];
