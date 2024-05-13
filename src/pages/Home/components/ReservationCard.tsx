type ReservationCardProps = {
  date: string;
  list: {
    time: string;
    place: string;
    description: string;
    name: string;
    phone: string;
  }[];
};

const ReservationCard = ({ date, list }: ReservationCardProps) => {
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
      {list.length > 0 ? (
        <table className="h-auto w-full border-collapse bg-white">
          <tbody>
            {list.map(element => {
              return (
                <tr className="border-b border-gray-middle p-4 align-top text-small last:border-none">
                  <td className="h-[94px] w-[100px] border-r border-gray-middle py-2 text-center font-semibold">
                    {element.time}
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
