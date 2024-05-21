import { Dayjs } from "dayjs";

export type CalendarType = {
  date: Dayjs;
  firstDayOfMonth: Dayjs;
  setDate: (_date: Dayjs) => void;
  setFirstDayOfMonth: (_firstDayOfMonth: Dayjs) => void;
};
