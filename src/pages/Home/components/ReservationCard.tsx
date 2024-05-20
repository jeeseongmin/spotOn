import { TempDataType } from "@/dummy/reservation";

type ReservationCardProps = {
  date: string;
  reservationList: TempDataType;
};

const ReservationCard = ({ date, reservationList }: ReservationCardProps) => {
  const CardHeader = () => {
    return (
      <div className="flex h-[33px] items-center rounded-t-[5px] bg-primary px-4 text-[15px] text-white">
        <span className=" p-0 leading-[15px]">{date}</span>
      </div>
    );
  };

  return (
    <div className="h-auto w-full rounded-[5px] drop-shadow-base">
      <CardHeader />
      {reservationList.length > 0 ? (
        <table className="h-auto w-full border-collapse bg-white">
          <tbody>
            {reservationList.map(element => {
              return (
                <tr className="border-b border-gray-middle p-4 align-top text-small last:border-none">
                  <td className="h-[94px] w-[100px] gap-2 border-r border-gray-middle py-2 pl-2 text-left font-semibold">
                    {element.status && (
                      <p
                        className={`mb-1 ${element.status === "승인완료" ? "text-primary" : "text-[#A30000]"}`}
                      >
                        {element.status}
                      </p>
                    )}
                    <p>{element.time}</p>
                  </td>
                  <td className="flex h-[94px] flex-col gap-1 pl-2 pt-2">
                    <p className="font-semibold">{element.place}</p>
                    <p className="font-light text-gray-dark">
                      {element.description}
                    </p>
                    <p className="font-light text-gray-dark">
                      {element.name} / {element.phone}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex h-[94px] items-center justify-center rounded-b-[5px] bg-white text-[13px] font-light text-gray-dark">
          <p>예약 없음</p>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
