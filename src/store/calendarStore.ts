import dayjs from "dayjs";
import { create } from "zustand";

import type { CalendarAction, CalendarState } from "@/constants/store";

const initialState: CalendarState = {
  date: dayjs(),
  firstDayOfMonth: dayjs().date(1),
};

const useCalendarStore = create<CalendarState & CalendarAction>(set => ({
  ...initialState,
  setDate: newState => set({ date: newState }),
  setFirstDayOfMonth: newState => set({ firstDayOfMonth: newState.date(1) }),
  reset: () => set(initialState),
  resetFirstDayOfMonth: () =>
    set({ firstDayOfMonth: initialState.firstDayOfMonth }),
}));

export default useCalendarStore;
