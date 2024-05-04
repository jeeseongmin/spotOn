import { ComponentPropsWithoutRef } from "react";

import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { user } from "@/dummy/user";
import Banner from "@/pages/Reservation/components/Banner";
import ReservationInfo from "@/pages/Reservation/components/ReservationInfo";
import ReservationTab from "@/pages/Reservation/components/ReservationTab";
import { cn } from "@/utils/cn";

export const ReservationLabel = ({
  children,
  className,
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("min-w-16 text-base text-primary", className)}>
    {children}
  </div>
);

interface ReservationFormValues {
  date: Date;
  place: string;
  time: number[];
  userId: string;
  purpose: string;
}

const ReservationPage = () => {
  const methods = useForm<ReservationFormValues>({
    defaultValues: {
      date: new Date(),
      place: "",
      time: [],
      userId: user.id.toString(),
      purpose: "",
    },
  });

  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center gap-8"
          onSubmit={methods.handleSubmit(data => console.log(data))}
        >
          <Banner />
          <ReservationTab />
          <ReservationInfo user={user} />
          <Button
            type="submit"
            variant="outlined"
            className="w-fit text-base"
            disabled={!methods.formState.isValid}
          >
            예약하기
          </Button>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default ReservationPage;
