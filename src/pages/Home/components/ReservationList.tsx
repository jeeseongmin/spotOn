import ReservationCard from "@/pages/Home/components/ReservationCard";

const ReservationList = () => {
  const dummy1 = [
    {
      time: "19:00 ~ 21:00",
      place: "성가대실",
      description: "주일 2부 예배 성가연습",
      name: "박oo",
      phone: "010-1234-5678",
    },
    {
      time: "20:00 ~ 21:30",
      place: "샤이닝글로리",
      description: "대학청년부 BBQ",
      name: "김온oo",
      phone: "010-1111-2222",
    },
  ];

  const dummy2 = [
    {
      time: "19:00 ~ 21:30",
      place: "파워웨이브",
      description: "파워웨이브 찬양 연습",
      name: "김온oo",
      phone: "010-1111-2222",
    },
  ];

  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-start gap-4 overflow-y-scroll px-2 py-8">
      <ReservationCard date="02/25 (일)" list={dummy1} />
      <ReservationCard date="02/27 (일)" list={dummy2} />
      {/* <ReservationCard date="02/27 (일)" list={[]} /> */}
    </div>
  );
};

export default ReservationList;
