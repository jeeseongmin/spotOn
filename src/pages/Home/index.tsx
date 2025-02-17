import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import Schedule from "@/components/Schedule";
import RightPanel from "@/pages/Home/components/RightPanel";
import Banner from "@/pages/Reservation/components/Banner";
import useCalendarStore from "@/store/calendarStore";

const Home = () => {
  const resetCalendar = useCalendarStore(state => state.resetCalendar);

  useEffect(() => {
    resetCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [banner] = useState({
    title: "예약 안내",
    content: [
      "기본 권한 안내 - 회원가입을 완료한 모든 사용자는 자동으로 USER(일반 유저) 권한이 부여됩니다.",
      "권한별 안내 - USER(일반유저):홈 화면 내 예약 현황 확인가능, LEADER(순장/리더): '예약하기' 메뉴 이용 가능",
      "권한 변경 방법 - 본인이 '순장' 또는 '리더'라면, 교역자에게 권한 변경 요청 문자를 전송하세요. (이름, 소속, 전화번호 기재)",
      "권한 확인 방법 - 본인의 현재 권한은 '마이페이지'에서 확인할 수 있습니다.",
      "문의 : 목회지원실 (031-651-9680)",
    ],
  });

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Banner title={banner.title} content={banner.content} />
        <div className="flex flex-col justify-between gap-6 pb-32 md:flex-row">
          <Schedule />
          <RightPanel />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
