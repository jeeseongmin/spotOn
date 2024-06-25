import { Dayjs } from "dayjs";

export type CalendarState = {
  date: Dayjs;
  firstDayOfMonth: Dayjs;
};

export type CalendarAction = {
  setDate: (_date: Dayjs) => void;
  setFirstDayOfMonth: (_firstDayOfMonth: Dayjs) => void;
  reset: () => void;
  resetFirstDayOfMonth: () => void;
};
