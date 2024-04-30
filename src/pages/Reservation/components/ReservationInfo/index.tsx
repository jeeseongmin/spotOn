import { PropsWithChildren } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";

import { ReservationLabel } from "../..";

interface User {
  id: number;
  name: string;
  phoneNumber: string;
  community: string;
}

interface InfoInput extends PropsWithChildren {
  label: string;
  isRequired?: boolean;
}

const InfoLabel = ({ children, label, isRequired = false }: InfoInput) => (
  <div className="flex w-1/2 items-center gap-2">
    <InputLabel
      text={label}
      isRequired={isRequired}
      className="min-w-20 text-base text-primary"
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
  useWatch({ name: "time" });

  const isShow = getValues("time").length !== 0;

  return (
    <div className="flex w-full flex-col gap-4 rounded-sm border border-gray-middle bg-white-dull px-12 py-4 text-black shadow">
      <div className="flex gap-10">
        <ReservationLabel>예약자 정보 입력</ReservationLabel>
        {!isShow && (
          <div className="text-small text-[#FF8080]">
            *예약 시간을 선택한 후 진행해주세요.
          </div>
        )}
      </div>
      {isShow && (
        <>
          <div className="flex gap-4">
            <InfoLabel label="예약자">
              <Input
                disabled
                defaultValue={name}
                className="border-gray-middle"
              />
            </InfoLabel>
            <InfoLabel label="연락처">
              <div className="flex items-center gap-2">
                {phoneNumber.split("-").map((number, index, origin) => (
                  <>
                    <Input
                      disabled
                      defaultValue={number}
                      className="w-14 border-gray-middle"
                    />
                    {index !== origin.length - 1 && <div>-</div>}
                  </>
                ))}
              </div>
            </InfoLabel>
          </div>
          <div className="flex justify-between gap-4">
            <InfoLabel label="소속">
              <Input
                disabled
                defaultValue={community}
                className="border-gray-middle"
              />
            </InfoLabel>
            <InfoLabel label="사용 목적" isRequired>
              <Input
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
