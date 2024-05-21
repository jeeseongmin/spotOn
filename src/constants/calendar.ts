import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { Dayjs } from "dayjs";

export const daysOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];

export interface CalendarProps {
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
