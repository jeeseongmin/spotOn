import dayjs from "dayjs";
import { create } from "zustand";

import { CalendarType } from "@/constants/store";

const useCalendarStore = create<CalendarType>(set => ({
  date: dayjs(new Date()),
  firstDayOfMonth: dayjs().date(1),

  setDate: newState => set({ date: newState }),
  setFirstDayOfMonth: newState => set({ firstDayOfMonth: newState }),
}));

export default useCalendarStore;
