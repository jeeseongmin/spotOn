import { PropsWithChildren } from "react";

import "@/dummy/reservation";
import { TempListType } from "@/dummy/reservation";

type ReservationType = PropsWithChildren & {
  reservations?: TempListType;
};
const Reservation = ({ children, reservations }: ReservationType) => {
  return (
    <div className="flex select-none flex-row items-center justify-start text-small font-light leading-4">
      <p className="mr-1 h-[6px] w-[6px] rounded-full bg-red-500"></p>
      <p className="line-clamp-1 flex-1 text-black">{children}</p>
      {reservations && reservations[0].data.length - 1 > 0 && (
        <div className="text-red-500">+{reservations[0].data.length - 1}</div>
      )}
    </div>
  );
};

export default Reservation;
