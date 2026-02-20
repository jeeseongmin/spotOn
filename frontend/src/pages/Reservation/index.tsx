import { ComponentPropsWithoutRef, useState } from "react";

import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { reservation } from "@/apis/reservation";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import ReservationModal from "@/components/Modal/ReservationModal";
import Tab from "@/components/Tab";
import { MYPAGE_MAIN_URL } from "@/constants/routes";
import useModal from "@/hooks/useModal";
import Banner from "@/pages/Reservation/components/Banner";
import ReservationDetails from "@/pages/Reservation/components/ReservationDetails";
import ReservationInfo from "@/pages/Reservation/components/ReservationInfo";
import ReservationTab from "@/pages/Reservation/components/ReservationTab";
import VehicleReservation from "@/pages/Reservation/components/VehicleReservation";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";
import type { Place } from "@/types/place";
import { ReservationRequest } from "@/types/reservation";
import { cn } from "@/utils/cn";
import { getTime } from "@/utils/reservation";

export const ReservationLabel = ({
  children,
  className,
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("min-w-28 text-base text-primary", className)}>
    {children}
  </div>
);

interface ReservationFormValues {
  date: Dayjs;
  place: Place;
  time: number[];
  userId: string;
  purpose: string;
  headcount: null | number;
}

const vehicleBanner = {
  title: "차량 예약 안내",
  content: [
    "차량 예약은 리더(순장) 이상만 신청 가능합니다.",
    "관리자 승인 후 예약이 확정됩니다.",
    "현재월과 다음월만 예약 가능합니다. (2개월 단위)",
    "하루 단위로 예약되며, 동일 날짜 중복 예약은 불가합니다.",
    "문의 : 목회지원실 (031-651-9680)",
  ],
};

const ReservationPage = () => {
  const { tokenId } = useLoginStore();
  const userInfo = useUserStore();
  const loginInfo = useLoginStore();
  const reservationModal = useModal();
  const [user] = useState({
    id: loginInfo.tokenId,
    userName: userInfo.userName,
    telNo: userInfo.telNo,
    cmtCd: userInfo.cmtCd,
    garCd: userInfo.garCd,
    leafCd: userInfo.leafCd,
    cmtNm: userInfo.cmtNm,
    garNm: userInfo.garNm,
    leafNm: userInfo.leafNm,
  });

  const methods = useForm<ReservationFormValues>({
    defaultValues: {
      date: dayjs(),
      place: undefined,
      time: [],
      userId: user.id.toString(),
      purpose: "",
      headcount: null,
    },
  });
  const { formState, reset, getValues, handleSubmit } = methods;

  const [banner] = useState({
    title: "예약 안내",
    content: [
      "예약 시간은 최대 2시간입니다. 2시간을 넘길 경우 목회지원실로 연락해주세요.",
      "순 / 다락방 / 부서 / 팀 별 모임 시에만 장소를 예약할 수 있습니다. \n(개인적 용무 불가)",
      "장소 사용의 우선순위는 예배입니다. 시간이 겹칠 경우 목회지원실에서 조정 후 다시 연락드립니다.",
      "예약 후 장소를 사용하지 않을 경우, 꼭 예약을 취소해야 합니다.",
      "장소 사용 후 깨끗하게 정리정돈 부탁드립니다.",
      "문의 : 목회지원실 (031-651-9680)",
    ],
  });

  const handleClickOkButton = () => {
    reservationModal.onClose();
    reset();
  };

  return (
    <Layout>
      <Tab variant="solid">
        <Tab.Item label="장소 예약">
          <FormProvider {...methods}>
            <form
              className="flex min-w-60 flex-col items-center gap-8 pt-4"
              onSubmit={handleSubmit(data => {
                const reservationRequest: ReservationRequest = {
                  useCnts: `${data.purpose} (사용 인원 : ${data.headcount}명)`,
                  cpsCd: "PTK",
                  bldCd: "PTK_PTK",
                  plcCd: data.place.plcCd,
                  rsvtDt: data.date.format("YYYYMMDD"),
                  startTime: getTime({
                    type: "startTime",
                    times: getValues("time"),
                  }),
                  endTime: getTime({
                    type: "endTime",
                    times: getValues("time"),
                  }),
                  mbrId: tokenId,
                };
                reservation(reservationRequest);
              })}
            >
              <Banner title={banner.title} content={banner.content} />
              <ReservationTab />
              <ReservationInfo user={user} />
              <Button
                type="submit"
                variant="outlined"
                className="w-fit text-base"
                disabled={!formState.isValid}
                onClick={reservationModal.onOpen}
              >
                예약 요청
              </Button>
            </form>
            {reservationModal.isOpen && (
              <ReservationModal onClose={reservationModal.onClose}>
                <ReservationModal.Header>
                  장소 예약이 요청되었습니다.
                </ReservationModal.Header>
                <ReservationModal.Content>
                  <ReservationDetails user={user} />
                </ReservationModal.Content>
                <ReservationModal.Footer>
                  <Link to={`${MYPAGE_MAIN_URL}?tab=1`}>
                    <Button variant="outlined">나의 예약</Button>
                  </Link>
                  <Button variant="primary" onClick={handleClickOkButton}>
                    확인
                  </Button>
                </ReservationModal.Footer>
              </ReservationModal>
            )}
          </FormProvider>
        </Tab.Item>
        <Tab.Item label="차량 예약">
          <div className="flex flex-col gap-4 pt-4">
            <Banner title={vehicleBanner.title} content={vehicleBanner.content} />
            <VehicleReservation />
          </div>
        </Tab.Item>
      </Tab>
    </Layout>
  );
};

export default ReservationPage;
