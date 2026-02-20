import { type Dayjs } from "dayjs";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import useUserStore from "@/store/userStore";

interface VehicleReservationFormProps {
  date: Dayjs;
  onSubmit: (data: VehicleFormValues) => void;
}

export interface VehicleFormValues {
  drivingTime: string;
  purpose: string;
  destination: string;
  driverName: string;
  driverPhone: string;
}

const FormLabel = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label className="text-small font-medium text-primary">
    {children}
    {required && <span className="text-red"> *</span>}
  </label>
);

const VehicleReservationForm = ({
  date,
  onSubmit,
}: VehicleReservationFormProps) => {
  const { userName, telNo, cmtNm } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<VehicleFormValues>({
    mode: "onChange",
    defaultValues: {
      drivingTime: "",
      purpose: "",
      destination: "",
      driverName: "",
      driverPhone: "",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Date header */}
      <div className="text-lg font-semibold text-primary">
        {date.format("YYYY년 M월 D일 (dd)")}
      </div>

      {/* Available badge */}
      <div>
        <span className="inline-block rounded-full border border-green-500 px-3 py-1 text-small font-medium text-green-500">
          예약 가능
        </span>
      </div>

      {/* Applicant info (auto-filled) */}
      <div className="rounded-sm border border-gray-light bg-white-dull p-4">
        <p className="pb-2 text-small font-medium text-primary">신청자 정보</p>
        <div className="flex flex-col gap-1.5 text-small">
          <div className="flex gap-2">
            <span className="min-w-[100px] text-gray-dull">공동체</span>
            <span>{cmtNm || "-"}</span>
          </div>
          <div className="flex gap-2">
            <span className="min-w-[100px] text-gray-dull">신청자</span>
            <span>{userName}</span>
          </div>
          <div className="flex gap-2">
            <span className="min-w-[100px] text-gray-dull">연락처</span>
            <span>{telNo || "-"}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <FormLabel required>운행시간</FormLabel>
          <Input
            placeholder="예: 09:00 ~ 18:00"
            {...register("drivingTime", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormLabel required>운행목적</FormLabel>
          <Input
            placeholder="차량 사용 목적을 입력하세요"
            {...register("purpose", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormLabel required>목적지</FormLabel>
          <Input
            placeholder="이동 목적지를 입력하세요"
            {...register("destination", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormLabel required>운전자</FormLabel>
          <Input
            placeholder="실제 운전자 이름"
            {...register("driverName", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormLabel required>운전자 연락처</FormLabel>
          <Input
            placeholder="010-0000-0000"
            {...register("driverPhone", { required: true })}
          />
        </div>

        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
          >
            신청하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleReservationForm;
