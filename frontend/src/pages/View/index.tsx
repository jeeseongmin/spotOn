import { useEffect, useState } from "react";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";

import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Schedule from "@/components/Schedule";
import { ptonnuriPlace, ptonnuriPlaceByFloor } from "@/dummy/places";
import RightPanel from "@/pages/Home/components/RightPanel";
import useCalendarStore from "@/store/calendarStore";
import { cn } from "@/utils/cn";

interface PlaceInfoState {
  plcCd: string;
  plcNm: string;
  plcF: number;
  cpsCd: string;
  bldCd: string;
  crtId: string;
  updId: string;
}

interface OptionState {
  plcCd: string;
  plcNm: string;
}

const View = () => {
  const { plcCd } = useParams();

  const [placeInfo, setPlaceInfo] = useState<PlaceInfoState | null>(null);
  const resetCalendar = useCalendarStore(state => state.resetCalendar);
  const [selectedPlace, setSelectedPlace] = useState<OptionState>();
  const [isOpen, setIsOpen] = useState(true);
  const ArrowIcon = isOpen ? SlArrowUp : SlArrowDown;

  useEffect(() => {
    resetCalendar();
    makeOptionList();
    if (plcCd) {
      const info = ptonnuriPlace.filter(elem => elem.plcCd === plcCd);
      if (info.length > 0) setPlaceInfo(info[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plcCd]);

  const makeOptionList = () => {
    const list = [...ptonnuriPlace].map(elem => {
      return {
        plcCd: elem.plcCd,
        plcNm: elem.plcNm,
      };
    });
    const selected = list.filter(option => option.plcCd === plcCd)[0];
    setSelectedPlace(selected);
  };

  return (
    <Layout>
      <div className="border-black-500 mb-4 flex flex-col border bg-gray-100">
        <div
          className="flex cursor-pointer flex-row items-center justify-between px-4 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="text-sm">장소 선택</div>
          <ArrowIcon size={12} />
        </div>

        {isOpen && (
          <div className="h-full overflow-y-scroll rounded-sm bg-white px-4">
            {ptonnuriPlaceByFloor.map(({ floor, places }, index) => (
              <div
                key={floor}
                className={cn(
                  "flex gap-4 py-4",
                  index !== ptonnuriPlaceByFloor.length - 1 &&
                    "border-b border-b-gray-light",
                )}
              >
                <div className="whitespace-nowrap text-base font-normal text-primary">
                  {floor}
                </div>
                <div className="flex flex-wrap gap-4">
                  {places.map(({ plcCd, plcNm }) => (
                    <Link to={`/view/main/${plcCd}`}>
                      <Button
                        key={plcCd}
                        variant="outlined"
                        disabled={false}
                        className={cn(
                          "text-small",
                          selectedPlace?.plcCd === plcCd &&
                            "border-primary bg-primary text-white",
                        )}
                      >
                        {plcNm}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {placeInfo && (
        <div className="mb-4">
          <p>
            <b>
              "{placeInfo.plcNm}({placeInfo.plcF}층)"
            </b>{" "}
            예약 내역을 확인하실 수 있습니다.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4">   
        {plcCd && (
          <div className="flex flex-col justify-between gap-6 pb-32 md:flex-row">
            <Schedule />
            <RightPanel />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default View;

// <Schedule plcCd={selectedPlace?.plcCd} /> 기존 2025.05.27