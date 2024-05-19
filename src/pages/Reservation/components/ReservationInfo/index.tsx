import { ComponentPropsWithoutRef, Fragment } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import { ReservationLabel } from "@/pages/Reservation";

interface User {
  id: number;
  name: string;
  phoneNumber: string;
  community: string;
}

interface InfoInput extends ComponentPropsWithoutRef<"label"> {
  label: string;
  isRequired?: boolean;
}

const InfoLabel = ({
  children,
  label,
  isRequired = false,
  ...props
}: InfoInput) => (
  <div className="flex w-1/2 items-center gap-2">
    <InputLabel
      text={label}
      isRequired={isRequired}
      className="min-w-20 text-base text-primary"
      {...props}
    />
    {children}
  </div>
);

interface ReservationInfoProps {
  user: User;
}

const ReservationInfo = ({ user }: ReservationInfoProps) => {
  const { name, phoneNumber, community } = user;
  const { register, getValues } = useFormContext();
  useWatch({ name: ["time", "place"] });

  const isShow = getValues("time").length !== 0 && getValues("place");

  return (
    <div className="flex w-full flex-col gap-4 rounded-sm border border-gray-middle bg-white-dull px-12 py-4 text-black shadow">
      <div className="flex gap-6">
        <ReservationLabel>예약자 정보 입력</ReservationLabel>
        {!isShow && (
          <div className="text-small text-red-light">
            *예약 시간과 장소를 선택한 후 진행해주세요.
          </div>
        )}
      </div>
      {isShow && (
        <>
          <div className="flex gap-4">
            <InfoLabel label="예약자" htmlFor="name">
              <Input
                id="name"
                disabled
                defaultValue={name}
                className="border-gray-middle"
              />
            </InfoLabel>
            <InfoLabel label="연락처" htmlFor="phone">
              <div className="flex items-center gap-2">
                {phoneNumber.split("-").map((number, index, origin) => (
                  <Fragment key={number}>
                    <Input
                      id="phone"
                      disabled
                      defaultValue={number}
                      className="w-14 border-gray-middle"
                    />
                    {index !== origin.length - 1 && <div>-</div>}
                  </Fragment>
                ))}
              </div>
            </InfoLabel>
          </div>
          <div className="flex justify-between gap-4">
            <InfoLabel label="소속" htmlFor="community">
              <Input
                id="community"
                disabled
                defaultValue={community}
                className="border-gray-middle"
              />
            </InfoLabel>
            <InfoLabel label="사용 목적" isRequired htmlFor="purpose">
              <Input
                id="purpose"
                placeholder="사용 목적을 입력하세요 (최대 15자)"
                maxLength={15}
                className="w-60 border-gray-middle"
                {...register("purpose", { required: true, maxLength: 15 })}
              />
            </InfoLabel>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationInfo;
