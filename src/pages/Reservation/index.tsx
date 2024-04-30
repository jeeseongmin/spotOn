import { ComponentPropsWithoutRef } from "react";

import Layout from "@/components/Layout";
import { user } from "@/dummy/user";
import { cn } from "@/utils/cn";

import Banner from "./components/Banner";
import ReservationInfo from "./components/ReservationInfo";
import ReservationTab from "./components/ReservationTab";

export const ReservationLabel = ({
  children,
  className,
}: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("min-w-16 text-base text-primary", className)}>
    {children}
  </div>
);

const ReservationPage = () => {
  return (
    <Layout>
      <section className="flex flex-col gap-8">
        <Banner />
        <ReservationTab />
        <ReservationInfo user={user} />
      </section>
    </Layout>
  );
};

export default ReservationPage;
