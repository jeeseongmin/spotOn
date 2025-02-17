import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Layout from "@/components/Layout";
import Schedule from "@/components/Schedule";
import { ptonnuriPlace } from "@/dummy/places";
import RightPanel from "@/pages/Home/components/RightPanel";
import useCalendarStore from "@/store/calendarStore";

interface PlaceInfoState {
  plcCd: string;
  plcNm: string;
  plcF: number;
  cpsCd: string;
  bldCd: string;
  crtId: string;
  updId: string;
}
const View = () => {
  const { plcCd } = useParams();
  const [placeInfo, setPlaceInfo] = useState<PlaceInfoState | null>(null);
  const resetCalendar = useCalendarStore(state => state.resetCalendar);

  useEffect(() => {
    resetCalendar();
    if (plcCd) {
      const info = ptonnuriPlace.filter(elem => elem.plcCd === plcCd);
      if (info.length > 0) setPlaceInfo(info[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {placeInfo && (
        <div className="mb-4">
          <p>
            <b>
              "{placeInfo.plcNm}({placeInfo.plcF}층)"
            </b>
            에 대한 예약 내역을 확인하실 수 있습니다.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {plcCd && (
          <div className="flex flex-col justify-between gap-6 pb-32 md:flex-row">
            <Schedule plcCd={plcCd} />
            <RightPanel />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default View;
