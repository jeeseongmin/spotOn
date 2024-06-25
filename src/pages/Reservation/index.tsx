import { ComponentPropsWithoutRef } from "react";

import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "@/components/Button";
import Layout from "@/components/Layout";
import ReservationModal from "@/components/Modal/ReservationModal";
import { MYPAGE_MAIN_URL } from "@/constants/routes";
import { user } from "@/dummy/user";
import useModal from "@/hooks/useModal";
import Banner from "@/pages/Reservation/components/Banner";
import ReservationDetails from "@/pages/Reservation/components/ReservationDetails";
import ReservationInfo from "@/pages/Reservation/components/ReservationInfo";
import ReservationTab from "@/pages/Reservation/components/ReservationTab";
import { cn } from "@/utils/cn";

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
  place: { id: number; name: string; floor: string };
  time: number[];
  userId: string;
  purpose: string;
}

const ReservationPage = () => {
  const reservationModal = useModal();
  const methods = useForm<ReservationFormValues>({
    defaultValues: {
      date: dayjs(),
      place: undefined,
      time: [],
      userId: user.id.toString(),
      purpose: "",
    },
  });
  const { formState, reset, handleSubmit } = methods;

  const handleClickOkButton = () => {
    reservationModal.onClose();
    reset();
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center gap-8"
          onSubmit={handleSubmit(data => console.log(data))}
        >
          <Banner />
          <ReservationTab />
          <ReservationInfo user={user} />
          <Button
            type="submit"
            variant="outlined"
            className="w-fit text-base"
            disabled={!formState.isValid}
            onClick={reservationModal.onOpen}
          >
            예약하기
          </Button>
        </form>
        {reservationModal.isOpen && (
          <ReservationModal onClose={reservationModal.onClose}>
            <ReservationModal.Header>
              예약이 완료되었습니다.
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
    </Layout>
  );
};

export default ReservationPage;
