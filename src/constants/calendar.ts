import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { Dayjs } from "dayjs";

export const daysOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];
export const daysOfTheWeekByEnglish = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export const orderText = [
  "",
  "첫째 주",
  "둘째 주",
  "셋째 주",
  "넷째 주",
  "다섯째 주",
];

export const cycleTypeByEnglish = ["daily", "weekly", "monthly"];
export const cycleTypeByKorean = ["매일", "매주", "매월"];

export interface CalendarProps {
  startDate?: Dayjs;
  selectedDate?: Dayjs;
  limit?: number;
  onChangeSelectedDate: (day: Dayjs) => void;
}

export interface CalendarItemProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"div"> {
  dayOfTheWeek: number;
  dayData?: Dayjs;
  type?: string;
  isInactive?: boolean;
  isSelected?: boolean;
}
