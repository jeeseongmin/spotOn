import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { cells, communities, teams } from "@/dummy/organization";
import useModal from "@/hooks/useModal";
import MyPageWrapper from "@/pages/MyPage/components/MyPageLayout";

const MyInfo = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const modal = useModal();
  const { register, handleSubmit, setValue } = useForm();
  const defaultInfo = {
    name: "김온누리",
    phone: "010-1234-5678",
    community: "믿음",
    team: "1번 다락방",
    cell: "누가 1순",
  };

  useEffect(() => {
    init();
  }, []);

  const cancel = () => {
    setIsDisabled(true);
    init();
  };

  const init = () => {
    setValue("name", defaultInfo.name);
    setValue("phone", defaultInfo.phone);
    setValue("community", defaultInfo.community);
    setValue("team", defaultInfo.team);
    setValue("cell", defaultInfo.cell);
  };

  return (
    <MyPageWrapper>
      <form
        className="flex w-96 flex-col gap-4 py-24"
        onSubmit={handleSubmit(data => {
          console.log(data);
          console.log("모달 오픈 이벤트");
          modal.onOpen();
        })}
      >
        <div className="flex flex-col gap-2">
          <InputLabel text="이름" htmlFor="name" isRequired={true} />
          <Input
            id="name"
            type="text"
            className="h-10"
            placeholder="이름을 입력하세요"
            {...register("name")}
            disabled={isDisabled}
            variant="default"
          />
        </div>
        <div className="flex flex-col gap-2">
          <InputLabel text="전화번호" htmlFor="phone" isRequired={true} />
          <Input
            id="phone"
            type="text"
            className="h-10"
            placeholder="전화번호를 입력하세요"
            {...register("phone")}
            disabled={isDisabled}
            variant="default"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <InputLabel text="소속" htmlFor="belong" isRequired={true} />
          <div className="grid grid-cols-3 gap-2">
            <Dropdown
              category="community"
              options={communities}
              disabled={isDisabled}
              {...register("community")}
              value={defaultInfo.community}
              setValue={setValue}
            />
            <Dropdown
              category="team"
              options={teams}
              disabled={isDisabled}
              {...register("team")}
              value={defaultInfo.team}
              setValue={setValue}
            />
            <Dropdown
              category="cell"
              options={cells}
              disabled={isDisabled}
              {...register("cell")}
              value={defaultInfo.cell}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="mt-12 text-center">
          {isDisabled ? (
            <Button
              variant="primary"
              type="button"
              onClick={() => setIsDisabled(false)}
            >
              회원정보 수정
            </Button>
          ) : (
            <div className="flex justify-center gap-12">
              <Button variant="outlined" type="button" onClick={cancel}>
                취소
              </Button>
              <Button variant="primary" type="submit">
                저장
              </Button>
            </div>
          )}
        </div>
      </form>

      {modal.isOpen && (
        <ConfirmModal onClose={modal.onClose}>
          회원정보가 수정되었습니다.
        </ConfirmModal>
      )}
    </MyPageWrapper>
  );
};

export default MyInfo;
